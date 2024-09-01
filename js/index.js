//gsap H1 Hero text animation
document.addEventListener('DOMContentLoaded', function () {
  // Check if the preloader has been shown before
  gsap.registerPlugin(ScrollTrigger, InertiaPlugin);
  ScrollTrigger.config({ ignoreMobileResize: true });
  const mm = gsap.matchMedia();

  mm.add('(max-width: 1024)', () => {
    if (ScrollTrigger.isTouch === 1) {
      ScrollTrigger.normalizeScroll(true);
    }
  });
  const preloaderShown = localStorage.getItem('preloaderShown');

  if (!preloaderShown) {
    // If the preloader hasn't been shown, lock the page scroll
    document.body.classList.add('overflow-hidden');
    document.querySelector('.preloader').classList.add('show');

    // Function to play or pause the preloader video
    async function playPauseVideo() {
      const videoElement = document.querySelector('.preloader__video');

      if (!videoElement) {
        console.error('No video element found');
        return;
      }

      try {
        // Wait for the video to be ready to play
        if (videoElement.readyState >= 3) {
          // HAVE_FUTURE_DATA or more
          if (videoElement.paused) {
            await videoElement.play();
          } else {
            videoElement.pause();
          }
        } else {
          console.warn('Video is not ready to play');
        }
      } catch (error) {
        console.error('Error attempting to play or pause the video:', error);
      }
    }

    // Call the play/pause function with a delay
    setTimeout(playPauseVideo, 300);

    // Remove the preloader and unlock the scroll after 2 seconds
    setTimeout(function () {
      document.body.classList.remove('overflow-hidden');
      document.querySelector('.preloader').classList.add('active');
      localStorage.setItem('preloaderShown', 'true'); // Save to localStorage that the preloader has been shown
    }, 2000);
  } else {
    // If the preloader has already been shown, hide it immediately
    document.body.classList.remove('overflow-hidden');
    document.querySelector('.preloader').remove();
  }

  //Burger menu function
  const menuButton = document.querySelector('.menu__button');
  const closeButton = document.querySelector('.close-icon');
  const navMenu = document.querySelector('.nav__menu');
  menuButton.addEventListener('click', function () {
    document.querySelector('.nav__menu').classList.toggle('active');
    document.querySelectorAll('.burger__dot').forEach((el) => {
      el.classList.toggle('active');
    });
  });

  closeButton.addEventListener('click', function () {
    document.querySelector('.nav__menu').classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuButton.contains(event.target)) {
      navMenu.classList.remove('active');
    }
  });

  // infinity navbar scroll text function
  let counter = 0;

  function createAnimation(item, direction) {
    return gsap.to(item, {
      x: direction,
      duration: 25,
      ease: 'linear',
      paused: true,
      repeat: -1,
    });
  }

  requestAnimationFrame(() => {
    document.querySelectorAll('.nav__link-wrapper').forEach((item) => {
      const computedWidth = window.getComputedStyle(item).getPropertyValue('width');
      item.style.minWidth = computedWidth;

      setTimeout(() => {
        let animation;
        if (counter >= 3) {
          animation = createAnimation(item, '-100%');
        } else {
          animation = createAnimation(item, '100%');
        }
        animation.play();
        counter = (counter + 1) % 6; // Reset counter after every 6 items
      }, 200);

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

    setTimeout(function () {
      document.querySelectorAll('.nav__link').forEach((item) => {
        item.style.display = 'flex';
        item.style.flexDirection = 'row';
      });
    }, 1000);
  });

  const observer = new MutationObserver(() => {
    document.querySelectorAll('.nav__link-wrapper').forEach((item) => {
      const computedWidth = window.getComputedStyle(item).getPropertyValue('width');
      item.style.minWidth = computedWidth;
    });
  });

  document.querySelectorAll('.nav__link-wrapper').forEach((item) => {
    observer.observe(item, { attributes: true, childList: true, subtree: true });
  });

  //change color for navbar if scroll page
  const navbar = document.querySelector('.nav__container');
  const navbarIsFixed = document.querySelector('.hero__top.fixed');
  let isNavbarDark = false;

  function updateNavbarStyles() {
    if ((!!navbarIsFixed || window.innerWidth < 480) && navbar) {
      const shouldMakeNavbarDark = window.scrollY > 220;

      if (shouldMakeNavbarDark) {
        navbar.classList.add('active');
        navbarIsFixed?.classList.add('active');
      } else {
        navbar.classList.remove('active');
        navbarIsFixed?.classList.remove('active');
      }

      isNavbarDark = shouldMakeNavbarDark;
    }
  }

  function ctaHoverInAnimation() {
    const yellowBg = document.querySelector('.cta');
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);
    if (!yellowBg) {
      return;
    }

    yellowBg.addEventListener('mouseenter', function handler() {
      styleSheet.sheet.insertRule('.cta__referal-text .yellow-bg::before { width: 100%; }', 0);
      yellowBg.removeEventListener('mouseenter', handler);
    });
  }

  function toTitleCase(text) {
    return text.toLowerCase().replace(/\b\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  const titleElements = document.querySelectorAll('.total__info-wrapper .total__title');
  if (titleElements) {
    titleElements.forEach((element) => {
      element.textContent = toTitleCase(element.textContent);
    });
  }

  ctaHoverInAnimation();
  window.addEventListener('load', updateNavbarStyles);
  window.addEventListener('scroll', updateNavbarStyles);
  window.addEventListener('resize', updateNavbarStyles);
});
