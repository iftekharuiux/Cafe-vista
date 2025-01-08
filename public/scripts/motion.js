document.addEventListener("DOMContentLoaded", () => {
	const products = document.querySelectorAll(
		"#opening .prod-1, #opening .prod-2, #opening .prod-3"
	);
	const menuItems = document.querySelectorAll("#menu-row .product-link");
	const coffeeMachine = document.querySelectorAll(
		"#coffee-machine .des, #coffee-machine .product-img"
	);
	const popularProducts = document.querySelectorAll("#popular-product-row .single-item");
	const ourBlogs = document.querySelectorAll("#our-blog .single-blog");
	const shopMenuItems = document.querySelectorAll(".shop-menu-item");

	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0.2,
	};

	const menuOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.3,
	};

	const observer = animationObserver(300, "product-animate", options);
	const menuObserver = animationObserver(250, "product-animate", menuOptions);
	const coffeeMachineObserver = animationObserver(250, "product-animate", options);
	const popularProductsObserver = animationObserver(320, "product-animate", options);
	const ourBlogsObserver = animationObserver(330, "product-animate", options);
	const shopMenuItemsObserver = animationObserver(280, "product-animate", options);

	if (products.length > 0) {
		products.forEach((product) => {
			observer.observe(product);
		});
	}

	if (menuItems.length > 0) {
		menuItems.forEach((menuItem) => {
			menuObserver.observe(menuItem);
		});
	}

	if (coffeeMachine.length > 0) {
		coffeeMachine.forEach((item) => {
			coffeeMachineObserver.observe(item);
		});
	}

	if (popularProducts.length > 0) {
		popularProducts.forEach((item) => {
			popularProductsObserver.observe(item);
		});
	}

	if (ourBlogs.length > 0) {
		ourBlogs.forEach((item) => {
			ourBlogsObserver.observe(item);
		});
	}

	if (shopMenuItems.length > 0) {
		shopMenuItems.forEach((item) => {
			shopMenuItemsObserver.observe(item);
		});
	}
});

function animationObserver(duration, classname, options) {
	return new IntersectionObserver((entries, observer) => {
		entries.forEach((entry, index) => {
			if (entry.isIntersecting) {
				setTimeout(() => {
					entry.target.classList.add(classname);
				}, index * duration);
				observer.unobserve(entry.target);
			}
		});
	}, options);
}
