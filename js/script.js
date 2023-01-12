let seg = [
  { fillStyle: "#ee1c24", text: "Madhavendra", textFontSize: 12 },
  { fillStyle: "#3cb878", text: "600" },
  { fillStyle: "#f6989d", text: "601" },
  { fillStyle: "#f6989d", text: "602" },
  { fillStyle: "#f6989d", text: "603" },
  { fillStyle: "#f6989d", text: "604" },
  { fillStyle: "#f6989d", text: "605" },
  { fillStyle: "#f6989d", text: "606" },
  { fillStyle: "#f6989d", text: "607" },
  { fillStyle: "#f6989d", text: "608" },
  { fillStyle: "#f6989d", text: "609" },
  { fillStyle: "#f6989d", text: "610" },
  { fillStyle: "#f6989d", text: "611" },
  { fillStyle: "#f6989d", text: "612" },
  { fillStyle: "#f6989d", text: "613" },
  { fillStyle: "#f6989d", text: "614" },
  { fillStyle: "#f6989d", text: "615" },
  { fillStyle: "#f6989d", text: "616" },
  { fillStyle: "#f6989d", text: "617" },
  { fillStyle: "#f6989d", text: "618" },
  { fillStyle: "#f6989d", text: "619" },
  { fillStyle: "#f6989d", text: "620" },
  { fillStyle: "#f6989d", text: "621" },
  { fillStyle: "#f6989d", text: "622" },
  { fillStyle: "#f6989d", text: "623" },
  { fillStyle: "#f6989d", text: "624" },
  { fillStyle: "#f6989d", text: "625" },
  { fillStyle: "#f6989d", text: "626" },
  { fillStyle: "#f6989d", text: "627" },
  { fillStyle: "#f6989d", text: "628" },
  { fillStyle: "#f6989d", text: "629" },
  { fillStyle: "#f6989d", text: "630" },
  { fillStyle: "#f6989d", text: "631" },
  { fillStyle: "#f6989d", text: "632" },
  { fillStyle: "#f6989d", text: "633" },
  { fillStyle: "#f6989d", text: "634" },
  { fillStyle: "#f6989d", text: "635" },
  { fillStyle: "#f6989d", text: "636" },
  { fillStyle: "#f6989d", text: "637" },
  { fillStyle: "#f6989d", text: "638" },
  { fillStyle: "#f6989d", text: "639" },
  { fillStyle: "#f6989d", text: "640" },
  { fillStyle: "#f6989d", text: "641" },
  { fillStyle: "#f6989d", text: "642" },
  { fillStyle: "#f6989d", text: "643" },
  { fillStyle: "#f6989d", text: "644" },
  { fillStyle: "#f6989d", text: "645" },
  { fillStyle: "#f6989d", text: "646" },
  { fillStyle: "#f6989d", text: "647" },
  { fillStyle: "#f6989d", text: "648" },
];
let seg_count = {};

// Create new wheel object specifying the parameters at creation time.
let theWheel = new Winwheel({
  fillStyle: "grreen", // The segment background colour.
  strokeStyle: "#ccc",
  textFillStyle: "black", // This is basically the text colour.
  textStrokeStyle: "null",
  outerRadius: 215, // Set outer radius so wheel fits inside the background.
  innerRadius: 0, // Make wheel hollow so segments don't go all way to center.
  textFontSize: 24, // Set default font size for the segments.
  textOrientation: "vertical", // Make text vertial so goes down from the outside of wheel.
  textAlignment: "outer", // Align text to outside of wheel.
  numSegments: seg.length, // Specify number of segments.
  segments: seg, // Define segments including colour and text.

  // Specify the animation to use.
  animation: {
    type: "spinToStop",
    duration: 10, // Duration in seconds.
    spins: 3, // Default number of complete spins.
    callbackFinished: alertPrize,
    callbackSound: playSound, // Function to call when the tick sound is to be triggered.
    soundTrigger: "pin", // Specify pins are to trigger the sound, the other option is 'segment'.
  },
  // Turn pins on.
  pins: {
    number: seg.length,
    fillStyle: "silver",
    outerRadius: 4,
  },
});

// Loads the tick audio sound in to an audio object.
let audio = new Audio("./bundles/tick.mp3");

// This function is called when the sound is to be played.
function playSound() {
  // Stop and rewind the sound if it already happens to be playing.
  audio.pause();
  audio.currentTime = 0;

  // Play the sound.
  audio.play();
}

// Vars used by the code in this page to do power controls.
let wheelPower = 0;
let wheelSpinning = false;

// -------------------------------------------------------
// Function to handle the onClick on the power buttons.
// -------------------------------------------------------
function powerSelected(powerLevel) {
  // Ensure that power can't be changed while wheel is spinning.
  if (wheelSpinning == false) {
    // Reset all to grey incase this is not the first time the user has selected the power.
    // document.getElementById('pw1').className = "";
    // document.getElementById('pw2').className = "";
    document.getElementById("pw3").className = "";

    // Now light up all cells below-and-including the one selected by changing the class.
    // if (powerLevel >= 1) {
    //     document.getElementById('pw1').className = "pw1";
    // }

    // if (powerLevel >= 2) {
    //     document.getElementById('pw2').className = "pw2";
    // }

    if (powerLevel >= 3) {
      document.getElementById("pw3").className = "pw3";
    }

    // Set wheelPower var used when spin button is clicked.
    wheelPower = powerLevel;

    // Light up the spin button by changing it's source image and adding a clickable class to it.
    document.getElementById("spin_button").src = "https://dummyimage.com/200x200/8ec75f/fff&text=SPIN";
    document.getElementById("spin_button").className = "clickable";
  }
}

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin(indicatedSegment) {
  // Ensure that spinning can't be clicked again while already running.
  if (wheelSpinning == false) {
    // Based on the power level selected adjust the number of spins for the wheel, the more times is has
    // to rotate with the duration of the animation the quicker the wheel spins.
    if (wheelPower == 1) {
      theWheel.animation.spins = 3;
    } else if (wheelPower == 2) {
      theWheel.animation.spins = 6;
    } else if (wheelPower == 3) {
      theWheel.animation.spins = 10;
    }

    // Disable the spin button so can't click again while wheel is spinning.
    document.getElementById("spin_button").src = "https://dummyimage.com/200x200/8ec75f/fff&text=SPIN";
    document.getElementById("spin_button").className = "";

    // Begin the spin animation by calling startAnimation on the wheel object.
    theWheel.startAnimation();

    // Set to true so that power can't be changed and spin button re-enabled during
    // the current animation. The user will have to reset before spinning again.
    wheelSpinning = true;
  }
}

function timeSpin() {
  let dt = new Date();
  let time = dt.getHours() + ":" + dt.getMinutes();
  console.log(time);

  let = "11:50";

  if (time == desired_Time) {
    console.log("hurray");
    startSpin();
  }
}
timeSpin();
setInterval(timeSpin, 60 * 1000);

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------

function resetWheel() {
  setTimeout(function () {
    theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    theWheel.draw(); // Call draw to render changes to the wheel.

    // document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
    // document.getElementById('pw2').className = "";
    // document.getElementById("pw3").className = "";

    wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
  }, 1700);
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
// -------------------------------------------------------

function alertPrize(indicatedSegment) {
  // Just alert to the user what happened.
  // In a real project probably want to do something more interesting than this with the result.
  if (indicatedSegment.text == "LOOSE TURN") {
    console.log("Sorry but you loose a turn.");
  } else if (indicatedSegment.text == "BANKRUPT") {
    console.log("Oh no, you have gone BANKRUPT!");
  } else {
    // alert("You have won " + indicatedSegment.text);
    // let val = `${indicatedSegment.text}`;
    setTimeout(function () {
      applause.play();
      Swal.fire({
        // title: "Congratulations You Won" + `${indicatedSegment.text}`,
        title: "Congratulations You Won" + " " + indicatedSegment.text,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      resetWheel();
    }, 100);
  }
}
