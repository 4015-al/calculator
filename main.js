// let n0 = "0",n1 = "0";
let ops = [];
var i = 0;
const keyNumbers = document.querySelectorAll(".dig");
const keyOperators = document.querySelectorAll(".operator");
const keys = document.querySelectorAll(".keys>div>*");
// console.log({keys});

var strOperations = "0";
let arrOperations;

keys.forEach((element) => {
  element.addEventListener("click", (e) => {
    let tmp = element.id;
    // if (
    //   tmp.includes("+")
    // ) {
    if (/^[\+\-\*\/\%\=]+$/.test(tmp)) {
      ops[++i] = tmp;
      ++i;
      strOperations = "0";
    } else {
      if (strOperations == "0") {
        strOperations = tmp;
      } else {
        strOperations += tmp;
      }
      ops[i] = strOperations;
    }
  });
});

// arrOperations=strOperations.split(/+|-|*|\/|\%/);

// console.log(arrOperations);
