window.addEventListener("load", () => {
	let markerSelector = document.querySelectorAll(".addmarker")[0];
	let db = new PouchDB("noriuispunka");
	let clearSelector = document.querySelectorAll(".clear")[0];
	let destinationSel = document.querySelectorAll(".destination")[0];
	markerSelector.addEventListener("click", () => {
		Swal.fire({
			title: "Do you want to save the current location?",
			showDenyButton: true,
			confirmButtonText: `Yes`,
			denyButtonText: `No`,
			customClass: {
				confirmButton: "order-1",
				denyButton: "order-2",
			},
		}).then((result) => {
			if (result.isConfirmed) {
				if (navigator && navigator.geolocation) {
					navigator.geolocation.getCurrentPosition((pos) => {
						let lat = pos.coords.latitude;
						let lon = pos.coords.longitude;
						Swal.fire(lat + long, "", "error");
						db.put({
							_id: "marker",
							latitude: lat,
							longitude: lon,
						})
							.then(function (response) {
								clearSelector.classList.remove("disabled");
								destinationSel.setAttribute("lat", lat);
								destinationSel.setAttribute("long", lon);
								Swal.fire("Current loction saved !", "", "success");
							})
							.catch(function (err) {
								Swal.fire("One location is already saved", "", "error");
							});
					});
				} else {
					Swal.fire("Navigator not defined ! ", "", "success");
				}
			} else if (result.isDenied) {
				Swal.fire("Not saved ! ", "", "success");
			}
		});
	});
});
