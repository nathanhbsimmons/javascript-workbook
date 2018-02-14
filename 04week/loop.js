'use strict';

const carsInReverse = ['honda', 'toyota', 'bmw',' jeep', 'ford', 'tesla']

// for loop
// Use a for loop to console.log each item in the array carsInReverse.
const consoleLogArr=()=> {
  for (i = 0; i < carsInReverse.length; i++) {
    console.log(carsInReverse[i])
  }
}
// for...in loop
// Create an object (an array with keys and values) called persons with the following data:
// firstName: "Jane"
// lastName: "Doe"
// birthDate: "Jan 5, 1925"
// gender: "female"

const persons = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female"
}

// Use a for...in loop to console.log each key.
const consoleLogKey=()=> {
  let key;
  for(key in persons){
    console.log(key)
  }
}

// Then use a for...in loop and if state to console.log the value associated with the key birthDate.
//

const consoleLogBirthdate=()=> {

  let key;
  for(key in persons){
    if (key === 'birthDate'){
      console.log(persons[key])
      return true
    }
  }
}

// while loop
// Use a for loop to console.log the numbers 1 to 1000.
const printNumWhile=()=> {
  for (i = 1; i < 1001; i++) {
    console.log(i)
  }
}
// do...while loop
// Use a do...while loop to console.log the numbers from 1 to 1000.
const printNumDoWhile=()=> {
  let i = 1
  do {
    console.log(i);
    i++;
  }
  while (i < 1001);
}
// When is a for loop better than a while loop?
//     For loop is better when you know the number of iterations and a While
//     loop is better when you do not
// How is the readability of the code affected?
//     if used where ACTUALLY needed it can increase readability
// What is the difference between a for loop and a for...in loop?
//     for loop - loops through a block of code a certain number of times
//     for...in loop - is specifically for looping through properties of an object
// What is the difference between a while loop and a do...while loop?
//     while loop - loops through a block of code while a specific condition is true
//     do...while loop - loops through a block of code once, and THEN repeats
//     the loop if and while a specific condition is true
