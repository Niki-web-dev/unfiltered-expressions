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

//gsap H1 text animation
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
    // infinity navbar scroll text function
    // infinity navbar scroll text function
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

      // Додаємо обробники подій для наведенні і відведенні
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

  images.forEach((img, i) => {
    gsap.to(img, {
      y: i % 2 === 0 ? 200 : -200, // Вибір напрямку зміщення на основі індексу
      inertia: {
        resistance: 200, // Опір інерції
      },
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top', // Початок анімації
        end: 'bottom top', // Кінець анімації
        scrub: 1, // Плавність анімації з певним затриманням
        inertia: true, // Додаємо інерцію
      },
    });
  });
});
