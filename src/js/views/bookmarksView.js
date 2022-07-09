import view from './view';
import previewView from './previewView';

class bookmarksView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.renderData(bookmark, false))
      .join();
  }
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}
export default new bookmarksView();
