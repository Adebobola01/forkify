import icons from '../../img/icons.svg';

export default class view {
  _data;
  renderData(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this._renderError();
    this._data = data;
    const markUp = this._generateMarkup();
    if (!render) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML('Afterbegin', markUp);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  update(data) {
    this._data = data;
    const newMarkUp = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
    // console.log(newElements);
    // console.log(curElements);
  }

  renderSpinner() {
    const html = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
