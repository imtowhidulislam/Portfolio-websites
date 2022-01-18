const primaryNavigation = document.querySelector(".primary-navigation");
const mobileNavigation = document.querySelector(".mobile-nav-loggle");
const links = document.querySelectorAll(".uppercase");
const link = document.querySelectorAll(".nav__link");
const marsContent = document.querySelectorAll(".mars__content");
const distImage = document.querySelectorAll(".dist__image");
console.log(distImage);
console.log(marsContent);
// console.log(primaryNavigation.dataset.visibility);

mobileNavigation.addEventListener("click", () => {
  let x = primaryNavigation.getAttribute("data-visible");
  console.log(x);
  if (x === "false") {
    primaryNavigation.setAttribute("data-visible", true);
    mobileNavigation.setAttribute("aria-expanded", true);
    mobileNavigation.classList.add("cross");
  } else if (x === "true") {
    primaryNavigation.setAttribute("data-visible", false);
    mobileNavigation.setAttribute("aria-expanded", false);
    mobileNavigation.classList.remove("cross");
  }
});
const dataset = primaryNavigation.getAttribute("dataset");
console.log(getComputedStyle(primaryNavigation).height);
console.log(getComputedStyle(primaryNavigation).height);
// primaryNavigation.style.height =
// Number.parseFloat(getComputedStyle(primaryNavigation).height, 10) + 10 + "px";

/* smooth scrolling */
const smooth = () => {
  console.log(primaryNavigation);
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sec = e.target.dataset.link;
      const gotoSection = document.querySelector(`.section--${sec}`);
      gotoSection.scrollIntoView({ behavior: "smooth" });
    });
  });
};
smooth();

/* TODO: show mars content */
const showContent = () => {
  link.forEach((link) => {
    console.log(link);
    link.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target);
      const datasetNumber = e.target.dataset.links;
      console.log(datasetNumber);

      /* dist Image */
      distImage.forEach((image) => {
        image.classList.remove("dist__image--active");
      });
      marsContent.forEach((content) => {
        content.classList.remove("mars__content--active");
      });
      const showImage = document.querySelector(
        `.dist__image--${datasetNumber}`
      );
      const showmarsContent = document.querySelector(
        `.mars__content--${datasetNumber}`
      );
      console.log(showmarsContent);
      console.log(showImage);

      showImage.classList.add("dist__image--active");
      showmarsContent.classList.add("mars__content--active");
    });
  });
};
showContent();

/* TODO: command seciton */
// ** create dots
const commandContent = document.querySelectorAll(".command__content");
const dots = document.querySelector(".dots__container");
console.log(dots);
console.log(commandContent);

const createDots = () => {
  commandContent.forEach((_, i) => {
    console.log(i + 1);
    const dot = dots.insertAdjacentHTML(
      "beforeend",
      `<button class="dot" data-slide="${i + 1}"></button>`
    );
    return dot;
  });
};
createDots();

/* Remove Active Class From the untargeted dot */
const dot = document.querySelectorAll(".dot");
console.log(dot);
const removeActive = (num) => {
  dot.forEach((dot) => {
    dot.classList.remove("dot--active");
  });

  const activedot = document.querySelector(`.dot[data-slide="${num}"]`);
  activedot.classList.add("dot--active");
};
removeActive(1);

// ** show content
const commandImage = document.querySelectorAll(".command__image");

const displayCommand = () => {
  console.log(dot);
  dot.forEach((dot) => {
    console.log(dot);
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      const specificDot = e.target.dataset.slide;
      console.log(specificDot);
      commandContent.forEach((command) => {
        command.classList.remove("command__content--active");
      });
      const addActive = document.querySelector(
        `.command__content--${specificDot}`
      );
      console.log(addActive);
      addActive.classList.add("command__content--active");

      commandImage.forEach((image, i) => {
        image.classList.remove("command__image--active");
      });
      const activeImage = document.querySelector(
        `.command__image--${specificDot}`
      );
      activeImage.classList.add("command__image--active");
      /* active dot */
      removeActive(specificDot);
    });
  });
};
displayCommand();

/* techno section */
// ** Display technology Content
const techImage = document.querySelectorAll(".technology__image");
const techContent = document.querySelectorAll(".techno__content");
const techBtn = document.querySelectorAll(".btn__tech");
console.log(techBtn);
console.log(techImage);
console.log(techContent);

const removeTech = (num) => {
  techBtn.forEach((btn) => {
    btn.classList.remove("btn__tech--active");
  });

  document
    .querySelector(`.btn__tech[data-tech="${num}"]`)
    .classList.add("btn__tech--active");
};
removeTech(1);

const displayTech = () => {
  // const a = techBtn.closest(".button__container");
  techBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const getData = e.target.dataset.tech;
      console.log(getData);

      techImage.forEach((image) => {
        image.classList.remove("technology__image--active");
      });
      const tImage = document.querySelector(`.technology__image--${getData}`);
      tImage.classList.add("technology__image--active");

      techContent.forEach((content) => {
        content.classList.remove("techno__content--active");
      });
      const tContent = document.querySelector(`.techno__content--${getData}`);
      tContent.classList.add("techno__content--active");

      removeTech(getData);
    });
  });
};
displayTech();

/* TODO: Sticky Navigation */
const primaryHeader = document.querySelector(".primary-header");
const section1 = document.querySelector(".section--1");

console.log(primaryHeader);
const height = primaryHeader.getBoundingClientRect().height;
console.log(`-${height}`);
// ** showNav function
const showNav = (entries, observe) => {
  const [entry] = entries;

  if (!entry.isIntersecting)
    primaryHeader.classList.add("sticky__primary-header");
  else primaryHeader.classList.remove("sticky__primary-header");
};

const observeSection = new IntersectionObserver(showNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${height}px`,
});

observeSection.observe(section1);

/* set date dynamically */
const date = document.querySelector(".date");
const currDate = new Date().getFullYear();
const footerTitle = document.querySelector(".footer__title");
console.log(footerTitle);

date.textContent = currDate;
const footer = document.querySelector(".footer");
console.log(footer);
footer.style.backgroundColor = "#44aaff";
footer.style.paddingBlock = "1rem";
date.style.color = "white";
date.style.paddingInline = ".5rem";
footerTitle.style.paddingLeft = ".25rem";
footerTitle.style.color = "#ffffff";
