import createEl from './createEl';

export default class Modal {
  constructor(parent) {
    this.parent = parent;
    this.modalBackground;
  }

  draw() {
    this.modalBackground = createEl('div', 'modal__background', this.parent);
    this.modalBackground.classList.add('hidden');
    const modalContent = createEl('div', 'modal__content', this.modalBackground);
    const nameForm = createEl('form', 'modal__form', modalContent);
    nameForm.classList.add('name-form');
    createEl('div', 'name-form__text', nameForm, 'Название');
    createEl('input', 'name-form__input', nameForm);
    const priceForm = createEl('div', 'modal__form', modalContent);
    priceForm.classList.add('price-form');
    createEl('div', 'price-form__text', priceForm, 'Стоимость');
    createEl('input', 'price-form__input', priceForm);
    const buttons = createEl('div', 'buttons', modalContent);
    createEl('button', 'submit', buttons, 'Сохранить');
    createEl('button', 'cancel', buttons, 'Отмена');
  }

  show() {
    this.modalBackground.classList.remove('hidden');
  }

  close() {
    this.modalBackground.classList.add('hidden');
  }
}
