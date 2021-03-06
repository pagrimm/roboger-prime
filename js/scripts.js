//USER INTERFACE LOGIC
$(document).ready(function() {
  let numberRegex = /^[0-9]*$/;
  changeName();
});

function commandPrompt () {
  $("#prompt").text("Enter command (\"help\" for list):")
  $("#form1").submit(function(event){
    event.preventDefault();
    let command = $("#main-input").val();
    duplicateInputLine();
    clearInput();
    if (typeof window[command] === "function") {
      scrollToInput()
      window[command]();
    } else {
      invalidCommand();
    }
  });
}

function help () {
  addMessage("clear (clear the console)");
  addMessage("changeName (reset name)");
  addMessage("pigLatin (convert sentence to pig latin)");
  addMessage("roboger (talk to Mr. Roboger)");
  addMessage("romanNumerals (convert number to Roman numerals)");
  scrollToInput()
  commandPrompt();
}

function clear () {
  $(".delete").each(function (){
    $(this).remove();
  });
  commandPrompt();
}

function changeName () {
  $("#prompt").text("Enter your first name:");
    $("#form1").submit(function(event){
      event.preventDefault();
      let inputName = $("#main-input").val();
      duplicateInputLine();
      clearInput();
      if (validateInput(inputName, /^[a-zA-Z][a-zA-Z\s]*$/, 0, 21)) {
        addMessage("Username updated.");
        $("span#input-name").text(inputName);
        $("span#input-fluff").text("@PRIME"+"\xa0");
        scrollToInput();
        commandPrompt();
      } else {
        addMessage("Invalid input. Enter a string between 1 and 20 characters. No numbers, symbols, or punctuation.")
        scrollToInput();
        changeName();
      }
    });
}

function roboger () {
  $("#prompt").text("Do you want Mr. Roboger to speak forward or backward?")
  $("#form1").submit(function(event){
    event.preventDefault();
    let toggle = $("#main-input").val().toLowerCase();
    duplicateInputLine();
    clearInput();
    if (toggle === "forward" || toggle === "backward") {
      scrollToInput()
      robogerExecute(toggle);
    } else {
      addMessage("Invalid response. Please enter \"forward\" or \"backward\".")
      scrollToInput()
      roboger();
    }
  });
}

function robogerExecute (toggle) {
  $("#prompt").text("Enter an integer from 1 to 99 to speak to Mr. Roboger:")
  $("#form1").submit(function(event){
    event.preventDefault();
    let number = $("#main-input").val();
    duplicateInputLine();
    clearInput();
    if (validateInput(number, /^[0-9]*$/, 0, 100)) {
      addMessage(createResponse(number, $("#input-name").text(), toggle));
      scrollToInput()
      commandPrompt();
    } else {
      addMessage("Invalid Number. Enter an integer from 1 to 99.")
      scrollToInput()
      robogerExecute(toggle);
    }
  });
}

function pigLatin () {
  $("#prompt").text("Enter a sentence to be converted to pig latin (No numbers, symbols, or punctuation, 300 character limit):")
  $("#form1").submit(function(event) {
    event.preventDefault();
    let sentence = $("#main-input").val()
    duplicateInputLine();
    clearInput();
    if (validateInput(sentence, /^[a-zA-Z][a-zA-Z\s]*$/, 0, 301)) {
      addMessage(sentence.split(" ").map(word => makeWordPigLatin(word)).join(" "));
      scrollToInput()
      commandPrompt();
    } else {
      addMessage("Invalid sentence. No numbers, symbols, or punctuation. 300 character limit. ")
      scrollToInput()
      pigLatin();
    }
  });
}

function romanNumerals () {
  $("#prompt").text("Enter a number between 1 and 3999 to be converted to Roman numerals:")
  $("#form1").submit(function(event) {
    event.preventDefault();
    let number = $("#main-input").val()
    duplicateInputLine();
    clearInput();
    if (validateInput(number, /^[0-9]*$/, 0, 4000)) {
      addMessage(getNumeral(number));
      scrollToInput()
      commandPrompt();
    } else {
      addMessage("Invalid number. Enter an integer from 1 to 3999.")
      scrollToInput();
      romanNumerals();
    }
  });
}

function duplicateInputLine () {
  $("p#input-line").clone().insertBefore("section#input-section");
  $("p#input-line").first().addClass("delete").removeAttr("id");
  $("span#input-start").first().removeAttr("id");
  $("span#input-name").first().removeAttr("id");
  $("span#input-fluff").first().removeAttr("id");
  $("input#main-input").first().removeAttr("id").removeAttr("autofocus").removeAttr("onblur").off();
  $("#form1").off();
}

function invalidCommand () {
  $("section#input-section").before("<p class=\"delete\">Invalid command.</p>");
  commandPrompt();
}

function clearInput () {
  $("input#main-input").val("")
}

function addMessage (input) {
  $("section#input-section").before("<p class=\"delete\">" + input + "</p>");
}

function scrollToInput () {
  document.querySelector("p#input-line").scrollIntoView({behavior: 'smooth'});
}

//BUSINESS LOGIC
//function to validate any number or string input, if you pass in the regex and min and max length of the string/number
function validateInput (input, regex, min, max) {
  if (regex.test(input) && parseInt(input) > min && parseInt(input) < max) {
    return true;
  } else if (isNaN(parseInt(input)) && regex.test(input) && input.length > min && input.length < max) {
    return true;
  } else {
    return false;
  }
}

//function to create Mr. Roboger's output, takes an input number and input name, feeds them into the checkResponse function, and then either shift or unshifts the results depending on the user's forward or backwards toggle
function createResponse (inputNumber, inputName, toggle){
  let outputArray = [];
  for (i = 0; i <= inputNumber; i++) {
    if (toggle === "forward") {
      outputArray.unshift(checkResponse(inputNumber - i, inputName));
    } else {
      outputArray.push(checkResponse(inputNumber - i, inputName));
    }
  }
  return outputArray.join(", ");
}

//function to check each individual digit in an input number, determines what the highest digit is that matches our behaviors, and outputs the correct response
function checkResponse (inputNumber, inputName){
  const roboResponse = ["BEEP!", "BOOP!", "WON'T YOU BE MY NEIGHBOR, " + inputName.toUpperCase() + "?", "BZZT!"]
  let inputNumberArray = inputNumber.toString().split("").map(n => parseInt(n));
  let highNumber = 0;
  inputNumberArray.forEach(function (number) {
    if (number >= 1 && number <= roboResponse.length && highNumber < number) {
      highNumber = number;
    }
  });
  if (highNumber > 0) {
    return roboResponse[highNumber - 1];
  } else {
    return inputNumber;
  }
}

function makeWordPigLatin (inputWord) {  
  const vowels = ["a", "e", "i", "o", 'u'];
  for (i = 0; i < inputWord.length; i++) {
    if (vowels.indexOf(inputWord.charAt(i).toLowerCase()) !== -1) {
      break;
      }
    if (inputWord.slice(i, i + 2).toLowerCase() === "qu") { 
      i++;
      }
  }
  if (i === 0) {
    return inputWord + "way";
  } else {
    return inputWord.slice(i) + inputWord.slice(0, i) + "ay";
  }
}

function getNumeral (inputNumber) {
  let currentNumber = inputNumber;
  let currentNumeral = "";
  while (currentNumber > 0) {
    currentNumeral = currentNumeral + numeralCheckNumber(currentNumber)[1];
    currentNumber = numeralCheckNumber(currentNumber)[0];
  }
  return currentNumeral;
}

function numeralCheckNumber (inputNumber) {
  let numeralKey = [
    {"number":1000,"numeral":"M"},
    {"number":900,"numeral":"CM"},
    {"number":500,"numeral":"D"},
    {"number":400, "numeral":"CD"},
    {"number":100, "numeral":"C"},
    {"number":90, "numeral":"XC"},
    {"number":50, "numeral":"L"},
    {"number":40, "numeral":"XL"},
    {"number":10, "numeral":"X"},
    {"number":9, "numeral":"IX"},
    {"number":5, "numeral":"V"},
    {"number":4, "numeral":"IV"},
    {"number":1, "numeral":"I"}
  ];
  let outputNumber;
  let outputNumeral;
  for (i = 0; i < numeralKey.length; i++) {
  if (inputNumber >= numeralKey[i].number) {
    outputNumeral = numeralKey[i].numeral;
    outputNumber = inputNumber - numeralKey[i].number;
    return [outputNumber, outputNumeral];
    break;
    }
  }
}