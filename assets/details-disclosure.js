// class DetailsDisclosure extends HTMLElement {
//   constructor() {
//     super();
//     this.mainDetailsToggle = this.querySelector('details');
//     this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

//     this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
//     this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
//   }

//   onFocusOut() {
//     setTimeout(() => {
//       if (!this.contains(document.activeElement)) this.close();
//     });
//   }

//   onToggle() {
//     if (!this.animations) this.animations = this.content.getAnimations();

//     if (this.mainDetailsToggle.hasAttribute('open')) {
//       this.animations.forEach((animation) => animation.play());
//     } else {
//       this.animations.forEach((animation) => animation.cancel());
//     }
//   }

//   close() {
//     this.mainDetailsToggle.removeAttribute('open');
//     this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
//   }
// }

// customElements.define('details-disclosure', DetailsDisclosure);

// class HeaderMenu extends DetailsDisclosure {
//   constructor() {
//     super();
//     this.header = document.querySelector('.header-wrapper');
//   }

//   onToggle() {
//     if (!this.header) return;
//     this.header.preventHide = this.mainDetailsToggle.open;

//     if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
//     document.documentElement.style.setProperty(
//       '--header-bottom-position-desktop',
//       `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
//     );
//   }
// }

// customElements.define('header-menu', HeaderMenu);

// Display menu on hover insted click code
class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector("details");
    this.summary = this.mainDetailsToggle.querySelector("summary");
    this.content = this.summary.nextElementSibling;

    this.hoverTimeout = null;

    this.mainDetailsToggle.addEventListener("toggle", this.onToggle.bind(this));
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();
    if (this.mainDetailsToggle.hasAttribute("open")) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  openMenu() {
    this.mainDetailsToggle.setAttribute("open", "");
    this.summary.setAttribute("aria-expanded", true);
  }

  closeMenu() {
    this.mainDetailsToggle.removeAttribute("open");
    this.summary.setAttribute("aria-expanded", false);
  }
}

customElements.define("details-disclosure", DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector(".header-wrapper");

    this.summary.addEventListener(
      "mouseenter",
      this.handleMouseEnter.bind(this)
    );
    this.content.addEventListener(
      "mouseenter",
      this.handleMouseEnter.bind(this)
    );

    this.summary.addEventListener(
      "mouseleave",
      this.handleMouseLeave.bind(this)
    );
    this.content.addEventListener(
      "mouseleave",
      this.handleMouseLeave.bind(this)
    );
  }

  handleMouseEnter() {
    clearTimeout(this.hoverTimeout);
    this.openMenu();
  }

  handleMouseLeave() {
    this.hoverTimeout = setTimeout(() => {
      this.closeMenu();
    }, 150);
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (
      document.documentElement.style.getPropertyValue(
        "--header-bottom-position-desktop"
      ) !== ""
    )
      return;
    document.documentElement.style.setProperty(
      "--header-bottom-position-desktop",
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`
    );
  }
}

customElements.define("header-menu", HeaderMenu);
