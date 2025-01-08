let orderDate = document.getElementsByClassName("order-date");
// Set the countdown time (30 minutes in milliseconds)
let countdownDuration = 30 * 60 * 1000;

// Initialize the countdown start time
let countDownDate = new Date().getTime() + countdownDuration;

// Function to start a new countdown cycle
function startCountdown() {
	// Update the count down every 1 second
	let countdownFunction = setInterval(function () {
		// Get the current date and time
		let now = new Date().getTime();

		// Find the distance between now and the countdown end time
		let distance = countDownDate - now;

		// Time calculations for minutes and seconds
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Output the result in elements with the class "order-date"
		for (let i = 0; i < orderDate.length; i++) {
			orderDate[i].innerHTML = minutes + "m " + seconds + "s ";
		}

		// If the countdown is over, reset it to 30 minutes
		if (distance < 0) {
			clearInterval(countdownFunction); // Stop the current countdown
			// Reset the countdown to 30 minutes from now
			countDownDate = new Date().getTime() + countdownDuration;
			startCountdown(); // Start a new countdown
		}
	}, 1000);
}

// Start the initial countdown
startCountdown();
