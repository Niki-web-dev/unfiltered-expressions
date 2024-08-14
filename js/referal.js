document.addEventListener('DOMContentLoaded', function () {
  const faqList = document.querySelectorAll('.faq__wrapper');
  let debounceTimeout;

  faqList.forEach((faq) => {
    faq.addEventListener('click', function () {
      if (debounceTimeout) return; // Prevent multiple rapid clicks

      if (faq.classList.contains('open')) {
        closeDropdown(faq.querySelector('.faq__list'));
      } else {
        closeAllDropdowns();
        openDropdown(faq.querySelector('.faq__list'));
      }
      faq.classList.toggle('open');

      // Debounce: disable further clicks for 500ms
      debounceTimeout = setTimeout(() => {
        debounceTimeout = null;
      }, 500);
    });
  });

  function toggleDropdown(menu, isOpen) {
    menu.style.display = 'block';
    menu.animate(
      [
        { maxHeight: isOpen ? menu.scrollHeight + 'px' : '0', opacity: isOpen ? '1' : '0' },
        { maxHeight: isOpen ? '0' : menu.scrollHeight + 'px', opacity: isOpen ? '0' : '1' },
      ],
      {
        duration: 500,
        easing: isOpen ? 'ease-in' : 'ease-out',
        fill: 'forwards',
      }
    ).onfinish = () => {
      if (isOpen) menu.style.display = 'none';
    };
  }

  function openDropdown(menu) {
    toggleDropdown(menu, false);
  }

  function closeDropdown(menu) {
    toggleDropdown(menu, true);
  }

  function closeAllDropdowns() {
    faqList.forEach((faq) => {
      if (faq.classList.contains('open')) {
        closeDropdown(faq.querySelector('.faq__list'));
        faq.classList.remove('open');
      }
    });
  }

  function measureText(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    return context.measureText(text).width;
  }

  const elements = document.querySelectorAll('.faq__button-text');

  elements.forEach((el) => {
    const font = getComputedStyle(el).font;
    const maxWidth = el.clientWidth;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const originalText = el.innerText;
    let lines = [];
    let line = '';

    // Разбиваем текст на строки
    originalText.split(' ').forEach((word) => {
      const testLine = line + (line ? ' ' : '') + word;
      if (measureText(testLine, font) > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    });

    if (line) {
      lines.push(line);
    }

    // Обновляем HTML элемента
    el.innerHTML = lines.map((line) => `<span>${line}</span>`).join('<br>');

    // Применяем высоту для корректного отображения
    el.style.lineHeight = lineHeight + 'px';
  });
});
