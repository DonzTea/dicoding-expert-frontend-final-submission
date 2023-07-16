const assert = require('assert');

Feature('Liking Restaurants');

Scenario('liking one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.restaurant-card a', 5);
  I.seeElement('.restaurant-card a');
  const chosenRestaurantTitle = await I.grabTextFrom('.restaurant-card a');
  I.click('.restaurant-card a');

  // * on detail page
  I.waitForElement('#likeButtonContainer > button', 5);
  I.seeElement('#likeButtonContainer > button');
  I.click('#likeButtonContainer > button');

  // * on favorite page
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-card a', 5);
  I.seeElement('.restaurant-card a');
  const favoriteRestaurantTitle = await I.grabTextFrom('.restaurant-card a');
  
  // * compare result
  assert.equal(chosenRestaurantTitle, favoriteRestaurantTitle);
});