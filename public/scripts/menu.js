const orderModal = document.querySelector(".order-modal");
function clsModal() {
	orderModal.style.display = "none";
}

const addMenuModal = document.querySelector(".add-menu-modal");
function closeModal() {
	addMenuModal.style.display = "none";
}
function revealModal() {
	addMenuModal.style.display = "block";
}
// <---------- filter --------->
let all = document.querySelectorAll("[data-category]");
let menu = document.querySelectorAll("[data-category='menu']");
let product = document.querySelectorAll("[data-category='product']");
let filter = document.getElementsByClassName("filter");

// all items
if (filter?.length > 0) {
	filter[0].addEventListener("click", function () {
		activeDeactive(0, 1, 2);
		returningItems();
	});
	// only menu
	filter[1].addEventListener("click", function () {
		activeDeactive(1, 0, 2);
		returningItems();
		for (let i = 0; i < product.length; i++) {
			product[i].style.display = "none";
		}
	});
	// only product
	filter[2].addEventListener("click", function () {
		activeDeactive(2, 0, 1);
		returningItems();
		for (let i = 0; i < menu.length; i++) {
			menu[i].style.display = "none";
		}
	});
}

// returning all products and items
function returningItems() {
	for (let i = 0; i < all.length; i++) {
		all[i].style.display = "flex";
	}
}
// active and deactive filter
function activeDeactive(active, deactive1, deactive2) {
	filter[active].style.color = "#C7A17A";
	filter[deactive1].style.color = "#ffffff";
	filter[deactive2].style.color = "#ffffff";
}
