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

  function openArtWorkDetail(numOfContainer) {
    const artworks = document.querySelectorAll(`.artwork__grid._${numOfContainer} .artwork__work`);
    const emptyImgBlock = '<div style="background: #fff; width: 100%; height: 100%;"></div>';

    if (artworks) {
      artworks.forEach((artwork) => {
        artwork.addEventListener('click', function () {
          const artworkName = artwork.querySelector('.artwork__name:not(.new)')?.textContent || 'UNTITLED';
          const artworkImg = artwork.querySelector('img')?.cloneNode(true) || emptyImgBlock;
          const artworkSize = artwork.querySelector('.artwork__size')?.textContent || 'UNTITLED';
          const artworkPrice = artwork.querySelector('.artwork__price')?.textContent || 'UNTITLED';
          const donor = document.querySelector(`.artwork__deatil._${numOfContainer}`);

          const isOpen = donor.clientHeight > 0;
          if (!isOpen) {
            donor.style.display = 'flex';
            gsap.fromTo(donor, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.5 });
          }

          if (!donor) return;

          if (isMobile()) {
            donor.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }

          const detailName = donor.querySelector('.artwork__title-name');
          const detailImg = donor.querySelector('.artwork__detail-img');
          const detailSize = donor.querySelector('.artwork__descr-size');
          const detailPriceNum = donor.querySelector('.artwork__descr-price-num');

          if (detailName) {
            detailName.textContent = artworkName;
          }

          if (detailImg) {
            detailImg.innerHTML = '';
            detailImg.appendChild(artworkImg);
            detailImg.querySelector('img').setAttribute('alt', artworkName);
          }

          if (detailSize) {
            detailSize.textContent = artworkSize;
          }

          if (detailPriceNum) {
            detailPriceNum.textContent = artworkPrice;
          }
        });
      });
    }
  }

  openArtWorkDetail('1');
  openArtWorkDetail('2');
});
