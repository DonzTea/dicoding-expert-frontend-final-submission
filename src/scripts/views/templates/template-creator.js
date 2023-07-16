import API_ENDPOINT from '../../globals/api-endpoint';

const createJumbotron = (data) => {
  const DEFAULT_TEXT = 'Find Your Perfect Food Journey'
  return `
  <div id="jumbotron" class="box-shadow">
    ${
      data
        ? `<img src="${data?.imageSrc}" alt="${data?.alt}" class="rounded" />`
        : PRODUCTION
        ? `<picture>
            <source media="(max-width: 650px)" srcset="./images/hero-small.webp" type="image/webp">
            <source media="(max-width: 650px)" srcset="./images/hero-small.jpg" type="image/jpeg">

            <source srcset="./images/hero-large.webp" type="image/webp">
            <source srcset="./images/hero-large.jpg" type="image/jpeg">

            <source srcset="./images/hero.webp" type="image/webp">
            <img src="./images/hero.jpg" alt="${DEFAULT_TEXT}" class="rounded" />
          </picture>`
        : `<picture>
            <source srcset="./images/hero.webp" type="image/webp">
            <img src="./images/hero.jpg" alt="${DEFAULT_TEXT}" class="rounded" />
          </picture>`
    }
    <div class="overlay" class="rounded">
      <div class="overlay-content">
        <h2>
          ${data?.text || DEFAULT_TEXT}
        </h2>
      </div>
    </div>
  </div>`;
}

const createRestaurantCard = (restaurant) =>
  `<div class="restaurant-card box-shadow">
    <div class="restaurant-card-content">
      <div class="restaurant-card-image">
        <span>${restaurant.city}</span>
        <img
          class="lazyload"
          data-src="${API_ENDPOINT.IMAGE.SMALL(restaurant.pictureId)}"
          alt="${restaurant.name}"
        />
      </div>
      <div class="restaurant-card-body">
        <p class="restaurant-rating">Rating: ${restaurant.rating}</p>
        <a href="#/detail/${restaurant.id}">
          <h3>${restaurant.name}</h3>
        </a>
        <p class="restaurant-description">
          ${restaurant.description}
        </p>
      </div>
    </div>
  </div>`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLoader = (size = '50px') =>
  `<div class="loader" style="width:${size}; height:${size};"></div>`;

const createDetailRestaurantCard = ({
  name, // string
  rating, // number | string
  address, // string
  city, // string
  categories, // { name: string }[]
  description, // string
}) =>
  `<div class="detail-card box-shadow rounded restaurant">
    <div class="detail-header">
      <p class="detail-name">${name}</p>
      <p class="detail-rate"><i class="fa fa-star" aria-hidden="true"></i> ${rating}</p>
      <div id="likeButtonContainer"></div>
    </div>
    <div class="detail-content">
      <div>
        <p class="label">Address:</p>
        <p class="value">${address}, ${city}.</p>
      </div>
      <div>
        <p class="label">Categories:</p>
        <p class="value">
          ${categories?.map((category) => category?.name)?.join(', ')}.
        </p>
      </div>
      <div>
        <p class="label">Description:</p>
        <p class="value">
          ${description}.
        </p>
      </div>
    </div>
  </div>`;

const createDetailRestaurantMenuCard = ({
  foods, // { name: string }[]
  drinks, // { name: string }[]
}) =>
  `<div class="detail-card box-shadow rounded menus">
    <p class="detail-card-title">Menus</p>
    <div class="detail-content">
      <div class="detail-menu">
        <p class="detail-menu-subtitle">Foods</p>
        <ul class="detail-menu-list">
          ${foods?.map((food) => `<li>${food?.name}</li>`)?.join('')}
        </ul>
      </div>
      <div class="detail-menu">
        <p class="detail-menu-subtitle">Drinks</p>
        <ul class="detail-menu-list">
          ${drinks?.map((drink) => `<li>${drink?.name}</li>`)?.join('')}
        </ul>
      </div>
    </div>
  </div>`;

const createReviewTemplate = ({
  name, // string
  date, // string
  review, // string
}) =>
  `<div class="review">
    <div class="review-header">
      <p class="review-name">${name}</p>
      <p class="review-date">${date}</p>
    </div>
    <p class="review-text">
      ${review}
    </p>
  </div>`;

const createDetailRestaurantReviewCard = ({
  reviews, // { date: string, name: string, review: string}[]
}) =>
  `<div class="detail-card box-shadow rounded reviews">
    <p class="detail-card-title">Reviews</p>
    <div class="detail-content">
      ${reviews?.map((review) => createReviewTemplate(review))?.join('')}
    </div>
    <div id="review-form-container"></div>
  </div>`;

const createReviewForm = () =>
  `<form id="review-form">
    <textarea type="text" placeholder="input your review..." class="rounded"></textarea>
    <div>
      <button type="submit" class="rounded">Submit</div>
    </div>
  </form>`;

export {
  createJumbotron,
  createRestaurantCard,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
  createLoader,
  createDetailRestaurantCard,
  createDetailRestaurantMenuCard,
  createReviewTemplate,
  createDetailRestaurantReviewCard,
  createReviewForm,
};
