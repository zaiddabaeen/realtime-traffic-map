var rtmap = {
    markers: [],
    color: "rgba(75,216,181,0.8)",
    debug: true,
    addMarker: function (lng, lat) {
        var random_id = Math.floor((Math.random() * 10000) + 1)
        var marker = {
            "selectable": false,
            "longitude": lng,
            "latitude": lat,
            "svgPath": "M3.5,13.277C3.5,6.22,9.22,0.5,16.276,0.5C23.333,0.5,29.053,6.22,29.053,13.277C29.053,14.54,28.867,15.759,28.526,16.914C26.707,24.271,16.219,32.5,16.219,32.5C16.219,32.5,4.37,23.209,3.673,15.542C3.673,15.542,3.704,15.536,3.704,15.536C3.572,14.804,3.5,14.049,3.5,13.277C3.5,13.277,3.5,13.277,3.5,13.277M16.102,16.123C18.989,16.123,21.329,13.782,21.329,10.895C21.329,8.008,18.989,5.668,16.102,5.668C13.216,5.668,10.876,8.008,10.876,10.895C10.876,13.782,13.216,16.123,16.102,16.123C16.102,16.123,16.102,16.123,16.102,16.123",
            "color": rtmap.color,
            "scale": 1,
            "id": "marker-" + random_id
        }
        map.dataProvider.images.push(marker)
        map.validateData();

        if(rtmap.debug) console.log("Added marker", marker);

        rtmap.markers.push(random_id)

        setTimeout(function () {
            rtmap.removeMarker()
        }, 2000)
    },
    removeMarker: function () {
        map.dataProvider.images.shift()
        map.validateData()

        rtmap.markers.shift()
        if(rtmap.debug) console.log("Removed last marker", rtmap.markers);
    },
    autoGenerate: function () {
        var random_time = Math.random() * 100;
        setTimeout(function () {
            rtmap.addMarker((Math.random() * 360) - 180, (Math.random() * 180) - 90)
            rtmap.autoGenerate()
        }, random_time);
    }
}