import createEl from './createEl';

export default class Card {
  constructor(element) {
    this.element = element;
  }

  create(name, price) {
    const card = createEl('div', 'card', this.element);
    createEl('div', 'card__name', card, name);
    createEl('div', 'card__price', card, price);
    const cardActions = createEl('div', 'card__actions', card);
    createEl('div', 'card__edit', cardActions);
    createEl('div', 'card__delete', cardActions);

    return new Card(card);
  }

  read(el) {
    const parent = el.closest('.card');
    const name = parent.querySelector('.card__name');
    const price = parent.querySelector('.card__price');

    const obj = {
      name: name.textContent,
      price: price.textContent,
    };

    return obj;
  }

  delete(el) {
    const parent = el.closest('.card');
    parent.remove();
  }
}
