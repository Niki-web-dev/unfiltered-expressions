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

function videoPopUp() {
  const openButton = document.querySelector('.video-button-open');
  const closeButton = document.querySelector('.video-button-open.close');
  const videoPopUp = document.querySelector('.video-pop-up');

  openButton.addEventListener('click', function () {
    videoPopUp.classList.add('active');
  });
  closeButton.addEventListener('click', function () {
    videoPopUp.classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const icon = document.querySelector('.cta__icon');
  const section = document.querySelector('.public-art__cta');

  function deskAnimation() {
    if (!isMobile()) {
      advantegHoverAnimation(section, icon);
    }
  }

  deskAnimation();
  videoPopUp();

  window.addEventListener('resize', deskAnimation);
});
