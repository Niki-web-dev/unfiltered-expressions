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
    selectWrappers.forEach((wrapper) => {
      const buttonText = wrapper.querySelector('.select__main-text');
      const selectList = wrapper.querySelector('.select__list');
      const selectItems = wrapper.querySelectorAll('.select__list-item');
      const button = wrapper.querySelector('.select__button');
      const hiddenField = wrapper.querySelector('.hiden-field');
      if (hiddenField && buttonText) {
        hiddenField.value = buttonText.textContent;
      }

      button.addEventListener('click', function () {
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

      paymantPane.querySelector('.information__submit-wrapper').classList.toggle('hide', isDisabled);
    }

    freezePayInfo.addEventListener('click', function () {
      bilingAddressIsChecked = freezePayInfo.querySelector('input')?.checked || false;
      toggleFormState(bilingAddressIsChecked);

      if (bilingAddressIsChecked) {
        sourceInputs.forEach((sourceInput, index) => {
          if (targetInputs[index]) {
            targetInputs[index].value = sourceInput.value;
          }
        });
      }
    });

    sourceInputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (bilingAddressIsChecked && targetInputs[index]) {
          targetInputs[index].value = input.value;
        }
      });
    });
  }

  const accountTabs = document.querySelectorAll('.account__tab');
  const tabPanes = document.querySelectorAll('.account__tab-pane');
  const selectWrappers = document.querySelectorAll('.select__wrapper');
  const freezePayInfo = document.querySelector('.freeze-paymant');
  const paymantPane = document.querySelector('.payment-pane');
  const deliverPane = document.querySelector('.deliver-pane');
  const sourceInputs = deliverPane.querySelectorAll('input'); // give delivery inputs for copy value and them paste value to payments field if checked button is true
  const targetInputs = paymantPane.querySelectorAll('input'); // give payment inputs for paste value for inputs
  const bilingAddressIsChecked = freezePayInfo.querySelector('input')?.checked || false;
  const deliveryPaneSelects = deliverPane.querySelectorAll('.select__wrapper');
  //card info
  const targetCardNumberInput = document.getElementById('target-card-number');
  const targetExpiryDateInput = document.getElementById('target-expiry-date');
  const targetCvvInput = document.getElementById('target-cvv');
  selectImitation();
  tabFunction();
  freezePaymant();

  function formatCardNumber(event) {
    let input = event.target.value.replace(/\D/g, '').substring(0, 16);
    input = input !== '' ? input.match(/.{1,4}/g).join(' ') : '';
    event.target.value = input;
  }

  function formatExpiryDate(event) {
    let input = event.target.value.replace(/\D/g, '').substring(0, 4);
    if (input.length >= 2) {
      let month = parseInt(input.substring(0, 2), 10);
      if (month > 12) {
        input = '12' + input.substring(2);
      }
      input = input.match(/.{1,2}/g).join('/');
    }
    event.target.value = input;
  }

  function formatCvv(event) {
    let input = event.target.value.replace(/\D/g, '').substring(0, 3);
    event.target.value = input;
  }

  targetCardNumberInput.addEventListener('input', formatCardNumber);
  targetExpiryDateInput.addEventListener('input', formatExpiryDate);
  targetCvvInput.addEventListener('input', formatCvv);
});
