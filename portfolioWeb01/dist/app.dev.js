"use strict"; // ! HTML ELEMENTS

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var mobileNavigation = document.querySelector(".mobile_navigation");
var primaryNavigation = document.querySelector(".primary_navigation");
var mainreviewContainer = document.querySelector(".review_main_container");
var reviewContainer = document.querySelector(".review_container");
var section1 = document.querySelector(".section1");
var navBar = document.querySelector(".area-nav");
var navItem = document.querySelector(".primary_navigation");
var navLink = document.querySelectorAll(".nav_link");
var navHeader = document.querySelector(".header-nav1");
/* all section */

var section = document.querySelectorAll(".section");
var header = document.querySelector(".header");
console.log(header); // const height = header.getBoundingClientRect();

console.log(reviewContainer);
console.log(mainreviewContainer);
mobileNavigation.addEventListener("click", function (e) {
  e.preventDefault();
  var getdataset = primaryNavigation.dataset.visible;
  var areaExpanded = mobileNavigation.getAttribute("aria-expanded");

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

var navHeight = navBar.getBoundingClientRect().height;

var touchHeader = function touchHeader(entries) {
  var _entries = _slicedToArray(entries, 1),
      entry = _entries[0]; // console.log(entry);


  if (!entry.isIntersecting) navBar.classList.add("sticky");else navBar.classList.remove("sticky"); // observer.unobserve(entry.target);
};

var headerObserver = new IntersectionObserver(touchHeader, {
  root: null,
  threshold: 0,
  rootMargin: "-".concat(navHeight, "px")
});
headerObserver.observe(section1);
/* TODO:: Revealing the section */

var secRevealing = function secRevealing() {
  var optionsObserver = function optionsObserver(entries, observer) {
    var _entries2 = _slicedToArray(entries, 1),
        entry = _entries2[0];

    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  };

  var getOvserber = new IntersectionObserver(optionsObserver, {
    root: null,
    threshold: 0.15
  });
  section.forEach(function (section) {
    getOvserber.observe(section);
    section.classList.add("section--hidden");
  });
};

secRevealing();
/* TODO:: Hover effect on navLink */

var puthover = function puthover(e) {
  var _this = this;

  if (e.target.classList.contains("nav_link")) {
    var link = e.target;
    var navbar = link.closest(".navbar");
    var image = navbar.closest(".area-nav").querySelector("img");
    var getallNavLink = e.target.closest(".navbar").querySelectorAll(".nav_link");
    getallNavLink.forEach(function (nav) {
      if (nav !== link) nav.style.opacity = _this;
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

var imageContainer = document.querySelectorAll("img[data-src]");

var imageObserver = function imageObserver(entries, observer) {
  var _entries3 = _slicedToArray(entries, 1),
      entry = _entries3[0];

  console.log(entry);
  if (!entry.isIntersecting) return;
  var actualImage = entry.target.src;
  var alternativeImage = entry.target.dataset.src; // actualImage = alternativeImage;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("blur");
  });
};

var image_observer = new IntersectionObserver(imageObserver, {
  root: null,
  threshold: 0
});
imageContainer.forEach(function (image) {
  image.classList.add("blur");
  return image_observer.observe(image);
});
/* !! Slider Function */

/* All HTML elements */

var leftBtn = document.querySelector(".btn__1");
var rightBtn = document.querySelector(".btn__2");
var slide = document.querySelectorAll(".slide__img");
var slider = document.querySelector(".slider");
var dots = document.querySelector(".dots");
slide.forEach(function (slide, i) {
  slide.style.transform = "translateX(".concat(100 * i, "%)");
});
/* const animation = (slideNo) => {
  return slide.forEach((slide, i) => {
    return (slide.style.transform = `translateX(${100 * (i - slideNo)}%)`);
  });
};
animation(0); */

console.log(dots);

var createDots = function createDots() {
  console.log(slide);
  slide.forEach(function (_, i) {
    var dot = dots.insertAdjacentHTML("beforeend", "<button class=\"dots__dot\" data-slide=\"".concat(i, "\"></button>"));
    return dot;
  });
};

createDots();
var dot = document.querySelectorAll(".dots__dot");
console.log(dot);

var removeActive = function removeActive(arr) {
  dot.forEach(function (erase) {
    return erase.classList.remove("dots__dot--active");
  });
  document.querySelector(".dots__dot[data-slide=\"".concat(arr, "\"]")).classList.add("dots__dot--active");
};

removeActive(0);

var gotoSlide = function gotoSlide(slides) {
  slide.forEach(function (s, i) {
    var setTransform = s.style.transform = "translateX(".concat(100 * (i - slides), "%)");
    return setTransform;
  });
};

var initCount = 0;
var lengthOfSlide = slide.length;

var RightButton = function RightButton() {
  //   this.preventDefault();
  if (initCount >= lengthOfSlide - 1) {
    initCount = 0;
  } else initCount++;

  gotoSlide(initCount);
  removeActive(initCount);
};

var leftButton = function leftButton() {
  if (initCount <= 0) {
    initCount = lengthOfSlide - 1;
  } else initCount--;

  gotoSlide(initCount);
  removeActive(initCount);
};

rightBtn.addEventListener("click", RightButton);
leftBtn.addEventListener("click", leftButton);
/* dot function */

var dotFunc = function dotFunc(dot) {
  dot.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var Link = e.target.dataset.slide;
      console.log(Link);
      gotoSlide(Link);
      removeActive(Link);
    });
  });
};

dotFunc(dot);
/* key func */

var KeyFunc = function KeyFunc() {
  document.addEventListener("keydown", function (e) {
    var leftKey = e.key === "ArrowLeft";
    var rightKey = e.key === "ArrowRight";
    console.log(e); // !left key ...........

    if (leftKey) {
      leftButton();
    } else if (rightKey) {
      RightButton();
    } else return;
  });
};

KeyFunc();