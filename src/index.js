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
  const conversionSelection = document.querySelector('#conversionSelection').value;
  document.querySelector('#dollars').addEventListener('change', function() {
    const USD = document.querySelector('#dollars').value;
    conversion(USD);
  });
  const rate = apiResponse.conversion_rates[conversionSelection];
  if (rate) {
    const converted = (USD * rate);
    document.querySelector('#showResponse').innerText = `${USD} USD = ${converted} ${conversionSelection}`;
  } else {
    document.querySelector('#showResponse').innerText = `Invalid currency code: ${conversionSelection}`;
  }

  document.querySelector('#conversionSelection').addEventListener('change', function() {
    const USD = document.querySelector('#dollars').value;
    conversion(USD);
  });
}

function handleFormSubmission(event) {
  event.preventDefault();
  const USD = document.querySelector('#dollars').value;
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});