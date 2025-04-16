var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    newSequence();
    $("#level-title").html("Level " + level);
    started = true;
  }
});


$(".btn").click(function () {
  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);

  // console.log(userClickedPattern);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);

  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        newSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    let wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
  }

  startOver();
}


function newSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").html("Level " + level);

  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);

  var randomChoosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChoosenColour);

  $("#" + randomChoosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // var audio = new Audio("./sounds/" + randomChoosenColour + ".mp3");
  // audio.play();
  playSound(randomChoosenColour);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
