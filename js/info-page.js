const heroInfoPage = document.querySelector('.hero.info-page');

function updateAlignment() {
  const hasScroll = heroInfoPage.scrollHeight > heroInfoPage.clientHeight;
  if (hasScroll) {
    heroInfoPage.style.alignItems = 'flex-start';
  } else {
    heroInfoPage.style.alignItems = '';
  }
}

window.addEventListener('resize', updateAlignment);

const observer = new MutationObserver(updateAlignment);
observer.observe(heroInfoPage, { attributes: true, childList: true, subtree: true });

updateAlignment();
``;
