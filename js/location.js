window.addEventListener("load", function () {
	var destinationSel = document.querySelectorAll(".destination")[0];
	var distanceSel = document.querySelectorAll(".distance")[0];

	var haversine = function haversine(lat1, lon1, lat2, lon2, unit) {
		var radlat1 = (Math.PI * lat1) / 180;
		var radlat2 = (Math.PI * lat2) / 180;
		var radlon1 = (Math.PI * lon1) / 180;
		var radlon2 = (Math.PI * lon2) / 180;
		var theta = lon1 - lon2;
		var radtheta = (Math.PI * theta) / 180;
		var dist =
			Math.sin(radlat1) * Math.sin(radlat2) +
			Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist);
		dist = (dist * 180) / Math.PI;
		dist = dist * 60 * 1.1515;

		if (unit == "K") {
			dist = dist * 1.609344;
		}

		if (unit == "N") {
			dist = dist * 0.8684;
		}

		return Math.round(dist * 1000).toFixed(2) + " m";
	};

	setInterval(function () {
		var destinationLat = destinationSel.getAttribute("lat");
		var destinationLon = destinationSel.getAttribute("long");
		var dateSel = document.querySelectorAll(".date")[0];

		if (destinationLon != null && destinationLat != null) {
			navigator.geolocation.getCurrentPosition(function (pos) {
				var lat = parseInt(pos.coords.latitude);
				var lon = parseInt(pos.coords.longitude);
				dateSel.innerHTML = "";
				var d = new Date(pos.timestamp);
				dateSel.innerHTML +=
					"Time: " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
				destinationSel.innerHTML = "";
				destinationSel.innerHTML +=
					"DESTINATION (" +
					"Latitute: " +
					destinationLat +
					", Longitude:" +
					destinationLon +
					")";
				var remainingDistance = haversine(
					lat,
					lon,
					destinationLat,
					destinationLon,
					"K"
				);

				if (remainingDistance < 20) {
					Swal.fire({
						title: "You're arived",
						showDenyButton: false,
						confirmButtonText: "OK",
					});
				} else {
					distanceSel.innerHTML = "";
					distanceSel.innerHTML += "Distance remaining: " + remainingDistance;
				}
			});
		} else {
			dateSel.innerHTML = "";
			dateSel.innerHTML += "Time: No location - no time. Add one.";
			destinationSel.innerHTML = "";
			destinationSel.innerHTML +=
				"DESTINATION (" + "Latitute: " + "none" + ", Longitude:" + "none" + ")";
			distanceSel.innerHTML = "";
			distanceSel.innerHTML += "Distance remaining: " + 0;
		}
	}, 5000);
});
