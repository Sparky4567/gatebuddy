window.addEventListener("load", () => {
	let db = new PouchDB("noriuispunka");
	db.get("marker")
		.then(function (doc) {
			let clearSel = document.querySelectorAll(".clear")[0];
			clearSel.classList.remove(".disabled");
		})
		.catch((e) => {});
});
