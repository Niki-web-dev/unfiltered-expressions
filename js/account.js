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

  function freezePaymant() {
    function toggleFormState(isDisabled) {
      paymantPane.querySelectorAll('input').forEach((input) => {
        input.disabled = isDisabled;
      });

      paymantPane.querySelectorAll('.select__wrapper').forEach((select) => {
        select.classList.toggle('pointer-event-none', isDisabled);
      });

      paymantPane.querySelectorAll('.state_select').forEach((select) => {
        select.classList.toggle('pointer-event-none', isDisabled);
      });

      paymantPane.querySelector('.information__submit-wrapper').classList.toggle('hide', isDisabled);
    }

    freezePayInfoLabel.addEventListener('click', function () {
      bilingAddressIsChecked = freezePayInfoLabel.querySelector('input')?.checked || false;
      toggleFormState(bilingAddressIsChecked);

      if (bilingAddressIsChecked) {
        deliveryInputs.forEach((sourceInput, index) => {
          if (paymentInputs[index]) {
            paymentInputs[index].value = sourceInput.value;
          }
        });
      }
    });

    deliveryInputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (bilingAddressIsChecked && paymentInputs[index]) {
          paymentInputs[index].value = input.value;
        }
      });
    });
  }

  const accountTabs = document.querySelectorAll('.account__tab');
  const tabPanes = document.querySelectorAll('.account__tab-pane');
  const selectWrappers = document.querySelectorAll('.select__wrapper');
  const freezePayInfoLabel = document.querySelector('.freeze-paymant');
  const paymantPane = document.querySelector('.payment-pane');
  const deliverPane = document.querySelector('.deliver-pane');
  const deliveryInputs = deliverPane.querySelectorAll('input'); // give delivery inputs for copy value and them paste value to payments field if checked button is true
  const paymentInputs = paymantPane.querySelectorAll('input'); // give payment inputs for paste value for inputs
  let bilingAddressIsChecked = freezePayInfoLabel.querySelector('input')?.checked || false;

  selectImitation();
  tabFunction();
  freezePaymant();

  const input = document.querySelector('#pseudo-phone');
  const hiddenField = document.querySelector('#Phone-Number');

  const iti = window.intlTelInput(input, {
    initialCountry: 'auto',
    geoIpLookup: function (callback) {
      fetch('https://ipinfo.io/json')
        .then((response) => response.json())
        .then((data) => callback(data.country))
        .catch(() => callback('us'));
    },
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
    customContainer: 'select__wrapper', // Класс для кастомного контейнера
    separateDialCode: true, // Показывает код страны отдельно
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
