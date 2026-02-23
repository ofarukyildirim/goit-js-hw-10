import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "../css/snackbar.css";


const form = document.querySelector("form");


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const selected = document.querySelector('input[name="state"]:checked');
  const state = selected.value;

  const input = document.querySelector('input[name="delay"]');
  const delay = Number(input.value);

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve();
      } else {
        reject();
      }
    }, delay);
  })
    .then(() => {
      iziToast.success({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: "topRight",
      });
    })
    .catch(() => {
      iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`,
          position: "topRight",
      });
    });
});