// close deletion confirm modal
const confirmModalBtn = document.getElementById("closeConfirmModal");
const confirmModal = document.getElementsByClassName("confirmation-modal")[0];
const closeModal = document.getElementsByClassName("closeModal")[0];

confirmModalBtn.addEventListener("click", function () {
	confirmModal.style.display = "none";
});

closeModal.addEventListener("click", function () {
	confirmModal.style.display = "none";
});

// deleting link
let prodId;
let delLink = document.getElementById("delCmdItem");

function revealConfirmation(target) {
	confirmModal.style.display = "flex";
	prodId = target.previousElementSibling.value;
	delLink.href = `/dashboard/deleteItem/${prodId}`;
}

// modal single menu modal
const orderModal = document.querySelector(".order-modal-edit");
function clsModal() {
	orderModal.style.display = "none";
}

const singleItem = document.querySelectorAll(".edit-product");

// order modal close by clicking x
let orderModalCls = document.getElementById("order-modal-close");
orderModalCls.addEventListener("click", function () {
	orderModal.style.display = "none";
});

let singleMenuPrice;
singleItem.forEach(function (item) {
	item.addEventListener("click", function () {
		orderModal.style.display = "block";
		singleMenuPrice = Number(
			this.parentElement.previousElementSibling.lastElementChild.innerHTML.substring(1)
		);
		document.getElementById("placeName").value =
			this.parentElement.previousElementSibling.firstElementChild.innerHTML;
		document.getElementById("priceEdit").value = singleMenuPrice;
		document.getElementById("prod-main-id").value =
			this.parentElement.previousElementSibling.children[1].value;
		let imageSrc = this.parentElement.previousElementSibling.previousElementSibling.src;
		document.getElementById("prod-img").src = imageSrc;
		document.getElementById("prev-img").value = imageSrc.substring(30);
	});
});
// <---------- filter --------->
let all = document.querySelectorAll("div[data-category]");
let menu = document.querySelectorAll("div[data-category='menu']");
let product = document.querySelectorAll("div[data-category='product']");
let filter = document.getElementsByClassName("filter");
// all items
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
// change image
function uploadFile(target) {
	document.querySelector("label[for='changeImg']").innerHTML = target.files[0].name;
}
