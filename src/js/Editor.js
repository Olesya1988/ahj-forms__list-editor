import Draw from './Draw';
import Modal from './Modal';
import Card from './Card';

export default class Editor {
  constructor(parent) {
    this.parent = parent;
    this.modal = new Modal(this.parent);
    this.card;
  }

  init() {
    this.drawUI();
    this.modal.draw();
    this.bindToDOM();
    this.card = new Card(document.querySelector('.card-container'));
    this.getSave();
  }

  bindToDOM() {
    document.addEventListener('click', this.click.bind(this));
  }

  drawUI() {
    const container = Draw.getItem('div', 'container', this.parent);
    const containerHeader = Draw.getItem('div', 'container__header', container);
    Draw.getItem('div', 'container__title', containerHeader, 'Товары');
    Draw.getItem('div', 'container__button', containerHeader, '+');
    const cardContainer = Draw.getItem('div', 'card-container', container);
    const cardContainerTitle = Draw.getItem('div', 'card-container__title', cardContainer);
    Draw.getItem('div', 'card-container__title-name', cardContainerTitle, 'Название');
    Draw.getItem('div', 'card-container__title-price', cardContainerTitle, 'Стоимость');
    Draw.getItem('div', 'card-container__title-actions', cardContainerTitle, 'Действия');
  }

  click(e) {
    e.preventDefault();
    const { target } = e;
    const name = document.querySelector('.name-form__input');
    const price = document.querySelector('.price-form__input');
    if (target.classList.contains('container__button')) {
      this.modal.show();
    } else if (target.classList.contains('cancel')) {
      this.modal.close();
    } else if (target.classList.contains('edit')) {
      if (name.value, price.value) {
        document.querySelector('.active').remove();
        this.card.create(name.value, price.value);
        name.value = '';
        price.value = '';
        target.classList.remove('edit');
        this.modal.close();
        this.save();
      }
    } else if (target.classList.contains('submit')) {
      if (name.value, price.value) {
        this.card.create(name.value, price.value);
        name.value = '';
        price.value = '';
        this.modal.close();
        this.save();
      }
    } else if (target.classList.contains('card__edit')) {
      this.modal.show();
      name.value = this.card.read(target).name;
      price.value = this.card.read(target).price;
      document.querySelector('.submit').classList.add('edit');
      target.closest('.card').classList.add('active');
    } else if (target.classList.contains('card__delete')) {
      this.card.delete(target);
      this.save();
    }
  }

  save() {
    	localStorage.setItem('cards', document.querySelector('.card-container').innerHTML);
  	}

  getSave() {
    const fromStorage = localStorage.getItem('cards');
    if (fromStorage) {
      document.querySelector('.card-container').innerHTML = fromStorage;
    }
  }
}
