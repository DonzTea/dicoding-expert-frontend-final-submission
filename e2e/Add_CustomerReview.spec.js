Feature('Add Customer Reviews');

Scenario('Add one review', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.restaurant-card a', 5);
  I.seeElement('.restaurant-card a');
  I.click('.restaurant-card a');

  // * on detail page (like restaurant)
  I.waitForElement('.detail-content > .review', 5);
  I.seeElement('.detail-content > .review');

  const review = 'End to end testing';
  I.seeElement('#review-form > textarea');
  I.fillField('#review-form > textarea', review);

  I.seeElement('#review-form button[type="submit"]');
  I.click('#review-form button[type="submit"]');
});