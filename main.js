// let n0 = "0",n1 = "0";
let ops = [];
var i = 0;
const keyNumbers = document.querySelectorAll(".dig");
const keyOperators = document.querySelectorAll(".operator");
const keys = document.querySelectorAll(".keys>div>*");
// console.log({keys});

var strOperations = "0";
let arrOperations;

function operate1(op, num1, num2) {
  let a = Number(num1);
  let b = Number(num2);

  switch (op) {
    case "*":
      return a * b;
    case "/":
      return a / b;
    case "%":
      return a % b;

    default:
      break;
  }
}

function operate2(op, num1, num2) {
  let a = Number(num1);
  let b = Number(num2);

  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;

    default:
      break;
  }
}

function operate(arr) {
  let res = arr;
  let operator = ["*", "/", "%", "+", "-"];

  let iteration = 0;
  // console.log(
  //   `c1 includes ${operator[0]}`,
  //   res.indexOf(operator[0]) > 0
  // );

  while (res.indexOf(operator[0]) > 0 && res.length > res.indexOf(operator[0]) + 1) {
    console.log("#", iteration++);
    console.log(res);
    let op = res.indexOf(operator[0]);
    if (op > 0 && res.length > op + 1) {
      // console.log(arr[op - 1], arr[op], arr[op + 1]);
      let opRes = operate1(res[op], res[op - 1], res[op + 1]);
      console.log(opRes);

      res.splice(op - 1, 3, opRes);
      console.log(res);
    }
  }

  console.log("===");
  console.log(res);
  console.log();
  return res[0];
}

keys.forEach((element) => {
  element.addEventListener("click", (e) => {
    let tmp = element.id;
    if (/^[\+\-\*\/\%]+$/.test(tmp)) {
      ops[++i] = tmp;
      ++i;
      strOperations = "0";
    } else if (tmp != "=") {
      if (strOperations == "0") {
        strOperations = tmp;
      } else {
        strOperations += tmp;
      }
      ops[i] = strOperations;
    } else {
      strOperations = operate(ops);
      i=0;
    }
  });
});
