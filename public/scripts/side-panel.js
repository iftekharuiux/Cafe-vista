const adminOpt = document.getElementById("reveal-admin-opt");
adminOpt.addEventListener("click", function () {
	let revealOptBtn = this.firstElementChild;
	revealOptBtn.classList.toggle("bi-caret-right-fill");
	revealOptBtn.classList.toggle("bi-caret-left-fill");
	document.querySelector("aside").classList.toggle("back-opt");
});
