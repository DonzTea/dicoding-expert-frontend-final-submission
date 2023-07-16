import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';
import {
  createReviewForm,
  createReviewTemplate,
} from '../views/templates/template-creator';

const ReviewFormInitiator = {
  init({ restaurantID, reviewsContainer, formContainer }) {
    this._restaurantID = restaurantID;
    this._reviewsContainer = reviewsContainer;
    this._formContainer = formContainer;
    this._renderForm();
  },

  _renderForm() {
    this._formContainer.innerHTML = createReviewForm();
    const form = document.querySelector('#review-form');
    const textarea = document.querySelector('#review-form > textarea')
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const userInputValue = event.target[0].value;
      const result = await this._sendReview(userInputValue);
      const { customerReviews } = result || {};
      if (customerReviews?.length > 0) {
        for (const review of customerReviews) {
          const reviewTemplate = createReviewTemplate({
            name: review.name,
            date: review.date,
            review: review.review,
          });
          this._reviewsContainer.innerHTML =
            reviewTemplate + this._reviewsContainer.innerHTML;
        }
        textarea.value = ''
      } else {
        this._reviewsContainer.innerHTML =
          '<p class="info">Error Posting Data.</p>';
      }
    });
  },

  async _sendReview(text) {
    const body = {
      id: this._restaurantID,
      name: CONFIG.REVIEW_USERNAME,
      review: text,
    };
    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // body data type must match "Content-Type" header
      });
      return response.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
};

export default ReviewFormInitiator;
