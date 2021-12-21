const colors = require('colors');

const firstNumber = process.argv[2];
const secondNumber = process.argv[3];

let counter = 0;
let textColor = 'red';

if(isNaN(firstNumber) || isNaN(secondNumber) || firstNumber <= 1 || secondNumber <= 1){
    console.log(colors.red('Введенные данные не являются положительными числами!'));
    console.log(firstNumber, secondNumber);
} else {
    nextPrime:
for (let i = +firstNumber; i <= secondNumber; i++) { 

  for (let j = 2; j < i; j++) { 
    if (i % j == 0) continue nextPrime; 
  }

  if (textColor === 'red'){
      console.log(colors.green(i));
      textColor = 'green';
  } else if(textColor === 'green'){
    console.log(colors.yellow(i));
    textColor = 'yellow';
  } else{
    console.log(colors.red(i));
    textColor = 'red';
  }

  counter++;
}

if(counter == 0){
    console.log(colors.red('В заданном диапазоне нет простых чисел!'));
}
};
