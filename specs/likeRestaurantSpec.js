import { FavoriteRestaurantStore } from '../src/scripts/data/indexedDB';
import * as RestaurantFactories from './helpers/restaurantFactories';

describe('Liking A Restaurant', () => {
  beforeEach(() => {
    RestaurantFactories.addLikeButtonContainer()
  });

  it('should show the like button when restaurant has not been liked before', async () => {
    await RestaurantFactories.createLikeButtonPresenter({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await RestaurantFactories.createLikeButtonPresenter({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await RestaurantFactories.createLikeButtonPresenter({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurantStore.get(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurantStore.delete(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await RestaurantFactories.createLikeButtonPresenter({ id: 1 });

    await FavoriteRestaurantStore.put({ id: 1 });
    
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(
      await FavoriteRestaurantStore.getAll()
    ).toEqual([{ id: 1 }]);

    FavoriteRestaurantStore.delete(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await RestaurantFactories.createLikeButtonPresenter({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(
      await FavoriteRestaurantStore.getAll()
    ).toEqual([]);
  });
})