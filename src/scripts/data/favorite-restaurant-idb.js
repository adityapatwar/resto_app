import { openDB } from 'idb';

const DATABASE_NAME = 'restaurant-favorites-db';
const DATABASE_VERSION = 1;
const STORE_NAME = 'favorites';

const initDB = async () => {
  return openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    const db = await initDB();
    return db.get(STORE_NAME, id);
  },
  async getAllRestaurants() {
    const db = await initDB();
    return db.getAll(STORE_NAME);
  },
  async putRestaurant(restaurant) {
    const db = await initDB();
    return db.put(STORE_NAME, restaurant);
  },
  async deleteRestaurant(id) {
    const db = await initDB();
    return db.delete(STORE_NAME, id);
  },
  async isFavorite(id) {
    const restaurant = await this.getRestaurant(id);
    return !!restaurant;
  },
};

export default FavoriteRestaurantIdb;