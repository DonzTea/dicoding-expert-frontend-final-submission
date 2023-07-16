import API_ENDPOINT from '../globals/api-endpoint';

class Restaurant {
  static async list() {
    const response = await fetch(API_ENDPOINT.RESTAURANT.LIST);
    return response.json();
  }

  static async detailRestaurant(restaurantID) {
    const response = await fetch(API_ENDPOINT.RESTAURANT.DETAIL(restaurantID));
    return response.json();
  }
}

export default Restaurant;
