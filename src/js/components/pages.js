import { LinkBlock } from "./link-block.js";
import { FullWidthGrid } from "./grid.js";
import { ExpandableRichText } from "./rich-text";
import { PageTitle, SectionHeading } from "./headings.js";
import { Breadcrumbs } from "./breadcrumbs.js";
import { Contact } from "./contact.js";

export class ModalPage {
  constructor(element) {
    console.assert(element.length === 1);
    this.element = element;
    this.page = element.find(".page");
  }

  setContent(content) {
    this.page.empty();
    this.page.append(content);
  }

  hide() {
    this.element.addClass("hidden");
  }

  show() {
    this.page.empty();
    this.element.removeClass("hidden");
  }
}

class Page {
  constructor(content) {
    this.name = content.title;
    this.overview = content.overview;
    // drop the first two entries from the array
    const breadcrumbs = content.ancestor_pages.slice(2);
    // add a label property to the crumb
    const breadcrumbsWithLabel = breadcrumbs.map((crumb) => {
      crumb.label = crumb.title;
      return crumb;
    });
    this.breadcrumbItems = breadcrumbsWithLabel;
    this.childPages = content.child_pages;
    this.profileImage = content.profile_image;
    this.contacts = this.initContacts(content);
  }

  initContacts(content) { return []; };

  render() {
    return [
      new PageTitle(this.name).render(),
      new Breadcrumbs(this.breadcrumbItems).render(),
      ...this.renderProfileImage(),
      ...this.renderOverview(),
      ...this.renderContacts(),
      ...this.renderChildPageLinks(),
    ];
  }

  renderProfileImage() {
    const elements = [];
    if (this.profileImage) {
      const imageUrl = this.profileImage.meta.download_url;
      const imageAlt = this.profileImage.title;
      elements.push($(`<img src="${imageUrl}" alt="imageAlt"></a>`));
    }
    return elements;
  }

  renderOverview() {
    const elements = [];
    if (this.overview) {
      elements.push(
        new SectionHeading("Overview").render(),
        new ExpandableRichText(this.overview).render()
      );
    }
    return elements;
  }

  renderContacts() {
    const elements = [];
    if (this.contacts && this.contacts.length > 0) {
      elements.push(
        new SectionHeading("Contacts").render(),
        new FullWidthGrid(this.contacts).render()
      );
    }
    return elements;
  }

  renderChildPageLinks() {
    const childPageLinks = this.childPages.map((page) => {
      return new LinkBlock({
        title: page.title,
        subtitle: "",
        url: page.url,
        subjectIconClasses: page.icon_classes,
      });
    });
    if (childPageLinks.length) {
      return [new FullWidthGrid(childPageLinks).render()];
    } else { return []; }
  }
}

export class AdministrationIndex extends Page {}

export class PoliticalRepsIndexPage extends Page {}

export class CouncillorGroupPage extends Page {}

export class CouncillorListPage extends Page {}

export class PersonPage extends Page {
  initContacts(content) {
    return content.person_contacts.map(
      (details) => new Contact(details)
    );
  }
}

export class AdministratorPage extends PersonPage {}

export class CouncillorPage extends PersonPage {}

export class ErrorPage {
  constructor(error) {
    this.error = error;
  }

  render() {
    return this.error;
  }
}

export class Service {
  constructor(service) {
    this.name = service.title;
    this.overview = service.overview;
    this.breadcrumbItems = [{ label: "Services", url: "/services/" }];
    this.contacts = service.service_contacts.map(
      (details) => new Contact(details)
    );
  }

  render() {
    const children = [
      new PageTitle(this.name).render(),
      new Breadcrumbs(this.breadcrumbItems).render(),
      new SectionHeading("Overview").render(),
      new ExpandableRichText(this.overview).render(),
    ];

    if (this.contacts.length > 0) {
      children.push(
        new SectionHeading("Contacts").render(),
        new FullWidthGrid(this.contacts).render()
      );
    }
    return children;
  }
}
