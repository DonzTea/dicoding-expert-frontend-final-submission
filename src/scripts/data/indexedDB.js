import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION } = CONFIG;

const createDatabasePromise = (objectStoreName) =>
  openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
      database.createObjectStore(objectStoreName, { keyPath: 'id' });
    },
  });

const FavoriteRestaurantStore = {
  objectStoreName: 'restaurants',

  async get(id) {
    if (!id) return;
    return (await createDatabasePromise(this.objectStoreName)).get(
      this.objectStoreName,
      id,
    );
  },

  async getAll() {
    return (await createDatabasePromise(this.objectStoreName)).getAll(
      this.objectStoreName,
    );
  },

  async put(restaurant) {
    if (!restaurant.hasOwnProperty('id')) return;
    return (await createDatabasePromise(this.objectStoreName)).put(
      this.objectStoreName,
      restaurant,
    );
  },

  async delete(id) {
    return (await createDatabasePromise(this.objectStoreName)).delete(
      this.objectStoreName,
      id,
    );
  },
};

export { FavoriteRestaurantStore };
