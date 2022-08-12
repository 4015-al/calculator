// let n0 = "0",n1 = "0";
let ops = [];
var i = 0;
const keyNumbers = document.querySelectorAll(".dig");
const keyOperators = document.querySelectorAll(".operator");
const keys = document.querySelectorAll(".keys>div>*");
console.log({ keys });

var strOperations = "0";
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

function indexOfOperator(operation, operatorsString) {
  let operator = operatorsString.split(" ");
  let operatorIndex = [];

  // return ops.indexOf("*");
  for (let i = 0; i < operator.length; i++) {
    let ndx = operation.indexOf(operator[i]);
    if (ndx > -1) operatorIndex.push(ndx);
  }
  // console.log('operatorIndex :>> ', operatorIndex);
  let res = operatorIndex.length > 0 ? Math.min(...operatorIndex) : -1;
  // console.log('res :>> ', res);
  return res;
}

function operateAll(ops) {
  const initialLength = ops.length;
  let res = ops;
  console.log("====");

  const operatorsStr1 = "* / %";
  let op1 = indexOfOperator(res, operatorsStr1);
  const operatorsStr2 = "+ -";
  let op2 = indexOfOperator(res, operatorsStr2);


  while (res.length > 2 && (op1 > -1 || op2 > -1)) {
    console.log("#"+ (initialLength - res.length)/2+" iteration");
    console.log(`index of ${operatorsStr1.split(" ")}  :>> `, op1);
    console.log(`index of ${operatorsStr2.split(" ")}  :>> `, op2);
    let opIndex = op1 > -1 ? op1 : op2;
    console.log("opIndex :>> ", opIndex);
    let op = res[opIndex];
    let n1 = res[opIndex - 1];
    let n2 = res[opIndex + 1];
    console.log("operate(op, n1, n2) :>> ", [op, n1, n2]);
    opResult = operate(op, n1, n2);
    console.log("opResult :>> ", opResult);
    res.splice(opIndex - 1, 3, opResult);
    console.log("res :>> ", res);

    op1 = indexOfOperator(res, operatorsStr1);
    op2 = indexOfOperator(res, operatorsStr2);
  }

  console.log("====");
}

keys.forEach((element) => {
  element.addEventListener("click", (e) => {
    let tmp = element.id;
    let clear = false;
    if (tmp === "C") {
      clear = true;
      strOperations = "0";
      i = 0;
      display();
    } else if (/^[\+\-\*\/\%]+$/.test(tmp)) {
      // if entering operands after pressing =, continue using the last result
      if (i == -1) i = 0;
      ops[++i] = tmp;
      ++i;
      strOperations = "0";
    } else if (tmp != "=") {
      // if entering numbers after pressing =, start a new operation
      if (i == -1) {
        strOperations = "0";
        ops[0] = 0;
        i = 0;
      }
      if (strOperations == "0") {
        strOperations = tmp;
      } else {
        strOperations += tmp;
      }
      ops[i] = strOperations;
    } else {
      strOperations = operateAll(ops);
      i = -1;
    }

    console.log("ops :>> ", ops);
    // console.log("strOperations :>> ", strOperations);
    if (!clear) {
      display(ops, strOperations);
    }
  });
});

function display(_operations, _result) {
  const operationScreen = document.querySelector("#operation");
  const resultScreen = document.querySelector("#result");

  operationScreen.textContent =
    _operations != undefined && Array.isArray(_operations)
      ? _operations.join("")
      : "";
  resultScreen.textContent = _result ? _result : "0";
}
