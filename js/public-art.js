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
  const artworkItems = document.querySelectorAll('.artwork__work.w-inline-block');

  function deskAnimation() {
    if (!isMobile()) {
      advantegHoverAnimation(section, icon);
    }
  }

  deskAnimation();
  videoPopUp();

  window.addEventListener('resize', deskAnimation);

  function createSlider() {
    let swiper;

    var link = document.createElement('link');
    link.classList.add('swiper-css');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(link);

    if (!swiper) {
      swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
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

  //art work detail div.clone().append()

  function openArtWorkDetail() {
    artworkItems.forEach((artowk) => {
      artowk.addEventListener('click', function () {
        const detailContainer = artowk.closest('.artwork__grid').nextElementSibling;
        if (detailContainer.classList.contains('artwork__deatil')) {
          detailContainer.innerHTML = '';
          const detail = artowk.querySelector('.artwork__container').cloneNode(true);
          detailContainer.append(detail);

          const isOpen = detailContainer.clientHeight > 0;
          if (!isOpen) {
            detailContainer.style.display = 'flex';
            gsap.fromTo(detailContainer, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.5 });
          }

          if (isMobile()) {
            detailContainer.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      });
    });
  }

  openArtWorkDetail();
});
