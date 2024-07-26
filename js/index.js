// Add overflow-hidden to the body
// document.body.classList.add('overflow-hidden');

document.addEventListener('DOMContentLoaded', function () {
  // Wait for the page to fully load
  async function playPauseVideo() {
    const videoElement = document.querySelector('.preloader__video');

    if (videoElement.paused) {
      try {
        await videoElement.play();
      } catch (error) {
        console.error('Error attempting to play:', error);
      }
    } else {
      videoElement.pause();
    }
  }

  playPauseVideo();

  // Remove overflow-hidden from the body
  setTimeout(function () {
    document.body.classList.remove('overflow-hidden');
    // Add active class to the preloader
    // document.querySelector('.preloader').classList.add('active');
  }, 2000);

  //Burger menu function
  const menuButton = document.querySelector('.menu__button');
  const closeButton = document.querySelector('.close-icon');
  menuButton.addEventListener('click', function () {
    document.querySelector('.nav__menu').classList.toggle('active');
    document.querySelectorAll('.burger__dot').forEach((el) => {
      el.classList.toggle('active');
    });
  });

  closeButton.addEventListener('click', function () {
    document.querySelector('.nav__menu').classList.toggle('active');
  });
});

//gsap H1 Hero text animation
document.addEventListener('DOMContentLoaded', function () {
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
      }, 1000);

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

  // window.addEventListener('resize', () => {
  //   location.reload();
  // });

  //change color for navbar if scroll page
  const navbar = document.querySelector('.nav__container');
  let isNavbarDark = false;

  function updateNavbarStyles() {
    if (window.innerWidth < 480 && navbar) {
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

  // SmoothScroll({
  //   animationTime: 2000,
  //   stepSize: 65,
  //   accelerationDelta: 30,
  //   accelerationMax: 1,
  //   keyboardSupport: true,
  //   arrowScroll: 50,
  //   pulseAlgorithm: true,
  //   pulseScale: 1,
  //   pulseNormalize: 1,
  //   touchpadSupport: true,
  // });
});
