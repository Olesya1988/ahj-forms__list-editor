export default class Draw {
  static getItem(teg, selector, parent, content) {
    const item = document.createElement(teg);
    item.classList.add(selector);
    item.textContent = content;
    parent.appendChild(item);

    return item;
  }
}
