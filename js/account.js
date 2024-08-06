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
      tab.addEventListener('click', function () {
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
      });
      selectItems.forEach((item) => {
        item.addEventListener('click', function () {
          if (buttonText) buttonText.textContent = item.textContent;
          if (hiddenField) hiddenField.value = item.textContent;
        });
      });
    });
  }

  const accountTabs = document.querySelectorAll('.account__tab');
  const tabPanes = document.querySelectorAll('.account__tab-pane');
  const selectWrappers = document.querySelectorAll('.select__wrapper');

  tabFunction();
  selectImitation();
});
