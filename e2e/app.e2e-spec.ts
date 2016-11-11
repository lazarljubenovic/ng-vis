import { NgVisGraphlibPage } from './app.po';

describe('ng-vis-graphlib App', function() {
  let page: NgVisGraphlibPage;

  beforeEach(() => {
    page = new NgVisGraphlibPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
