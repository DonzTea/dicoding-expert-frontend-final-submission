Feature('Unliking Restaurants');

Scenario('Unliking one restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.restaurant-card a', 5);
  I.seeElement('.restaurant-card a');
  I.click('.restaurant-card a');

  // * on detail page (like restaurant)
  I.waitForElement('#likeButtonContainer > button', 5);
  I.seeElement('#likeButtonContainer > button');
  I.click('#likeButtonContainer > button');

  // * on favorite page (check liked restaurant)
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-card a', 5);
  I.seeElement('.restaurant-card a');
  I.click('.restaurant-card a');

  // * on detail page (unlike restaurant)
  I.waitForElement('#likeButtonContainer > button', 5);
  I.seeElement('#likeButtonContainer > button');
  I.click('#likeButtonContainer > button');

  // * on favorite page (check unliked restaurant)
  I.amOnPage('/#/favorite');
  I.waitForElement('.loader-container > .info', 5);
  I.seeElement('.loader-container > .info');
  I.see('No Data.', '.loader-container > .info');
});