import {
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
} from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteRestaurantStore, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurantStore = favoriteRestaurantStore;
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isExist(id) {
    const restaurant = await this._favoriteRestaurantStore.get(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurantStore.put(this._restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurantStore.delete(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
