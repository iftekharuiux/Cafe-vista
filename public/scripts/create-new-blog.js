tinymce.init({
	selector: "#rich-text-editor",
	skin: "oxide-dark",
	content_css: "tinymce-5-dark",
	plugins: [
		"advlist lists link autolink autosave code",
		"preview",
		"searchreplace",
		"wordcount",
		"media table emoticons image",
	],
	toolbar:
		"bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview",
	height: 300,
	automatic_uploads: true,
	relative_urls: false,
	images_upload_url: "/uploads/postImage",

	images_upload_handler: function (blobInfo, success, failure) {
		let headers = new Headers();
		headers.append("Accept", "application/JSON");

		let formData = new FormData();
		formData.append("post-image", blobInfo.blob(), blobInfo.filename());

		let req = new Request("/uploads/postImage", {
			method: "POST",
			headers,
			mode: "cors",
			body: formData,
		});

		fetch(req)
			.then((res) => res.json())
			.then((data) => success(data.imgUrl))
			.catch((err) => failure("HTTP Error"));
	},
});
