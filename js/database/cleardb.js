window.addEventListener("load", () => {
	let clearSel = document.querySelectorAll(".clear")[0];
	let destinationSel = document.querySelectorAll(".destination")[0];
	clearSel.addEventListener("click", () => {
		let db = new PouchDB("noriuispunka");
		clearSel.addEventListener("click", () => {
			Swal.fire({
				title: "Do you want to clear the current location?",
				showDenyButton: true,
				confirmButtonText: `Yes`,
				denyButtonText: `No`,
				customClass: {
					confirmButton: "order-1",
					denyButton: "order-2",
				},
			}).then((result) => {
				if (result.isConfirmed) {
					db.get("marker")
						.then(function (doc) {
							return db.remove(doc);
						})
						.then(function (result) {
							destinationSel.removeAttribute("lat");
							destinationSel.removeAttribute("long");
							clearSel.classList.add("disabled");
							Swal.fire("Location was cleaned !", "", "success");
						})
						.catch(function (err) {
							Swal.fire("Got no data to clean, doc !", "", "success");
						});
				} else if (result.isDenied) {
					Swal.fire("Not cleaned ! ", "", "success");
				}
			});
		});
	});
});
