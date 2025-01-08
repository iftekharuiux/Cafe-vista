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
	delLink.href = `/dashboard/deleteDelivery/${prodId}`;
}
