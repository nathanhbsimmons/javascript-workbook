'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Pig Latin App Plan:
//
// Variables:
// (all variables will be set inside of the pigLatin() function but outside of the inner functions)
//
// -formattedWord = new word that is trimmed and lowercase (trim and lowercase methods)
//
// -firstVowel = finds where first vowel in word is (match method)
//
// -vowelIndex = stores index of first vowel (indexOf method)
//
//
// Functions:
// -isInputValid() = checks for string containing only letters as valid input (match method), if valid run checkStartingLetter()
//
// -checkStartingLetter() = checks if word starts with vowel or consonant and formats accordingly
// (vowelIndex = 0 then add ‘yay’ to end of string, else run rearrangeLetters())
//
// -rearrangeLetters() = moves letters before first vowel to end of string and adds ‘ay’ (substring method)

function pigLatin(word) {
  const formattedWord = word.toLowerCase().trim()
  const firstVowel = formattedWord.match(/[aeiou]/)
  const vowelIndex = formattedWord.indexOf(firstVowel)

  const isInputValid=()=> {
    if (formattedWord.match(/^[a-zA-Z]+$/) && formattedWord.length > 1) {
      return checkStartingLetter()
    } else {
      return `'${word}' is not a valid input. Please type a word containing no numbers`
    }
  }

  const checkStartingLetter=()=> {
    if (vowelIndex === 0) {
      return `${formattedWord}yay`
    } else {
      return rearrangeLetters()
    }
  }

  const rearrangeLetters=()=> {
    return `${formattedWord.substring(vowelIndex)}${formattedWord.substring(0, (vowelIndex))}ay`
  }

  return isInputValid()
}


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
