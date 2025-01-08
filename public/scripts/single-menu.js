// product count activation
const orderCount = document.querySelector(".inc-dec input");
const dec = document.querySelector(".inc-dec span:first-child");
const inc = document.querySelector(".inc-dec span:nth-child(3)");

let singleMenuPrice = document.getElementById("price").value;

dec.addEventListener("click", function () {
	let count = Number(orderCount.value);
	if (count > 1) {
		orderCount.value = count - 1;
		price.value = "$" + ((count - 1) * singleMenuPrice.substring(1)).toFixed(2);
	}
});
inc.addEventListener("click", function () {
	let count = Number(orderCount.value);
	if (count < 50) {
		orderCount.value = count + 1;
		price.value = "$" + ((count + 1) * singleMenuPrice.substring(1)).toFixed(2);
	}
});
