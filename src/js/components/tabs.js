import {LinkBlock} from './link-block.js';
import {FullWidthGrid} from './grid.js';

export class ServicesTab {

  constructor(api, element, tabContentContainer) {
    this.api = api;
    console.assert(element.length === 1);
    this.element = element;
    this.tabContentContainer = tabContentContainer;
    this.element.find(".icon div").removeClass("fas fa-spinner").addClass("fas fa-hands-helping");
    this.element.find(".label").text("Services");
  }

  show() {
    this.api.getServices().done(((response) => {
      const serviceLinks = response.items.map(((item) => {
        const url = `/services/${item.meta.slug}/`;
        return new LinkBlock({
          title: item.title,
          url: url,
          subjectIconClasses: item.icon_classes,
        });
      }).bind(this));
      this.grid = new FullWidthGrid(serviceLinks);
      this.tabContentContainer.element.html(this.grid.render());
    }).bind(this))
      .fail(function(a, b) {
        console.error(a, b);
      });
  }
}

export class TabContentContainer {
  constructor(element) {
    console.assert(element.length === 1);
    this.element = element;
  }
}


const actionCardTemplate = $(".styles .card.action").clone();

class ActionCard {
  constructor(title, iconClasses, url) {
    this.element = $("<a></a>");
    this.element.attr("href", url);
    this.element.append(actionCardTemplate.clone());
    console.assert(this.element.length === 1);
    this.element.find(".label").text(title);
    this.element.find(".icon div").removeClass("fas fa-spinner").addClass(iconClasses);
  }
}
