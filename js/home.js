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

    //work galley scroll while scroll page
    // const worksWrapper = document.querySelector('.works__wrapper');
    // const works = document.querySelector('.works');

    // const wrapperWidth = worksWrapper.scrollWidth;
    // const containerWidth = works.clientWidth;
    // const scrollDistance = wrapperWidth - containerWidth + 50;

    // const scrollAmount = scrollDistance > 0 ? scrollDistance : 0;

    // gsap.to(worksWrapper, {
    //   x: -scrollAmount,
    //   ease: 'none',
    //   scrollTrigger: {
    //     trigger: works,
    //     start: 'top top',
    //     end: `+=${works.clientHeight * 0.5}`,
    //     scrub: true,
    //   },
    // });

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
  });
});
