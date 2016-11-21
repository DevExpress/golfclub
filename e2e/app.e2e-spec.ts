import { browser, element, by } from 'protractor';

describe('golf club: home page', function() {

  it('should be able to load the home page', () => {
    browser.get('/');
  });
  it("should show five clubs", () => {
      let clubs = element.all(by.css(".club"));
      expect(clubs.count()).toEqual(5);
  });
  it("should be able to select a location", () => {
      let location = element(by.css(".search-location .dx-dropdowneditor-icon"));
      location.click();
      let item = element.all(by.css(".dx-list-item")).first();
      item.click();
  });
  it("should be able to fill a form", () => {
      let date = element.all(by.css(".groupItems .dx-dropdowneditor-icon")).first();
      date.click();
      let today = element(by.css(".dx-calendar-today"));
      today.click();
  });
  it('should be able to click on search button', () => {
    let search = element(by.css(".search"));
    search.click();
  });
});
describe('golf club: clubs page', function() {

  it('should be able to load the clubs page', () => {
      browser.get('/#/clubs;location=1;startDate=11%2F09%2F2016;endDate=11%2F16%2F2016;holes=18;players=2');
  });
  it('should show two clubs', () => {
      let clubs = element.all(by.css(".club"));
        expect(clubs.count()).toEqual(2);
  });
  it('should show address', () => {
      let address = element(by.css(".address")).getText();
        expect(address).toEqual("San Diego, CA, USA");
  });
  it('should be able to book a club', () => {
      let clubs = element.all(by.css(".club .button")).first();
      clubs.click();
      element(by.css(".button-popup.green-button")).click();
  });
  it('should be able to change search', () => {
      element(by.css(".change-search-btn")).click();
      element(by.css(".search-location .dx-dropdowneditor-icon")).click();
      element(by.css(".dx-list-item:nth-child(1)")).click();
      element(by.css(".search")).click();
  });
});
describe('golf club: info page', function() {

  it('should be able to load the clubs page', () => {
      browser.get('/#/info;location=1;clubId=1;startDate=11%2F09%2F2016;endDate=11%2F10%2F2016;players=2;holes=9');
  });
  it('should show name', () => {
      let name = element(by.css(".info .name")).getText();
        expect(name).toEqual("Starry Sky Golf Club");
  });
  it('should be able to book a club', () => {
      let clubs = element(by.css(".description .button"));
      clubs.click();
      element(by.css(".button-popup.green-button")).click();
  });
  it('should be able to change search', () => {
      element(by.css(".change-search-btn")).click();
      element(by.css(".search-location .dx-dropdowneditor-icon")).click();
      element(by.css(".dx-list-item:nth-child(1)")).click();
      element(by.css(".search")).click();
  });
});