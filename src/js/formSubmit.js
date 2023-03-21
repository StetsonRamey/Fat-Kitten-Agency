// I'm not actually using this as we're now using a cloudflare worker to handle the form submit so there is no JS on the client
const formElement = document.querySelector("form");
const email = document.querySelector("input[name='email']");
const pipedream = "https://dff0c3054eed9ae2c37314c7a2ace419.m.pipedream.net";
console.log(formElement);

if (formElement) {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData();
    data.set("Email", email.value);
    console.log("From form data", data.get("Email"));

    fetch(pipedream, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json)
      .then((result) => {
        console.log("Success", result);
      })
      .catch((error) => {
        console.error("ERROR!", error);
      });
  });
}
