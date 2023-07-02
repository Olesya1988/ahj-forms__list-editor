import Draw from './Draw';

export default class Card {
  constructor(element) {
    this.element = element;
  }

  create(name, price) {
    const card = Draw.getItem('div', 'card', this.element);
    Draw.getItem('div', 'card__name', card, name);
    Draw.getItem('div', 'card__price', card, price);
    const cardActions = Draw.getItem('div', 'card__actions', card);
    Draw.getItem('div', 'card__edit', cardActions);
    Draw.getItem('div', 'card__delete', cardActions);

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
