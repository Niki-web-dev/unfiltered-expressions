document.addEventListener('DOMContentLoaded', function () {
  // Add overflow-hidden to the body
  document.body.classList.add('overflow-hidden');

  // Wait for the page to fully load
  window.addEventListener('load', function () {
    // Remove overflow-hidden from the body
    this.setTimeout(function () {
      document.body.classList.remove('overflow-hidden');
      // Add active class to the preloader
      document.querySelector('.preloader').classList.add('active');
    }, 1000);

    //Burger menu function
    const menuButton = document.querySelector('.menu__button');

    menuButton.addEventListener('click', function () {
      document.querySelector('.nav__menu').classList.toggle('active');
      document.querySelectorAll('.burger__dot').forEach((el) => {
        el.classList.toggle('active');
      });
    });
  });
});

//gsap H1 Hero text animation
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const words = document.querySelectorAll('[data-words-slide-up]');
    words.forEach((item) => {
      const spans = item.querySelectorAll('span');

      spans.forEach((span) => {
        const div = document.createElement('div');
        div.classList.add('overflow-line');
        div.appendChild(span);
        item.appendChild(div);
      });
    });

    setTimeout(() => {
      gsap.from('.hidden-span', {
        y: '100%',
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, 1000);

    // infinity navbar scroll text function
    let counter = 0;

    function createAnimation(item, direction) {
      return gsap.to(item, {
        x: direction,
        duration: 15,
        ease: 'linear',
        paused: true,
        repeat: -1,
      });
    }

    document.querySelectorAll('.nav__link-wrapper').forEach((item) => {
      const computedWidth = window.getComputedStyle(item).getPropertyValue('width');
      item.style.minWidth = computedWidth;

      let animation;
      if (counter >= 3) {
        animation = createAnimation(item, '-100%');
      } else {
        animation = createAnimation(item, '100%');
      }
      animation.play();
      counter = (counter + 1) % 6; // Reset counter after every 6 items

      const iconAnimation = gsap.to(item.parentElement.querySelectorAll('.nav__icon'), {
        rotation: 360,
        duration: 10,
        ease: 'linear',
        paused: true,
        repeat: -1,
      });

      item.parentElement.addEventListener('mouseenter', () => {
        iconAnimation.play();
      });

      item.parentElement.addEventListener('mouseleave', () => {
        iconAnimation.pause();
      });
    });

    document.querySelectorAll('.nav__link').forEach((item) => {
      item.style.display = 'flex';
      item.style.flexDirection = 'row';
    });
  });

  //Paralax animation
  gsap.registerPlugin(ScrollTrigger, InertiaPlugin);

  const images = document.querySelectorAll('.hero__img');
  let scrollDistanse = 200;

  if (window.innerWidth < 480) {
    scrollDistanse = scrollDistanse * -1;
  }

  images.forEach((img, i) => {
    gsap.to(img, {
      y: i % 2 === 0 ? scrollDistanse : scrollDistanse * -1,
      inertia: {
        resistance: 200, // scroll resist
      },
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        inertia: true,
      },
    });
  });

  //work galley scroll while scroll page
  const worksWrapper = document.querySelector('.works__wrapper');
  const works = document.querySelector('.works');

  const wrapperWidth = worksWrapper.scrollWidth;
  const containerWidth = works.clientWidth;
  const scrollDistance = wrapperWidth - containerWidth;

  const scrollAmount = scrollDistance > 0 ? scrollDistance : 0;

  gsap.to(worksWrapper, {
    x: -scrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: works,
      start: 'top top',
      end: `+=${works.clientHeight * 0.5}`,
      scrub: true,
    },
  });

  //change color for navbar if scroll page
  const navbar = document.querySelector('.nav__container');
  let isNavbarDark = false;

  function updateNavbarStyles() {
    if (window.innerWidth < 480) {
      const shouldMakeNavbarDark = window.scrollY > 220;

      if (shouldMakeNavbarDark) {
        navbar.classList.add('active');
      } else {
        navbar.classList.remove('active');
      }

      isNavbarDark = shouldMakeNavbarDark;
    }
  }

  window.addEventListener('load', updateNavbarStyles);
  window.addEventListener('scroll', updateNavbarStyles);
  window.addEventListener('resize', updateNavbarStyles);
  //mobile slider

  function createSlider() {
    let swiper;

    if (window.innerWidth < 480) {
      var link = document.createElement('link');
      link.classList.add('swiper-css');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
      document.head.appendChild(link);

      if (!swiper) {
        swiper = new Swiper('.swiper', {
          slidesPerView: 1,
          spaceBetween: 10,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
      }
    } else {
      if (document.querySelector('.swiper-css')) {
        document.querySelector('.swiper-css').remove();
      }

      if (swiper) {
        swiper.destroy();
        swiper = undefined;
      }
    }
  }

  createSlider();
  window.addEventListener('resize', createSlider);
});
