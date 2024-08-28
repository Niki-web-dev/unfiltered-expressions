window.addEventListener('load', function () {
  ScrollTrigger.refresh();
});
document.addEventListener('DOMContentLoaded', function () {
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

  //work galley scroll while scroll page
  const worksWrapper = document.querySelector('.works__wrapper');
  const works = document.querySelector('.works');

  const wrapperWidth = worksWrapper.scrollWidth;
  const containerWidth = works.clientWidth;
  const scrollDistance = wrapperWidth - containerWidth + 20;

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

  //Paralax animation
  gsap.registerPlugin(ScrollTrigger, InertiaPlugin);

  const images = document.querySelectorAll('.hero__img');
  let scrollDistanse = 100;

  if (window.innerWidth < 480) {
    scrollDistanse = scrollDistanse * -1;
  }

  images.forEach((img, i) => {
    let distance;

    if (i === 4) {
      distance = scrollDistanse * 1.4;
    } else if (i === 2) {
      distance = scrollDistanse * 2;
    } else if (i === 5) {
      distance = scrollDistanse * 2.5;
    } else {
      distance = i % 2 === 0 ? -scrollDistanse : scrollDistanse;
    }

    gsap.to(img, {
      y: distance,
      inertia: {
        resistance: 500, // scroll resist
      },
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 3,
        inertia: true,
      },
    });
  });

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

  const videoSection = document.getElementById('video-section');
  const backgroundVideo = document.getElementById('background-video');

  gsap.registerPlugin(ScrollTrigger);

  function isMobile() {
    return window.innerWidth <= 479;
  }

  function videoStart() {
    if (backgroundVideo) {
      ScrollTrigger.create({
        trigger: videoSection,
        start: 'top 95%',
        end: 'bottom 5%',
        onEnter: () => backgroundVideo.play(),
        onLeave: () => backgroundVideo.pause(),
        onEnterBack: () => backgroundVideo.play(),
        onLeaveBack: () => backgroundVideo.pause(),
      });
    }
  }

  function setupAnimation() {
    if (!isMobile()) {
      videoStart();

      gsap.to(backgroundVideo, {
        y: '-60%',
        ease: 'none',
        scrollTrigger: {
          trigger: videoSection,
          start: 'top 55%',
          end: 'bottom 5%',
          scrub: 0.9,
        },
      });
    } else {
      videoStart();
    }
  }

  // Initial setup
  setupAnimation();

  // Resize listener to reapply the animation on window resize
  window.addEventListener('resize', function () {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    setupAnimation();
  });

  gsap.registerPlugin(ScrollTrigger);

  const firstProcessItem = document.querySelectorAll('.process__item');

  gsap.set(firstProcessItem[0], { marginTop: '0rem' });
  gsap.set(firstProcessItem[1], { marginTop: '0rem' });
  gsap.set(firstProcessItem[2], { marginTop: '0rem' });

  function desktopProcessAnimation(margin, firstMargin = 0) {
    gsap.fromTo(
      firstProcessItem[0],
      { marginTop: '0rem' },
      {
        marginTop: `${margin - firstMargin}rem`,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process',
          start: 'top top',
          end: '25% top',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      firstProcessItem[1],
      { marginTop: '0rem' },
      {
        marginTop: `${margin}rem`,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process',
          start: '25% top',
          end: '50% top',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      firstProcessItem[2],
      { marginTop: '0rem' },
      {
        marginTop: `${margin}rem`,
        ease: 'none',
        scrollTrigger: {
          trigger: '.process',
          start: '50% top',
          end: '75% top',
          scrub: true,
        },
      }
    );
  }

  if (window.innerWidth > 480) {
    desktopProcessAnimation(-350);
  } else {
    desktopProcessAnimation(-155);
  }
});
