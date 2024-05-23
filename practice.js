// GET and POST Method

// let user = {
//   user: Anna,
//   email: example.com,
// };

// let fetchResult = fetch("https://reqres.in/api/users", {
//   method: "POST",
//   body: JSON.stringify(user),
// })
//   .then((res) => {
//     if (!res.ok) {
//       console.log(res.statusText);
//       return;
//     }
//     return res.json();
//   })
//   .then((data) => console.log("sucess update"))
//   .catch((error) => {
//     console.log(error.message);
//   });

// console.log(fetchResult);

// CREATE PROMISE

// let P = new Promise((resolve, reject) => {
//   let netIncome = 20000;

//   if (netIncome >= 21000) {
//     resolve("sống theo cách mình muốn");
//     // console.log(resolve);
//   } else {
//     reject("phải nổ lực hơn nữa");
//     // console.log(reject);
//   }
// });

// Consume a Promise

// P.then((value) => {
//   console.log(value);
// }).catch((rej) => {
//   console.log(rej);
// });

// USING ASYNC AWAIT

// let checkResult = async () => {
//   try {
//     let result = await P;
//     console.log(result);
//   } catch (e) {
//     console.log(e);
//   }
// };
// checkResult();

// Why we use promise in webdevelopment
// FETCH POST METHOD

let user = {
  user: Anna,
  email: example.com,
};

fetch("https://reqres.in/api/users", {
  method: "POST",
  body: JSON.stringify(user),
})
  .then((res) => {
    if (!res.ok) {
      console.log(res.statusText);
      return;
    }
  })
  .then((result) => console.log("upload success"))
  .catch((err) => console.log(err));
