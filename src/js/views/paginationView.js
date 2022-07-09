import icons from '../../img/icons.svg';
import view from './view';

class paginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(this._data.results / this._data.resultsPerPage);

    // page 1 and there are other pages
    if (curPage === 1 && numPage > 1) {
      return `
        <button class="btn--inline pagination__btn--next" data-goto = ${
          curPage + 1
        }>
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>
            `;
    }
    //page 1 and there is only one page

    //last page
    if (curPage === numPage && numPage > 1) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto = ${
          curPage - 1
        }>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        `;
    }
    //other pages
    if (curPage < numPage) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto = ${
          curPage - 1
        }>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>

        <button class="btn--inline pagination__btn--next" data-goto = ${
          curPage + 1
        }>
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
          `;
    }
    return '';
  }
}
export default new paginationView();
