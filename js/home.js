window.addEventListener('load', function () {
  // ScrollTrigger.refresh();
});

const preloaderShown = localStorage.getItem('preloaderShown');

document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger, InertiaPlugin);
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

  if (!preloaderShown) {
    setTimeout(() => {
      gsap.from('.hidden-span', {
        y: '100%',
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, 1000);
  } else {
    gsap.from('.hidden-span', {
      y: '100%',
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
    });
  }

  //work galley scroll while scroll page
  // const worksWrapper = document.querySelector('.works__wrapper');
  // const works = document.querySelector('.works');

  // const wrapperWidth = worksWrapper.scrollWidth;
  // const containerWidth = works.clientWidth;
  // const scrollDistance = wrapperWidth - containerWidth + 20;

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
  const worksWrapper = document.querySelector('.works__wrapper');
  const works = document.querySelector('.works');

  const wrapperWidth = worksWrapper.scrollWidth;
  const containerWidth = works.clientWidth;
  const scrollDistance = wrapperWidth - containerWidth + 20;

  const scrollAmount = scrollDistance > 0 ? scrollDistance : 0;

  function handleScroll() {
    const worksRect = works.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Увеличиваем значение, чтобы начать анимацию позже
    const startOffset = windowHeight; // Множитель 0.5 означает середину окна

    // Расчет прогресса с учетом сдвига
    const progress = (windowHeight - worksRect.top - startOffset) / (windowHeight + works.clientHeight / 0.5);

    // Ограничиваем прогресс от 0 до 1
    const clampedProgress = Math.min(Math.max(progress, 0), 1);

    // Вычисляем смещение
    const translateX = -clampedProgress * scrollAmount;

    // Применяем трансформацию
    worksWrapper.style.transform = `translateX(${translateX}px)`;
  }

  window.addEventListener('scroll', handleScroll);

  // Инициализация анимации при загрузке страницы
  handleScroll();

  //Paralax animation

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
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 3,
      },
      ease: 'power1.out',
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

  if (videoSection) {
    const svgWrapper = document.createElement('div');

    svgWrapper.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_158_36)">
              <path d="M9.76233 24.424V6.57605L23.2277 15.5L9.76233 24.424ZM10.2344 7.45909V23.5369L22.365 15.496L10.2344 7.45502V7.45909Z" fill="currentcolor"></path>
              <path d="M31 31H0V0H31V31ZM0.476109 30.5239H30.528V0.476109H0.476109V30.528V30.5239Z" fill="currentcolor"></path>
          </g>
          <defs>
              <clipPath id="clip0_158_36">
                  <rect width="31" height="31" fill="currentcolor"></rect>
              </clipPath>
          </defs>
      </svg>
    `;

    videoSection.appendChild(svgWrapper);
  } else {
    console.error('Element with ID #video-section not found');
  }

  const playBtn = document.querySelector('#video-section svg');

  gsap.registerPlugin(ScrollTrigger);

  function isMobile() {
    return window.innerWidth <= 479;
  }

  function videoStart() {
    if (backgroundVideo && !isMobile) {
      ScrollTrigger.create({
        trigger: videoSection,
        start: 'top 95%',
        end: 'bottom 5%',
        onEnter: () => backgroundVideo.play(),
        onLeave: () => backgroundVideo.pause(),
        onEnterBack: () => backgroundVideo.play(),
        onLeaveBack: () => backgroundVideo.pause(),
      });
    } else if (isMobile && playBtn) {
      playBtn.addEventListener('click', () => {
        backgroundVideo.play();
        playBtn.remove();
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
