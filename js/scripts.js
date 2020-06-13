//USER INTERFACE LOGIC
$(document).ready(function() {
  let numberRegex = /^[0-9]*$/;
  name();
});

function commandPrompt () {
  $("#prompt").text("ENTER COMMAND (\"HELP\" FOR LIST):")
  $("#form1").submit(function(event){
    event.preventDefault();
    let command = $("#main-input").val().toLowerCase();
    duplicateInputLine();
    clearInput();
    if (typeof window[command] === "function") {
      window[command]();
    } else {
      invalidCommand();
    }
  });
}

function help () {
  addMessage("clear    (clear the console)");
  addMessage("name     (reset username)");
  addMessage("restart  (restart Roboger Prime)");
  addMessage("roboger  (talk to Mr. Roboger)");
  commandPrompt();
}

function clear () {
  $(".delete").each(function (){
    $(this).remove();
  });
  commandPrompt();
}

function restart () {
  clear();
  $("span#input-name").text("");
  $("span#input-fluff").text("");
  name();
}

function name () {
  $("#prompt").text("ENTER USERNAME:")
  $("#form1").submit(function(event){
    event.preventDefault();
    let name = $("#main-input").val();
    duplicateInputLine();
    clearInput();
    addMessage("USERNAME UPDATED")
    $("span#input-name").text(name);
    $("span#input-fluff").text("@PRIME"+"\xa0");
    commandPrompt();
  });
}

function roboger () {
  $("#prompt").text("DO YOU WANT MR. ROBOGER TO SPEAK FORWARD OR BACKWARD?")
  $("#form1").submit(function(event){
    event.preventDefault();
    let toggle = $("#main-input").val().toLowerCase();
    duplicateInputLine();
    clearInput();
    if (toggle === "forward" || toggle === "backward") {
      robogerExecute(toggle);
    } else {
    invalidCommand()
    }
  });
}

function robogerExecute (toggle) {
  $("#prompt").text("ENTER AN INTEGER FROM 1 TO 99 TO TALK TO MR. ROBOGER:")
  $("#form1").submit(function(event){
    event.preventDefault();
    let number = $("#main-input").val()
    duplicateInputLine();
    clearInput();
    if (validateInput(number, /^[0-9]*$/, 0, 100)) {
      addMessage(createResponse(number, $("#input-name").text(), toggle));
      commandPrompt();
    } else {
      addMessage("INVALID NUMBER")
      robogerExecute(toggle);
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
  $("section#input-section").before("<p class=\"delete\">INVALID COMMAND</p>");
  commandPrompt();
}

function clearInput () {
  $("input#main-input").val("")
}

function addMessage (input) {
  $("section#input-section").before("<p class=\"delete\">" + input + "</p>");
}

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


//BUSINESS LOGIC
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