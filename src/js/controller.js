import 'regenerator-runtime/runtime';
import 'core-js/stable';
import { MODAL_CLOSE_SEC } from './config';
import * as model from './model.js';
import recipeView from './views/recipeView';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import { async } from 'regenerator-runtime';
import addRecipeView from './views/addRecipeView.js';

if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResult(query);
    resultsView.renderData(model.getResultPage());
    paginationView.renderData(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.getResultPage());

    // loading recipe
    await model.loadRecipe(id);

    recipeView.renderData(model.state.recipe);
    bookmarksView.update(model.state.bookmarks);
    console.log(model.state.bookmarks);
    // rendering recipe
  } catch (err) {
    recipeView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.renderData(model.getResultPage(goToPage));
  paginationView.renderData(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
  // recipeView.renderData(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else {
    model.deleteBookmarks(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);
  bookmarksView.renderData(model.state.bookmarks);
  console.log(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.renderData(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.renderData(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.renderData(model.state.bookmarks);

    //change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.log('🔥🔥🔥', error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
