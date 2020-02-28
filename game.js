
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickPattern = [];
var gameStarted = false;
var level = 0;

$(document).keypress(function() {

  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }

});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");

  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  userClickPattern.push(userChosenColor);
  console.log(userClickPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(level);
});

function nextSequence() {

  userClickPattern = [];

  level++;

  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);


  console.log(gamePattern);


}

function checkAnswer(currentLevel) {

  var clickIndex = userClickPattern.length - 1;

  if (userClickPattern[clickIndex] === gamePattern[clickIndex]) {

    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
      playSound("wrong");

      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
