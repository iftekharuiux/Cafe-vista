const cards = document.querySelectorAll(".right .cards img");

// cards[0].addEventListener("click", function () {
// 	activeDeactiveCard(0, 1, 2);
// 	enableDisableInputBox(false);
// });
// cards[1].addEventListener("click", function () {
// 	activeDeactiveCard(1, 0, 2);
// 	enableDisableInputBox(false);
// });
// cards[2].addEventListener("click", function () {
// 	activeDeactiveCard(2, 0, 1);
// 	enableDisableInputBox(true);
// });

function activeDeactiveCard(active, deactive1, deactive2) {
	cards[deactive1].classList.remove("selected-card");
	cards[deactive2].classList.remove("selected-card");
	cards[active].classList.add("selected-card");
}

const menuForm = document.getElementsByClassName("checkout-box")[0];

// resetting form
function enableDisableInputBox(bool) {
	for (let i = 9; i < 13; i++) {
		menuForm[i].value = "";
	}
	document.querySelector("input[name='cardName']").disabled = bool;
	document.querySelector("input[name='cardNumber']").disabled = bool;
	document.querySelector("input[name='expireDate']").disabled = bool;
	document.querySelector("input[name='cvv']").disabled = bool;
}

let totalPrice = document.getElementById("checkoutPrice");
let quantity = document.getElementById("quantity");
let price = Number(totalPrice.value.substring(1)) / Number(quantity.value);
let dec = document.querySelector(".inc-dec-cart span:first-child");
let inc = document.querySelector(".inc-dec-cart span:nth-child(3)");

inc.addEventListener("click", function () {
	if (Number(quantity.value) < 50) {
		quantity.value = Number(quantity.value) + 1;
		totalPrice.value = "$" + (price * Number(quantity.value)).toFixed(2);
	}
});

dec.addEventListener("click", function () {
	if (Number(quantity.value) > 1) {
		quantity.value = Number(quantity.value) - 1;
		totalPrice.value = "$" + (price * Number(quantity.value)).toFixed(2);
	}
});
