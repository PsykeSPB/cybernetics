// To be sure that every element that is used in this script everything is wrapped in 'DOMContentLoaded' event, that is triggeret when page is complete.
document.addEventListener("DOMContentLoaded", function() {
  for (let a of document.getElementsByClassName("open-popup")) {
    a.onclick = function() {
      let t = document.querySelector(`#${this.getAttribute("data-popup")}`);
      t.classList.add("popup-active");
      setTimeout(() => {
        t.classList.remove("popup-active");
        t.classList.add("popup-opened");
      }, 300);
    };
  }

  for (let a of document.getElementsByClassName("popup")) {
    a.querySelector(".popup__closure").onclick = () => {
      a.classList.add("popup-active");
      a.classList.remove("popup-opened");
      setTimeout(() => {
        a.classList.remove("popup-active");
      }, 300);
    };
  }
});
