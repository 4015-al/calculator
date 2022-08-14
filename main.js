// let n0 = "0",n1 = "0";
let ops = [];
var i = 0;
const keyNumbers = document.querySelectorAll(".dig");
const keyOperators = document.querySelectorAll(".operator");
const keys = document.querySelectorAll(".keys>div>*");

var strOpNumber = "0";
let arrOperations;

function operate(op, num1, num2) {
  let a = Number(num1);
  let b = Number(num2);

  switch (op) {
    case "*":
      return a * b;
    case "/":
      return a / b;
    case "%":
      return a % b;
    case "+":
      return a + b;
    case "-":
      return a - b;

    default:
      break;
  }
}

let operation = [];
const mult_div_mod = "* / %";
const add_sub = "+ -";

// return an array containing the 1st index of given
// operators, or -1 if they doesn't exist
function indexOfOperator(operation, operatorsString) {
  // transform operatorsString -> operator Array
  let operator = operatorsString.split(" ");
  let operatorIndex = [];

  operator.forEach((op) => {
    let ndx = operation.indexOf(op); // -1 if it doesn't exist
    // if the operation contains the op add its index
    if (ndx > -1) operatorIndex.push(ndx);
  });

  // console.log('operatorIndex :>> ', operatorIndex);
  let res = operatorIndex.length > 0 ? Math.min(...operatorIndex) : -1;
  // console.log('res :>> ', res);
  return res;
}

function operateAll(ops) {
  const initialLength = ops.length;
  let res = ops;
  console.log("====");

  let op1 = indexOfOperator(res, mult_div_mod);
  let op2 = indexOfOperator(res, add_sub);

  while (res.length > 2 && (op1 > -1 || op2 > -1)) {
    console.log("#" + (initialLength - res.length) / 2 + " iteration");
    console.log(`index of ${mult_div_mod.split(" ")}  :>> `, op1);
    console.log(`index of ${add_sub.split(" ")}  :>> `, op2);

    // if there is a mult_div_mod operator use it 1st, else use add_sub
    let opIndex = op1 > -1 ? op1 : op2;
    console.log("opIndex :>> ", opIndex);

    let op = res[opIndex];
    let n1 = res[opIndex - 1];
    let n2 = res[opIndex + 1];
    console.log("operate(op, n1, n2) :>> ", [op, n1, n2]);

    opResult = operate(op, n1, n2);
    console.log("opResult :>> ", opResult);

    // after doing the operation, put
    // the result of `n1 op n2` in `n1` place
    res.splice(opIndex - 1, 3, opResult);
    console.log("res :>> ", res);

    // get the remaining operators in the operation
    op1 = indexOfOperator(res, mult_div_mod);
    op2 = indexOfOperator(res, add_sub);
  }

  console.log("====");
}

keys.forEach((ClickedKey) => {
  ClickedKey.addEventListener("click", (e) => {
    let k = ClickedKey.id;
    let clear = false;

    if (k === "=") {
      strOpNumber = operateAll(ops);
      i = -1;
    }
    // clear
    else if (k === "C") {
      clear = true;
      strOpNumber = "0";
      i = 0;
      display();
      console.clear();
    }
    // operator
    else if (/^[\+\-\*\/\%]+$/.test(k)) {
      // if entering operators after pressing =,
      // continue while using the last result
      if (i == -1) i = 0;
      ops[++i] = k;
      ++i;
      strOpNumber = "0";
    }
    // digit
    else if (/[\d]+?/.test(k)) {
      // if entering numbers after pressing =,
      // start a new operation
      if (i == -1) {
        strOpNumber = "0";
        ops[0] = 0;
        i = 0;
      }

      if (strOpNumber == "0") {
        // start a new number
        strOpNumber = k;
      } else {
        // append to the last one
        strOpNumber += k;
      }
      ops[i] = strOpNumber;
    }

    if (!clear) {
      display(ops, strOpNumber);
    }

    console.log("ops :>> ", ops);
    console.log("strOpNumber :>> ", strOpNumber);
  });
});

function display(_operations, _result) {
  const operationScreen = document.querySelector("#operation");
  const resultScreen = document.querySelector("#result");

  let scOps, scRes;

  scOps = arrNotEmpty(_operations) ? _operations.join("") : "";
  scRes = arrNotEmpty(_operations) ? _operations[_operations.length - 1] : "0";

  operationScreen.textContent = scOps;
  resultScreen.textContent = scRes;
}

/**
 * Helpers
 *
 * @see https://github.com/4015-dev/js-snippets
 */

// check if an element exists
const exists = (x) => x !== undefined && x !== null;
// check if an element exists, an array, and is not empty
const arrNotEmpty = (arr) => exists(arr) && Array.isArray(arr) && arr.length;
