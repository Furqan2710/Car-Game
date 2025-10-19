// Get all elements from HTML
var car = document.getElementById("car");
var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");

// All three signal lights
var lightRed = document.getElementById("light-red");
var lightYellow = document.getElementById("light-yellow");
var lightGreen = document.getElementById("light-green");

// Initial car position
var carPosition = 100;
var carTimer = null;

// For signal lights
var colors = ["red", "yellow", "green"];
var currentLight = 0;
var challanShown = false;

// Function to turn all lights off
function lightsOff() {
  lightRed.style.background = "gray";
  lightYellow.style.background = "gray";
  lightGreen.style.background = "gray";
}

// Function to turn on one specific light
function turnOnLight(index) {
  lightsOff();
  if (index === 0) lightRed.style.background = "red";
  if (index === 1) lightYellow.style.background = "yellow";
  if (index === 2) lightGreen.style.background = "green";
}

// Function to automatically change lights every 3 sec
function startTrafficSignal() {
  turnOnLight(currentLight);

  setInterval(function() {
    currentLight = (currentLight + 1) % 3;
    turnOnLight(currentLight);
  }, 3000);
}

// Function to get the current active light color
function getActiveLightColor() {
  return colors[currentLight];
}

// Function to move the car
function moveCar() {
  carPosition += 8;
  car.style.left = carPosition + "px";

  checkForChallan();

  // Reset position if car goes off screen
  if (carPosition > window.innerWidth) {
    carPosition = -300;
    challanShown = false;
  }
}

// Check if car crosses on red light
function checkForChallan() {
  var signalX = window.innerWidth - 300; // near right side
  var activeColor = getActiveLightColor();

  if (carPosition > signalX) {
  if (activeColor === "red" && challanShown === false) {
    alert(" You crossed on RED light! You will get a challan!");
    challanShown = true;
  }
}
}

// Start button
startBtn.addEventListener("click", function() {
  if (carTimer === null) {
    carTimer = setInterval(moveCar, 50);
  }
});

// Stop button
stopBtn.addEventListener("click", function() {
  clearInterval(carTimer);
  carTimer = null;
});

// Start the traffic signal
startTrafficSignal();
