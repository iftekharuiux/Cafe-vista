window.onload = () => {
	// vertical menu in the small screen effect
	const verticalMenu = document.querySelector(".vertical-menu");
	const revealList = document.querySelector(".bi-list");
	const closeMenu = document.querySelector(".bi-x-circle-fill");
	const alertDiv = document.getElementById("alert-div");
	const darkWrapper = document.querySelector(".dark-wrapper");

	closeMenu.addEventListener("click", function () {
		verticalMenu.classList.remove("reveal-sidebar");
		darkWrapper.classList.remove("dark-wrapper-visible");
	});
	revealList.addEventListener("click", function () {
		verticalMenu.classList.add("reveal-sidebar");
		darkWrapper.classList.add("dark-wrapper-visible");
	});

	// bucket or cart menu system
	let basket = document.querySelector(".bi-basket2-fill");
	let checkoutWrapper = document.querySelector(".checkout-dark-wrapper");
	let checkoutMenu = document.querySelector(".checkout-menu");
	let closeCheckout = document.getElementById("close-checkout");

	basket.addEventListener("click", function () {
		checkoutWrapper.classList.add("checkout-dark-wrapper-visible");
		checkoutMenu.classList.add("reveal-checkout-sidebar");
	});
	closeCheckout.addEventListener("click", function () {
		checkoutWrapper.classList.remove("checkout-dark-wrapper-visible");
		checkoutMenu.classList.remove("reveal-checkout-sidebar");
	});

	// search box javascript
	const searchIcon = document.getElementById("search-icon");
	const searchBox = document.querySelector(".search-input");
	searchIcon.addEventListener("click", function () {
		this.style.display = "none";
		searchBox.classList.add("search-scaling");
		let closeBtn = this.nextElementSibling;
		closeBtn.classList.remove("set-invisible");
		closeBtn.addEventListener("click", function () {
			this.classList.add("set-invisible");
			searchIcon.style.display = "block";
			searchBox.classList.remove("search-scaling");
		});
	});

	const profilePic = document.querySelectorAll(".profile-pic");
	const dropDownMenu = document.querySelectorAll(".dropdown-menu");
	for (let i = 0; i < profilePic.length; i++) {
		profilePic[i].addEventListener("click", function () {
			dropDownMenu[i].classList.toggle("dropdown-menu-reveal");
		});
	}

	// close alert boxes with timeout and x button
	const closeAlert = document.querySelectorAll(".close-alert");
	for (let i = 0; i < closeAlert.length; i++) {
		closeAlert[i].addEventListener("click", function () {
			alertDiv.style.display = "none";
		});
	}
	if (alertDiv) {
		setTimeout(() => {
			alertDiv.style.display = "none";
		}, 3000);
	}

	// single menu modal
	const singleMenu = document.querySelectorAll(".single-menu");
	const orderModal = document.querySelector(".order-modal");
	const orderCount = document.querySelector(".inc-dec input");

	// order modal close by clicking x
	let orderModalCls = document.getElementById("order-modal-close");
	if (orderModalCls) {
		orderModalCls.addEventListener("click", function () {
			orderModal.style.display = "none";
		});
	}

	let singleMenuPrice;
	singleMenu.forEach(function (menu) {
		menu.addEventListener("click", function () {
			singleMenuPrice = this.lastElementChild.children[1].innerHTML;
			document.getElementById("price").value = singleMenuPrice;
			document.getElementById("prod-img").src = this.firstElementChild.src;
			document.getElementById("img-src").value = this.firstElementChild.src;
			document.getElementById("placeName").value =
				this.lastElementChild.firstElementChild.innerHTML;
			orderModal.style.display = "block";
			orderCount.value = 1;
		});
	});

	// hidden modal feature
	closeModalClickOutside(".order-modal", ".modal-wrapper", ".modal-section");

	// coffee machine modal
	const discoverMachine = document.getElementById("discover-machine");
	const coffeeMachineModal = document.getElementsByClassName("coffee-modal")[0];
	const coffeeMachinePrice = document.getElementById("price-machine");
	const currentPrice = Number(coffeeMachinePrice?.value.substring(1));
	if (discoverMachine) {
		discoverMachine.addEventListener("click", function () {
			coffeeMachineModal.style.display = "block";
			let min = document.getElementById("min");
			let res = document.getElementById("count-res");
			let inc = document.getElementById("inc");
			inc.addEventListener("click", function () {
				let count = Number(res.value);
				if (count < 50) {
					count++;
					res.value = count;
					coffeeMachinePrice.value = "$" + (currentPrice * count).toFixed(2);
				}
			});
			min.addEventListener("click", function () {
				let count = Number(res.value);
				if (count > 1) {
					count--;
					res.value = count;
					coffeeMachinePrice.value = "$" + (currentPrice * count).toFixed(2);
				}
			});
			document
				.getElementById("order-modal-close-machine")
				.addEventListener("click", function () {
					coffeeMachineModal.style.display = "none";
				});
		});
	}

	// hide coffee machine modal by clicking outside
	closeModalClickOutside(".coffee-modal", ".coffee-modal-wrapper", ".coffee-modal-section");

	// product plus modal
	const productModal = document.querySelector(".product-plus");
	const singleProduct = document.querySelectorAll(".single-item");
	const orderProductCount = document.querySelector(".inc-dec-product input");
	const productPrice = document.getElementById("productPrice");

	let singleProductPrice;
	singleProduct.forEach(function (product) {
		product.addEventListener("click", function () {
			singleProductPrice = this.lastElementChild.children[1].innerHTML.substring(8);
			productPrice.value = singleProductPrice;
			document.getElementById("product-img-plus").src =
				this.firstElementChild.firstElementChild.src;
			document.getElementById("img-src-product").value =
				this.firstElementChild.firstElementChild.src;
			document.getElementById("placeProductName").value =
				this.lastElementChild.firstElementChild.innerHTML;
			productModal.style.display = "block";
			orderProductCount.value = 1;
		});
	});

	// order modal close by clicking x
	const orderProductModalCls = document.getElementById("product-modal-close");
	if (orderProductCount) {
		orderProductModalCls.addEventListener("click", function () {
			productModal.style.display = "none";
		});
	}

	// hidden modal feature
	closeModalClickOutside(".product-plus", ".modal-wrapper", ".modal-section");

	// product count activation
	const decProduct = document.querySelector(".inc-dec-product span:first-child");
	const incProduct = document.querySelector(".inc-dec-product span:nth-child(3)");

	decProduct?.addEventListener("click", function () {
		let count = Number(orderProductCount.value);
		if (count > 1) {
			orderProductCount.value = count - 1;
			productPrice.value = "$" + ((count - 1) * singleProductPrice.substring(1)).toFixed(2);
		}
	});
	incProduct?.addEventListener("click", function () {
		let count = Number(orderProductCount.value);
		if (count < 50) {
			orderProductCount.value = count + 1;
			productPrice.value = "$" + ((count + 1) * singleProductPrice.substring(1)).toFixed(2);
		}
	});

	// hide sidebar when clicking outside
	darkWrapper.addEventListener(
		"click",
		function (e) {
			if (!e.target.closest(".vertical-menu")) {
				verticalMenu.classList.remove("reveal-sidebar");
				darkWrapper.classList.remove("dark-wrapper-visible");
			}
		},
		false
	);

	// reservation feature for disabling user input
	const date = document.getElementById("choose-date");
	const time = document.getElementById("choose-time");
	[date, time].forEach((element) => {
		element?.addEventListener("keydown", function (e) {
			e.preventDefault();
		});
	});

	// now to future
	let today = new Date().toISOString().split("T")[0];
	document.getElementsByName("date")[0]?.setAttribute("min", today);

	// close modal by clicking outside function
	function closeModalClickOutside(modal, selector, targetSelector) {
		const mainSelector = document.querySelector(selector);
		if (mainSelector) {
			mainSelector.addEventListener(
				"click",
				function (e) {
					if (!e.target.closest(targetSelector)) {
						document.querySelector(modal).style.display = "none";
					}
				},
				false
			);
		}
	}
};

// sticky navigation
function sticky() {
	let nav = document.querySelector("nav");
	let searchBox = document.querySelector(".search-input");
	if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
		nav.classList.add("sticky");
		searchBox.classList.add("search-fading");
	} else {
		nav.classList.remove("sticky");
		searchBox.classList.remove("search-fading");
	}
}
// manage sticky class with onscroll effect
window.onscroll = function () {
	sticky();
};
