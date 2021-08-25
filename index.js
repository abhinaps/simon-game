var buttonColours = ["red","green","blue","yellow"];

var gameColours = [];
var userClickedPattern = [];

var started = false;
var level = 0;


function checkAnswer(currentLevel) {

    if (gameColours[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gameColours.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      },200);

      started = false;
      level = 0;
      // userClickedPattern = [];
      gameColours = [];

      $("h1").text("Game Over, Press Any Key to Restart");

      new Audio('sounds/wrong.mp3').play();
    }
}

// playing audio
function playsound(name){
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

// pressing the button
function animatePress(currentColor){
  $(currentColor).addClass("pressed");
  setTimeout(function(){
    $(currentColor).removeClass("pressed");
  },100);
}

// next sequence
function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("LEVEL "+level);

  var randomNumbers  = Math.floor((Math.random()*4));
  var randomChosenColour = buttonColours[randomNumbers];
  gameColours.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChosenColour);



};


// starting simon game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// user chosen colour
$(".btn").click(function(){
  var id = $(this).attr("id");
  userClickedPattern.push(id);
  playsound(id);
  animatePress(this);

  checkAnswer(userClickedPattern.length-1)
});
