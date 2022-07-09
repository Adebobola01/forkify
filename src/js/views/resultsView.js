import view from './view';
import previewView from './previewView';

class resultsView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _generateMarkup() {
    return this._data
      .map(result => previewView.renderData(result, false))
      .join();
  }
}
export default new resultsView();
