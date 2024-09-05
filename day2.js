// // Callback :- Function call inside function these is callback

// const add = (a, b, Callback) => {
//   console.log(a + b);
//   Callback();
// };

// add(2, 3, () => console.log("I am callback"));

// // NodeJs Core Modules

// const fs = require("fs");
// const os = require("os");

// const user = os.userInfo();

// fs.appendFile("message.txt", "Hello " + user.username + "!\n", () =>
//   console.log("created")
// );
// console.log(user);

// // Import file

// const notes = require("./notes.js");

// console.log("notes.age", notes.age);

// const ans = notes.add(2 + notes.age, 3);
// console.log(ans);

// // Lodash

const _ = require("lodash");

const randumData = [
  1,
  2,
  3,
  2,
  1,
  2,
  3,
  2,
  1,
  "person",
  "Person",
  "person",
  10,
];

const uniqueData = _.uniq(randumData);

console.log(uniqueData);
