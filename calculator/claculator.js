const equal = document.querySelector(".btn_equal");
const inputArea = document.querySelector(".inputarea");
const digits = document.querySelectorAll(".btn");
const clear = document.querySelector(".btn_clear");

/* for (let i = 0; i < digits.length; i++) {
  digits[i].addEventListener("click", () => {
    const number = digits[i].getAttribute("data-num");
    inputArea.value += number;
  });
} */
for (const btn of digits) {
  btn.addEventListener("click", () => {
    let number = btn.getAttribute("data-num");
    inputArea.value += number;
  });
}
equal.addEventListener("click", () => {
  if (inputArea.value === "") {
    alert("input area is empty");
  } else {
    let values = eval(inputArea.value);
    inputArea.value = values;
  }
});

clear.addEventListener("click", () => {
  inputArea.value = "";
});
