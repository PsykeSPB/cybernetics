document.addEventListener("DOMContentLoaded", function() {
  let forms = document.getElementsByClassName("form-email-valid__form");
  for (let f of forms) {
    f.onsubmit = e => {
      e.preventDefault();
      let email = f.querySelector("input[name='email']").value,
        message = f.querySelector("textarea[name='message']").value,
        email_err = val => {
          f.querySelector(".form-email-valid__email-error").innerHTML = val;
        },
        message_err = val => {
          f.querySelector(".form-email-valid__message-error").innerHTML = val;
        };
      // Reset errors
      email_err("");
      message_err("");
      // Email validation
      if (email !== "") {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          // Message validation
          if (message !== "") {
            alert(
              "В рамках тестового задания форма имеет декоративный характер"
            );
          } else {
            message_err("Заполните текст сообщения");
          }
        } else {
          email_err("Некоректный email адрес");
        }
      } else {
        email_err("Заполните ваш email");
      }
    };
  }
});
