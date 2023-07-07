import createEl from './createEl';
import Modal from './Modal';
import Card from './Card';

export default class Editor {
  constructor(parent) {
    this.parent = parent;
    this.modal = new Modal(this.parent);
    this.card;
  }

  init() {
    // localStorage.clear();
    this.drawUI();
    this.modal.draw();
    this.bindToDOM();
    this.cards = document.querySelector('.cards');
    this.card = new Card(this.cards);
    this.loadFromStorage();
  }

  bindToDOM() {
    document.addEventListener('click', this.click.bind(this));
  }

  drawUI() {
    const container = createEl('div', 'container', this.parent);
    const containerHeader = createEl('div', 'container__header', container);
    createEl('div', 'container__title', containerHeader, 'Товары');
    createEl('div', 'container__button', containerHeader, '+');
    const cardContainer = createEl('div', 'card-container', container);
    const cardContainerTitle = createEl('div', 'card-container__title', cardContainer);
    createEl('div', 'card-container__title-name', cardContainerTitle, 'Название');
    createEl('div', 'card-container__title-price', cardContainerTitle, 'Стоимость');
    createEl('div', 'card-container__title-actions', cardContainerTitle, 'Действия');
    createEl('div', 'cards', cardContainer);
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
    const arrOfNames = Array.from(document.querySelectorAll('.card__name'));
    const newArrOfNames = [];
    arrOfNames.forEach((el) => {
      newArrOfNames.push(el.textContent);
    });

    const arrOfPrices = Array.from(document.querySelectorAll('.card__price'));
    const newArrOfPrices = [];
    arrOfPrices.forEach((el) => {
      newArrOfPrices.push(el.textContent);
    });

    	localStorage.setItem('cardName', newArrOfNames);
    localStorage.setItem('cardPrice', newArrOfPrices);
  	}

  loadFromStorage() {
    const savedNames = localStorage.getItem('cardName');
    const savedPrices = localStorage.getItem('cardPrice');

    if (savedNames) {
      const arrOfSavedNames = savedNames.split(',');
      const arrOfSavedPrices = savedPrices.split(',');
      for (let i = 0; i < arrOfSavedNames.length; i++) {
        this.card.create(arrOfSavedNames[i], arrOfSavedPrices[i]);
      }
    }
  }
}
