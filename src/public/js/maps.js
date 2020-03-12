async function initMap() {
  var new_jersey = { lat: 40.0583, lng: -74.4057 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: new_jersey,
    styles: [
      {
        featureType: "road",
        stylers: [
          {
            visibility: "off"
          }
        ]
      }
    ]
  });

  let njMap = new Map();

  await d3.csv("../assets/data.csv").then(function(data) {
    data.map(function(obj, i) {
      if (!njMap.has(obj.county)) {
        njMap.set(obj.county, { lat: obj.lat, lng: obj.lng, count: 0 });
      }
      njMap.get(obj.county).count = njMap.get(obj.county).count + 1;
    });
  });

  console.log(njMap);

  let markers = [];
  for (const [key, value] of njMap.entries()) {
    let latLng = new google.maps.LatLng(value.lat, value.lng);
    let marker = new google.maps.Marker({
      position: latLng,
      label: value.count.toString()
    });

    let contentString = "<h2>" + key + " County</h2>";
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });

    markers.push(marker);
  }
  console.log(markers);

  let markerCluster = new MarkerClusterer(map, markers);
}
