"use strict";

// ! HTML ELEMENTS
const mobileNavigation = document.querySelector(".mobile_navigation");
const primaryNavigation = document.querySelector(".primary_navigation");
const mainreviewContainer = document.querySelector(".review_main_container");
const reviewContainer = document.querySelector(".review_container");
const section1 = document.querySelector(".section1");
const navBar = document.querySelector(".area-nav");
const navItem = document.querySelector(".primary_navigation");
const navLink = document.querySelectorAll(".nav_link");
const navHeader = document.querySelector(".header-nav1");

/* All HTML elements */
const leftBtn = document.querySelector(".btn__1");
const rightBtn = document.querySelector(".btn__2");
const slide = document.querySelectorAll(".slide__img");
const slider = document.querySelector(".slider");
const dots = document.querySelector(".dots");

/* all section */
const section = document.querySelectorAll(".section");
const header = document.querySelector(".header");
console.log(header);
// const height = header.getBoundingClientRect();

mobileNavigation.addEventListener("click", (e) => {
  e.preventDefault();
  const getdataset = primaryNavigation.dataset.visible;
  const areaExpanded = mobileNavigation.getAttribute("aria-expanded");
  if (getdataset === "false") {
    primaryNavigation.setAttribute("data-visible", true);
    mobileNavigation.setAttribute("aria-expanded", true);
    mobileNavigation.classList.add("cross");
  } else if (getdataset === "true") {
    primaryNavigation.setAttribute("data-visible", false);
    mobileNavigation.setAttribute("aria-expanded", false);
    mobileNavigation.classList.remove("cross");
  }
});

/* TODO: REVIEW IMPLEMENTATION */

// leftBtn.addEventListener("click", (e) => {
//   console.log("Button Left");
// });
// righttBtn.addEventListener("click", (e) => {
//   console.log("Button Right");
// });

/* TODO:: fixed navigation  */
const navHeight = navBar.getBoundingClientRect().height;
console.log(navHeight);
const touchHeader = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) navBar.classList.add("sticky");
  else navBar.classList.remove("sticky");
  // observer.unobserve(entry.target);
};

const headerObserver = new IntersectionObserver(touchHeader, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(section1);

/* TODO: Smooth Scrolling */
navLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const nav = e.target.closest(".area-nav");
    console.log(nav.getBoundingClientRect().height);
    console.log(nav);
    const sec = e.target.dataset.section;
    const specificSection = document.querySelector(`#section--${sec}`);
    console.log(specificSection);

    specificSection.scrollIntoView({ behavior: "smooth" });
  });
});
/* TODO:: Revealing the section */
const secRevealing = () => {
  const optionsObserver = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  };

  const getOvserber = new IntersectionObserver(optionsObserver, {
    root: null,
    threshold: 0.15,
  });

  section.forEach((section) => {
    getOvserber.observe(section);
    section.classList.add("section--hidden");
  });
};
secRevealing();

/* TODO:: Hover effect on navLink */

const puthover = function (e) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const navbar = link.closest(".navbar");
    const image = navbar.closest(".area-nav").querySelector("img");
    const getallNavLink = e.target
      .closest(".navbar")
      .querySelectorAll(".nav_link");

    getallNavLink.forEach((nav) => {
      if (nav !== link) nav.style.opacity = this;
      nav.style.transition = "all 250ms ease-in";
    });
    image.style.opacity = this;
    image.style.transition = "opacity 300ms ease-in";
  }
};

navBar.addEventListener("mouseover", puthover.bind(0.5));
navBar.addEventListener("mouseout", puthover.bind(1));

/* TODO: lazy loading image */
// const cardContainer = document.querySelectorAll(".card_container");

const imageContainer = document.querySelectorAll("img[data-src]");
const imageObserver = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  let actualImage = entry.target.src;
  let alternativeImage = entry.target.dataset.src;
  // actualImage = alternativeImage;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("blur");
  });
};

const image_observer = new IntersectionObserver(imageObserver, {
  root: null,
  threshold: 0,
});

imageContainer.forEach((image) => {
  image.classList.add("blur");
  return image_observer.observe(image);
});

/* !! Slider Function */

slide.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`;
});

/* const animation = (slideNo) => {
  return slide.forEach((slide, i) => {
    return (slide.style.transform = `translateX(${100 * (i - slideNo)}%)`);
  });
};
animation(0); */
// console.log(dots);
const createDots = () => {
  // console.log(slide);
  slide.forEach((_, i) => {
    const dot = dots.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
    return dot;
  });
};
createDots();
const dot = document.querySelectorAll(".dots__dot");
// console.log(dot);

const removeActive = (arr) => {
  dot.forEach((erase) => erase.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${arr}"]`)
    .classList.add("dots__dot--active");
};
removeActive(0);
const gotoSlide = (slides) => {
  slide.forEach((s, i) => {
    const setTransform = (s.style.transform = `translateX(${
      100 * (i - slides)
    }%)`);
    return setTransform;
  });
};
let initCount = 0;
const lengthOfSlide = slide.length;
const RightButton = () => {
  //   this.preventDefault();
  if (initCount >= lengthOfSlide - 1) {
    initCount = 0;
  } else initCount++;
  gotoSlide(initCount);
  removeActive(initCount);
};
const leftButton = () => {
  if (initCount <= 0) {
    initCount = lengthOfSlide - 1;
  } else initCount--;
  gotoSlide(initCount);
  removeActive(initCount);
};
rightBtn.addEventListener("click", RightButton);

leftBtn.addEventListener("click", leftButton);

/* dot function */
const dotFunc = (dot) => {
  dot.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const Link = e.target.dataset.slide;
      console.log(Link);
      gotoSlide(Link);
      removeActive(Link);
    });
  });
};
dotFunc(dot);
/* key func */
const KeyFunc = () => {
  document.addEventListener("keydown", (e) => {
    const leftKey = e.key === "ArrowLeft";
    const rightKey = e.key === "ArrowRight";
    console.log(e);
    // !left key ...........
    if (leftKey) {
      leftButton();
    } else if (rightKey) {
      RightButton();
    } else return;
  });
};
KeyFunc();
