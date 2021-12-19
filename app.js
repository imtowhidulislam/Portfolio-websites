"use strict";

// ! HTML ELEMENTS
const mobileNavigation = document.querySelector(".mobile_navigation");
const primaryNavigation = document.querySelector(".primary_navigation");
const leftBtn = document.querySelector(".left-btn");
const righttBtn = document.querySelector(".right-btn");
const mainreviewContainer = document.querySelector(".review_main_container");
const reviewContainer = document.querySelector(".review_container");
const section1 = document.querySelector(".section1");
const navBar = document.querySelector(".area-nav");
const navItem = document.querySelector(".primary_navigation");
const navLink = document.querySelectorAll(".nav_link");
const navHeader = document.querySelector(".header-nav1");
/* all section */

const section = document.querySelectorAll(".section");
const header = document.querySelector(".header");
console.log(header);
// const height = header.getBoundingClientRect();
console.log(reviewContainer);
console.log(mainreviewContainer);

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

leftBtn.addEventListener("click", (e) => {
  console.log("Button Left");
});
righttBtn.addEventListener("click", (e) => {
  console.log("Button Right");
});

/* TODO:: fixed navigation  */
const navHeight = navBar.getBoundingClientRect().height;
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
  console.log(entry);
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
