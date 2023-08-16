import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import 'bootstrap';

function conversion(USD){
  let request = new XMLHttpRequest();
  const url = `https://v6.exchangerate-api.com/v6/9c38ff0d8e610e62e3b6c4b8/latest/USD?q=${USD}&appid=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, USD);
    }else {
      printError(this, USD);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function printError(request, USD) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the exchange data for ${USD}:  ${request.status} ${request.statusText}`;
}

function printElements(apiResponse, USD) {
  document.querySelector('#showResponse').innerText = `The conversion for  ${USD} is ${apiResponse.converstion_rates}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const USD = document.querySelector('#dollars').value;
  // document.querySelector('#dollars').value = null;
  conversion(USD);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});