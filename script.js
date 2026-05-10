const selects = document.querySelectorAll('[data-select]');

selects.forEach((select) => {
  const button = select.querySelector('[data-select-button]');
  const label = select.querySelector('[data-select-label]');
  const list = select.querySelector('[data-select-list]');
  const hiddenInput = select.querySelector('input[type="hidden"]');
  const options = list.querySelectorAll('button');

  button.addEventListener('click', () => {
    const isOpen = select.classList.contains('aberto');

    document.querySelectorAll('[data-select].aberto').forEach((item) => {
      item.classList.remove('aberto');
      item
        .querySelector('[data-select-button]')
        .setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      select.classList.add('aberto');
      button.setAttribute('aria-expanded', 'true');
    }
  });

  options.forEach((option) => {
    option.addEventListener('click', () => {
      const value = option.dataset.value;
      const text = option.textContent;

      hiddenInput.value = value;
      label.textContent = text;
      label.style.color = '#5f6873';

      select.classList.remove('aberto');
      button.setAttribute('aria-expanded', 'false');
    });
  });
});

const steppers = document.querySelectorAll('[data-stepper]');

steppers.forEach((stepper) => {
  const input = stepper.querySelector('[data-stepper-input]');
  const decreaseButton = stepper.querySelector('[data-stepper-decrease]');
  const increaseButton = stepper.querySelector('[data-stepper-increase]');
  const min = Number(input.min) || 1;
  const max = Number(input.max) || Number.POSITIVE_INFINITY;

  const clampValue = (value) => {
    if (Number.isNaN(value)) return min;
    return Math.min(Math.max(value, min), max);
  };

  const updateValue = (value) => {
    input.value = clampValue(value);
  };

  decreaseButton.addEventListener('click', () => {
    updateValue(Number(input.value || min) - 1);
  });

  increaseButton.addEventListener('click', () => {
    updateValue(Number(input.value || min) + 1);
  });

  input.addEventListener('input', () => {
    if (input.value === '') return;
    input.value = input.value.replace(/\D/g, '');
    if (input.value === '') return;
    updateValue(Number(input.value));
  });

  input.addEventListener('blur', () => {
    updateValue(Number(input.value || min));
  });
});

class SimpleAnime {
  constructor() {
    this.items = document.querySelectorAll('[data-anime]');
    this.init();
  }

  animateItems() {
    this.items.forEach((item) => {
      const delay = Number(item.getAttribute('data-anime'));

      if (Number.isNaN(delay)) return;

      setTimeout(() => {
        item.classList.add('anime');
      }, delay);
    });
  }

  handleVisibility() {
    if (typeof document.visibilityState !== 'undefined') {
      if (document.visibilityState === 'visible') {
        this.animateItems();
      }
      return;
    }

    this.animateItems();
  }

  init() {
    this.handleVisibility = this.handleVisibility.bind(this);
    this.handleVisibility();
    document.addEventListener('visibilitychange', this.handleVisibility);
  }
}

new SimpleAnime();
