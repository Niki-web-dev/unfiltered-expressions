document.addEventListener('DOMContentLoaded', function () {
  function removeAllActiveTab() {
    accountTabs.forEach((tab) => {
      tab.classList.remove('active');
    });

    tabPanes.forEach((tabPane) => {
      tabPane.classList.remove('active');
    });
  }

  function tabFunction() {
    accountTabs.forEach((tab, index) => {
      tab.addEventListener('click', function (event) {
        removeAllActiveTab();
        this.classList.add('active');
        tabPanes[index].classList.add('active');
      });
    });
  }

  function selectImitation() {
    document.addEventListener('click', function (event) {
      selectWrappers.forEach((wrapper) => {
        const selectList = wrapper.querySelector('.select__list');
        if (!wrapper.contains(event.target)) {
          selectList?.classList.remove('active');
        }
      });
    });
    selectWrappers.forEach((wrapper) => {
      const buttonText = wrapper.querySelector('.select__main-text');
      const selectList = wrapper.querySelector('.select__list');
      const selectItems = wrapper.querySelectorAll('.select__list-item');
      const button = wrapper.querySelector('.select__button');
      const hiddenField = wrapper.querySelector('.hiden-field');
      if (hiddenField && buttonText) {
        hiddenField.value = buttonText.textContent;
      }

      button?.addEventListener('click', function () {
        selectList.classList.toggle('active');
        if (wrapper.closest('.deliver-pane') && bilingAddressIsChecked) {
          paymantPane.querySelector('.information__field.select__field').value = hiddenField.value;
        }
      });
      selectItems.forEach((item) => {
        item.addEventListener('click', function () {
          if (buttonText) buttonText.textContent = item.textContent;
          if (hiddenField) hiddenField.value = item.textContent;
        });
      });
    });
  }

  function formatTelephone(event) {
    let input = event.target.value.replace(/\D/g, '').substring(0, 10);
    input = input !== '' ? input.match(/.{1,3}/g).join('') : '';
    event.target.value = input;
  }

  const accountTabs = document.querySelectorAll('.account__tab');
  const tabPanes = document.querySelectorAll('.account__tab-pane');
  const selectWrappers = document.querySelectorAll('.select__wrapper');

  selectImitation();
  tabFunction();

  const input = document.querySelector('#pseudo-phone');
  const hiddenField = document.querySelector('#account_phone');

  const iti = window.intlTelInput(input, {
    initialCountry: 'auto',
    geoIpLookup: function (callback) {
      fetch('https://ipinfo.io/json')
        .then((response) => response.json())
        .then((data) => callback(data.country))
        .catch(() => callback('us'));
    },
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
    customContainer: 'select__wrapper',
    separateDialCode: true,
    useFullscreenPopup: false,
  });

  input.addEventListener('input', function (event) {
    formatTelephone(event);

    const countryCode = iti.getSelectedCountryData().dialCode;
    const number = input.value;
    hiddenField.value = `+${countryCode}${number}`;
  });

  input.addEventListener('countrychange', function () {
    const countryCode = iti.getSelectedCountryData().dialCode;
    const number = input.value;
    hiddenField.value = `+${countryCode}${number}`;
  });
});
