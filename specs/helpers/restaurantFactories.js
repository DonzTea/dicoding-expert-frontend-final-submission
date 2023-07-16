import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import { FavoriteRestaurantStore } from '../../src/scripts/data/indexedDB';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

const createLikeButtonPresenter = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurantStore: FavoriteRestaurantStore,
    restaurant,
  });
};

export { addLikeButtonContainer, createLikeButtonPresenter };
