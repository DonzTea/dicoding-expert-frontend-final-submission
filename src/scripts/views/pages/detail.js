import { FavoriteRestaurantStore } from '../../data/indexedDB';
import Restaurant from '../../data/restaurant';
import API_ENDPOINT from '../../globals/api-endpoint';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import ReviewFormInitiator from '../../utils/review-form-initiator';
import {
  createDetailRestaurantCard,
  createDetailRestaurantMenuCard,
  createDetailRestaurantReviewCard,
  createJumbotron,
  createLoader,
} from '../templates/template-creator';

const Explore = {
  async render() {
    return `
      <div id="detail" class="page">
        <section class='jumbotron-container'></section>
        <section id="content">
          <div class='loader-container'>
            ${createLoader()}
            <div class="restaurant-detail-container"></div>
            <div class="row">
              <div class="menus-card-container"></div>
              <div class="reviews-card-container"></div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const loaderContainer = document.querySelector('.loader-container');
    const loader = document.querySelector('.loader');

    try {
      const { restaurant } = await Restaurant.detailRestaurant(url.id);
      if (restaurant) {
        const {
          id,
          pictureId,
          name,
          rating,
          address,
          city,
          categories,
          description,
          menus,
          customerReviews,
        } = restaurant;
        const { foods, drinks } = menus;

        const jumbotronContainer = document.querySelector(
          '.jumbotron-container',
        );
        const jumbotron = createJumbotron({
          imageSrc: API_ENDPOINT.IMAGE.MEDIUM(pictureId),
          alt: name,
        });
        jumbotronContainer.innerHTML = jumbotron;

        const restaurantDetailContainer = document.querySelector(
          '.restaurant-detail-container',
        );
        const restaurantDetailCard = createDetailRestaurantCard({
          name,
          rating,
          address,
          city,
          categories,
          description,
        });
        restaurantDetailContainer.innerHTML = restaurantDetailCard;
        LikeButtonPresenter.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          favoriteRestaurantStore: FavoriteRestaurantStore,
          restaurant: {
            id,
            name,
            pictureId,
            city,
            rating,
            description,
          },
        });

        const menusCardContainer = document.querySelector(
          '.menus-card-container',
        );
        const restaurantMenuCard = createDetailRestaurantMenuCard({
          foods,
          drinks,
        });
        menusCardContainer.innerHTML = restaurantMenuCard;

        const reviewsCardContainer = document.querySelector(
          '.reviews-card-container',
        );
        const restaurantReviewCard = createDetailRestaurantReviewCard({
          reviews: customerReviews?.reverse(),
        });
        reviewsCardContainer.innerHTML = restaurantReviewCard;
        const reviewsContainer = document.querySelector(
          '.detail-card.reviews .detail-content',
        );
        const reviewFormContainer = document.querySelector(
          '#review-form-container',
        );
        ReviewFormInitiator.init({
          restaurantID: id,
          reviewsContainer,
          formContainer: reviewFormContainer,
        });
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

export default Explore;
