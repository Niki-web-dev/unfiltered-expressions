function heroAnimation() {
  const slides = document.querySelectorAll('.hero__slide');
  Array.from(slides)
    .slice(1)
    .forEach((item) => {
      item.style.position = 'absolute';
    });

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 1500);
}

function advantegHoverAnimation(hoverSection, rotateIcon) {
  const hoverAnimation = gsap.to(rotateIcon, {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: 'linear',
  });
  hoverAnimation.pause();

  hoverSection.addEventListener('mouseleave', () => {
    hoverAnimation.pause();
  });

  hoverSection.addEventListener('mouseenter', () => {
    hoverAnimation.play();
  });
}

function isMobile() {
  return window.innerWidth < 480;
}

document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger, InertiaPlugin);

  const icon = document.querySelector('.advantages__icon');
  const icon2 = document.querySelector('.gallery__icon');
  const section = document.querySelector('.advantages__right-texts');
  const section2 = document.querySelector('.stems-story__right');

  function deskAnimation() {
    if (!isMobile()) {
      advantegHoverAnimation(section, icon);
      advantegHoverAnimation(section2, icon2);
    }
  }

  heroAnimation();
  deskAnimation();

  window.addEventListener('resize', deskAnimation);

  //Paralax animation

  const images = document.querySelectorAll('.process__img');
  let scrollDistanse = 100;

  if (window.innerWidth < 480) {
    scrollDistanse = scrollDistanse * -1;
  }

  images.forEach((img, i) => {
    gsap.to(img, {
      y: i % 2 === 0 ? scrollDistanse : scrollDistanse * -1,
      scrollTrigger: {
        trigger: '.process.h-auto',
        start: 'top 70%',
        end: 'bottom top',
        scrub: 1,
      },
      ease: 'power1.out',
    });
  });

  ScrollTrigger.refresh();
});
