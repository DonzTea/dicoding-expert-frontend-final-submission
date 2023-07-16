import { FavoriteRestaurantStore } from '../src/scripts/data/indexedDB';
import * as RestaurantFactories from './helpers/restaurantFactories';

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    RestaurantFactories.addLikeButtonContainer()
    await FavoriteRestaurantStore.put({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantStore.delete(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await RestaurantFactories.createLikeButtonPresenter({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await RestaurantFactories.createLikeButtonPresenter({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await RestaurantFactories.createLikeButtonPresenter({ id: 1 });

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

    expect(
      await FavoriteRestaurantStore.getAll()
    ).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await RestaurantFactories.createLikeButtonPresenter({ id: 1 });

    await FavoriteRestaurantStore.delete(1);

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

    expect(
      await FavoriteRestaurantStore.getAll()
    ).toEqual([]);
  });
})