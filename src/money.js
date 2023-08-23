
export default class Money{
  static conversion(USD){
    return new Promise(function(resolve, reject){
      const url = `https://v6.exchangerate-api.com/v6/9c38ff0d8e610e62e3b6c4b8/latest/USD?q=${USD}&appid=${process.env.API_KEY}`;
      let request = new XMLHttpRequest();
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, USD]);
        } else {
          const responseText = response["error-type"];
          const errorCode = this.status;
          reject([responseText, errorCode]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}



//   let request = new XMLHttpRequest();
//   const url = `https://v6.exchangerate-api.com/v6/9c38ff0d8e610e62e3b6c4b8/latest/USD?q=${USD}&appid=${process.env.API_KEY}`;

//   request.addEventListener("loadend", function() {
//     const response = JSON.parse(this.responseText);
//     if (this.status === 200) {
//       console.log(response)
//       // printElements(response, USD);
//       resolve [response, USD]
//     }else {
//       // printError(this, USD);
//       resolve [this, USD]
//     }
//   });

//   request.open("GET", url, true);
//   request.send();
//   }
// }