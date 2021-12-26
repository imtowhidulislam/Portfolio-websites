"use strict";

// **** selecting all the html elements
const content = document.querySelectorAll(".content");
const tabs = document.querySelectorAll(".tab");
const tab_container = document.querySelector(".tab_container");
console.log(tab_container);

tab_container.addEventListener("click", (e) => {
  e.preventDefault();
  if (!e.target.classList.contains("tab")) return;
  else {
    e.preventDefault();
    tabs.forEach((tab) => {
      tab.classList.remove("tab__active");
      e.target.classList.add("tab__active");
      tab.classList.remove("tab--active");
      e.target.classList.add("tab--active");
    });

    // const getAtt = e.target.getAttribute("data-tab");
    const getAtt = e.target.dataset.tab;
    console.log(getAtt);
    const getContent = document.querySelector(`.content--${getAtt}`);
    console.log(getContent);

    content.forEach((con) => {
      console.log(con);
      con.classList.remove("content__active");
      getContent.classList.add("content__active");
    });
  }
});
