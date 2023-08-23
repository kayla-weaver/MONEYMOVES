import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import 'bootstrap';
import Money from './money';


function getConversionRates(USD){
  let apiResponsePromise = Money.conversion(USD);
  apiResponsePromise.then(function(successfulResponse){
    printElements(successfulResponse, USD);
  }).catch(function(errorResponse){      
    printError(errorResponse);
  });
}

function printError(errorResponse) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the exchange data: Code: ${errorResponse[1]}: ${errorResponse[0]}`;
}

function printElements(apiResponse, USD) {  
  const conversionSelection = document.querySelector('#conversionSelection').value;
  const rate = apiResponse[0].conversion_rates[conversionSelection];
  if (rate) {
    const converted = (USD * rate);
    document.querySelector('#showResponse').innerText = `${USD} USD = ${converted} ${conversionSelection}`;
  } else {
    document.querySelector('#showResponse').innerText = `Invalid currency code: ${conversionSelection}`;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  const USD = document.querySelector('#dollars').value;
  getConversionRates(USD);
} 

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});