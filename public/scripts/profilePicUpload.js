window.onload = function () {
	// ============temp fix============= //
	const verticalMenu = document.querySelector(".vertical-menu");
	const revealList = document.querySelector(".bi-list");
	const closeMenu = document.querySelector(".bi-x-circle-fill");
	const alertDiv = document.getElementById("alert-div");

	closeMenu.addEventListener("click", function () {
		verticalMenu.classList.remove("reveal-sidebar");
	});
	revealList.addEventListener("click", function () {
		verticalMenu.classList.add("reveal-sidebar");
	});

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

	const closeAlert = document.querySelectorAll(".close-alert");
	for (let i = 0; i < closeAlert.length; i++) {
		closeAlert[i].addEventListener("click", function () {
			alertDiv.style.display = "none";
		});
	}

	setTimeout(() => {
		alertDiv.style.display = "none";
	}, 3000);
	// ======================== stop here ======================= //

	let baseCropping = $("#cropped-image").croppie({
		viewport: {
			width: 200,
			height: 200,
		},
		boundary: {
			width: 300,
			height: 300,
		},
		showZoomer: true,
	});

	function readableFile(file) {
		let reader = new FileReader();
		reader.onload = function (event) {
			baseCropping
				.croppie("bind", {
					url: event.target.result,
				})
				.then(() => {
					$(".cr-slider").attr({
						min: 0.5,
						max: 1.5,
					});
				});
		};
		reader.readAsDataURL(file);
	}

	$(".cancel-cropping").on("click", function () {
		$("#crop-modal").hide();
	});

	$("#profilePicsFile").on("change", function () {
		if (this.files[0]) {
			readableFile(this.files[0]);
			$("#crop-modal").show();
		}
	});

	$("#upload-image").on("click", function () {
		baseCropping
			.croppie("result", "blob")
			.then((blob) => {
				let formData = new FormData();
				let file = document.getElementById("profilePicsFile").files[0];
				let name = generateFileName(file.name);
				formData.append("profilePics", blob, name);

				let headers = new Headers();
				headers.append("Accept", "application/JSON");
				let req = new Request("/uploads/profilePics", {
					method: "POST",
					headers,
					mode: "cors",
					body: formData,
				});
				return fetch(req);
			})
			.then((res) => res.json())
			.then((data) => {
				document.getElementById("removeProfilePicsBtn").style.display = "block";
				document.getElementById("profilePics").src = data.profilePics;
				document.getElementById("profilePicsForm").reset();
			})
			.catch((err) => {
				console.error(err);
			});
		$("#crop-modal").hide();
	});
	$("#removeProfilePicsBtn").on("click", function () {
		let headers = new Headers();
		headers.append("Accept", "application/JSON");
		let req = new Request("/uploads/profilePics", {
			method: "DELETE",
			headers,
			mode: "cors",
		});
		fetch(req)
			.then((res) => res.json())
			.then((data) => {
				document.getElementById("removeProfilePicsBtn").style.display = "none";
				document.getElementById("profilePics").src = data.profilePics;
				document.getElementById("profilePicsForm").reset();
			})
			.catch((err) => {
				console.error(err);
				alert("Server error occurred");
			});
	});
};

function generateFileName(name) {
	const types = /(.jpg|.png|.jpeg|.gif)/;
	return name.replace(types, ".png");
}
// =========temp code=========== //
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

window.onscroll = function () {
	sticky();
};
