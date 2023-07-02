import Draw from './Draw';

export default class Modal {
  constructor(parent) {
    this.parent = parent;
    this.modalBackground;
  }

  draw() {
    this.modalBackground = Draw.getItem('div', 'modal__background', this.parent);
    this.modalBackground.classList.add('hidden');
    const modalContent = Draw.getItem('div', 'modal__content', this.modalBackground);
    const nameForm = Draw.getItem('form', 'modal__form', modalContent);
    nameForm.classList.add('name-form');
    Draw.getItem('div', 'name-form__text', nameForm, 'Название');
    Draw.getItem('input', 'name-form__input', nameForm);
    const priceForm = Draw.getItem('div', 'modal__form', modalContent);
    priceForm.classList.add('price-form');
    Draw.getItem('div', 'price-form__text', priceForm, 'Стоимость');
    Draw.getItem('input', 'price-form__input', priceForm);
    const buttons = Draw.getItem('div', 'buttons', modalContent);
    Draw.getItem('button', 'submit', buttons, 'Сохранить');
    Draw.getItem('button', 'cancel', buttons, 'Отмена');
  }

  show() {
    this.modalBackground.classList.remove('hidden');
  }

  close() {
    this.modalBackground.classList.add('hidden');
  }
}
