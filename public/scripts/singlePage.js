const bookmarks = document.getElementsByClassName("bookmark");
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const comment = document.getElementById("comment");
const commentBox = document.getElementById("comment-box");
const commentBase = document.getElementById("comment-holder");
const reply = document.getElementById("reply");

[...bookmarks].forEach((bookmark) => {
	bookmark.style.cursor = "pointer";
	bookmark.addEventListener("click", function (e) {
		let target = e.target.parentElement;

		let headers = new Headers();
		headers.append("Accept", "Application/JSON");

		let req = new Request(`/api/bookmarks/${target.dataset.post}`, {
			method: "GET",
			headers,
			mode: "cors",
		});

		fetch(req)
			.then((res) => res.json())
			.then((data) => {
				if (data.bookmark) {
					target.innerHTML = '<i class="bi bi-bookmark-fill"></i>';
				} else {
					target.innerHTML = '<i class="bi bi-bookmark"></i>';
				}
			})
			.catch((e) => {
				console.error(e);
				alert(e);
			});
	});
});

comment.addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		if (e.target.value) {
			let postId = comment.dataset.post;
			let data = {
				body: e.target.value,
				main: e.target.value,
			};
			let req = generateRequest(`/api/comments/${postId}`, "POST", data);
			console.log(req);
			fetch(req)
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					let commentElement = createComment(data);
					console.log(commentElement);
					commentBase.insertBefore(commentElement, commentBase.firstChild);
					e.target.value = "";
				})
				.catch((e) => {
					console.error(e);
					alert(e.message);
				});
		} else {
			alert("Please Enter A Valid Comment");
		}
	}
});

function createComment(comment, user) {
	// Create the parent div for the comment
	let div = document.createElement("div");
	div.classList.add("comment-holder"); // Use class instead of id for multiple comments

	// Create the user div
	let userDiv = document.createElement("div");
	userDiv.classList.add("user");

	// Create and append the img element
	let img = document.createElement("img");
	img.src = user.profilePics || "";
	img.alt = "profile";
	userDiv.appendChild(img);

	// Create and append the name-date div
	let nameDateDiv = document.createElement("div");
	nameDateDiv.classList.add("name-date");

	let usernameSpan = document.createElement("span");
	usernameSpan.textContent = user.username || "";
	nameDateDiv.appendChild(usernameSpan);

	let dateSpan = document.createElement("span");
	dateSpan.textContent = new Date(user.createdAt).toLocaleDateString();
	nameDateDiv.appendChild(dateSpan);

	userDiv.appendChild(nameDateDiv);
	div.appendChild(userDiv);

	// Create and append the comment body
	let commentBody = document.createElement("p");
	commentBody.classList.add("comment-body");
	commentBody.textContent = comment.body;
	div.appendChild(commentBody);

	return div;
}

commentBox?.addEventListener("keypress", function (e) {
	if (!e.target.value) return;
	if (e.key === "Enter") {
		let commentId = e.target.dataset.comment;
		let user = JSON.parse(e.target.dataset.user);
		let value = e.target.value;

		if (value) {
			let data = {
				body: value,
			};
			let req = generateRequest(`/api/comments/${commentId}`, "POST", data);
			fetch(req)
				.then((res) => res.json())
				.then((data) => {
					let commentElement = createComment(data, user);

					commentBase.insertBefore(commentElement, commentBase.children[0]);
					e.target.value = "";
				})
				.catch((e) => {
					alert(e.message);
				});
		} else {
			alert("Please Enter A Valid Reply");
		}
	}
});

likeBtn.addEventListener("click", function (e) {
	let postId = likeBtn.dataset.react;
	reqLikeDislike("like", postId)
		.then((res) => res.json())
		.then((data) => {
			let likeText = data.liked
				? '<i class="bi bi-hand-thumbs-up-fill"></i>'
				: '<i class="bi bi-hand-thumbs-up"></i>';
			likeText = likeText + ` ( ${data.totalLikes} )`;
			let dislikeText = `<i class="bi bi-hand-thumbs-down"></i> ( ${data.totalDislikes} )`;

			likeBtn.innerHTML = likeText;
			dislikeBtn.innerHTML = dislikeText;
		})
		.catch((e) => {
			console.error(e);
		});
});

dislikeBtn.addEventListener("click", function (e) {
	let postId = likeBtn.dataset.react;
	reqLikeDislike("dislike", postId)
		.then((res) => res.json())
		.then((data) => {
			let dislikeText = data.disliked
				? '<i class="bi bi-hand-thumbs-down-fill"></i>'
				: '<i class="bi bi-hand-thumbs-down"></i>';
			dislikeText = dislikeText + ` ( ${data.totalDislikes} )`;
			let likeText = `<i class="bi bi-hand-thumbs-up"></i> ( ${data.totalLikes} )`;

			likeBtn.innerHTML = likeText;
			dislikeBtn.innerHTML = dislikeText;
		})
		.catch((e) => {
			console.error(e);
		});
});

function generateRequest(url, method, body) {
	let headers = new Headers();
	headers.append("Accept", "Application/JSON");
	headers.append("Content-Type", "Application/JSON");

	let req = new Request(url, {
		method,
		headers,
		body: JSON.stringify(body),
		mode: "cors",
	});

	return req;
}

function createReplyElement(reply, user) {
	let innerHTML = `
		<a href="/author/${reply.user}">
			<img src="${reply.profilePics}" class="align-self-start rounded-circle" style="width: 44px; height: 44px" alt="rep_profile">
		</a>
		<div class="media-body">
			<a class="w-100 d-flex justify-content-between" href="/author/${reply.user}">
				<span>${user}</span>
				<span class="text-muted d-flex">
					a few seconds ago
				</span>
			</a>
			<p>${reply.body}</p>
		</div>
    `;

	let div = document.createElement("div");
	div.className = "media mt-3 w-100 gap-14";
	div.innerHTML = innerHTML;

	return div;
}

function reqLikeDislike(type, postId) {
	let headers = new Headers();
	headers.append("Accept", "Application/JSON");
	headers.append("Content-Type", "Application/JSON");

	let req = new Request(`/api/${type}/${postId}`, {
		method: "GET",
		headers,
		mode: "cors",
	});

	return fetch(req);
}
