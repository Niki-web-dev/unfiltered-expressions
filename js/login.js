document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('pass');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
  });
});
