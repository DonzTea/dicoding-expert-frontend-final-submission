import { FavoriteRestaurantStore } from '../../data/indexedDB';
import {
  createLoader,
  createRestaurantCard,
  createJumbotron,
} from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <div id="favorite" class="page">
        <section class='jumbotron-container'>
          ${createJumbotron()}
        </section>
        <section id="content">
          <h2>Favorite Restaurants</h2>
          <div class='loader-container'>
            ${createLoader()}
            <div class="restaurants-container"></div>
          </div>
        </section>
      </div>
    `;
  },

  async afterRender() {
    const loaderContainer = document.querySelector('.loader-container');
    const loader = document.querySelector('.loader');

    try {
      const restaurants = await FavoriteRestaurantStore.getAll();
      if (restaurants?.length > 0) {
        const restaurantsContainer = document.querySelector(
          '.restaurants-container',
        );
        for (const restaurant of restaurants) {
          restaurantsContainer.innerHTML += createRestaurantCard(restaurant);
        }
      } else {
        loaderContainer.innerHTML = '<p class="info">No Data.</p>';
      }
    } catch (error) {
      console.error(error);
      loaderContainer.innerHTML = '<p class="info">Failed to Load Data.</p>';
    } finally {
      loader.remove();
    }
  },
};

export default Favorite;
