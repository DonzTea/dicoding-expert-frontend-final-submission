import CONFIG from './config';

const API_ENDPOINT = {
  RESTAURANT: {
    LIST: `${CONFIG.BASE_URL}/list`,
    DETAIL: (restaurantID) => `${CONFIG.BASE_URL}/detail/${restaurantID}`,
  },
  IMAGE: {
    SMALL: (pictureID) => `${CONFIG.BASE_URL}/images/small/${pictureID}`,
    MEDIUM: (pictureID) => `${CONFIG.BASE_URL}/images/medium/${pictureID}`,
    LARGE: (pictureID) => `${CONFIG.BASE_URL}/images/large/${pictureID}`,
  },
  REVIEW: `${CONFIG.BASE_URL}/review`, // POST
};

export default API_ENDPOINT;
