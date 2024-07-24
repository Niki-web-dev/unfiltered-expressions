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
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Удаляем все триггеры, чтобы не создавать дубликаты
    setupAnimation();
  });
});
