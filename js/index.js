const menuButton = document.querySelector('.menu__button');

menuButton.addEventListener('click', function () {
  document.querySelector('.nav__menu').classList.toggle('active');
  document.querySelectorAll('.burger__dot').forEach((el) => {
    el.classList.toggle('active');
  });
});
