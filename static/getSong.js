(function () {
    "use strict";

    window.addEventListener("load", initialize);

    let accessToken = null;
    let currentTrack = null; // current selected track

    // Add event listeners to UI
    // Store an auth token
    function initialize() {
        setToken();
        fillDropdownYear();

        let submitButton = document.getElementById("submit");
        submitButton.addEventListener("click", getURI);

        let playButton = document.getElementById("play-button");
        playButton.addEventListener("click", playPause);
    }

    // Fills dropdown options with years 1950-2017
    function fillDropdownYear() {
        let dropdown = document.getElementById("select-year");
        for (let i = 2017; i > 1949; i--) {
            dropdown.innerHTML += "<option value=&quot;" + i + "&quot;>" + i + "</option>";
        }
    }

    // Makes sonos speaker (named den) play or pause depending on current state
    function playPause() {
        $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            url: "http://localhost:5005/Den/playpause",
            success: function (data) {

            },
            error: function () {
                console.log("problem playing track");
            }
        });
    }

    // sets currentTrack to the song found and plays the song
    // searches for songs based on most popular in that selected year
    function getURI() {
        let year = (document.getElementById("select-year").value).substring(1, 5);

        $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            url: "https://api.spotify.com/v1/search?q=year:" + year + "&type=track",
            //url: "https://api.spotify.com/v1/search?q=year:1999&type=track",
            type: 'GET',
            success: function (data) {
                currentTrack = data.tracks.items[0];
                // console.log(currentTrack);
                showNowPlaying();
                replaceQueue();
            },
            error: function () {
                setToken();
            }
        });
    }


    // Clears the queue, adds currentTrack to queue, and initiates play
    function replaceQueue() {
        // clear queue
        $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            url: "http://localhost:5005/Den/clearqueue",
            success: function (data) {
                addToQueue();
            },
            error: function () {
                console.log("problem clearing queue");
            }
        });
    }

    // adds currentTrack to queue, and initiates play
    function addToQueue() {
        // adds current track to queue
        $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            url: "http://localhost:5005/den/spotify/next/" + currentTrack.uri,
            success: function (data) {
                play();
            },
            error: function () {
                console.log("problem adding track");
            }
        });
    }

    // initiates play
    function play() {
        // clear queue
        $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            url: "http://localhost:5005/Den/play",
            success: function (data) {

            },
            error: function () {
                console.log("problem playing track");
            }
        });
    }

    // Gets an access token
    // Consider getting auth with authorization code instead of client credentials
    function setToken() {
        $.ajax({
            type: "POST",
            beforeSend: function (request) { // should probably be secret, but prototyped for now
                request.setRequestHeader("Authorization", "Basic " +
                    "NWY0MGUwNmFhZGM5NGFlOGE0YjI1OTA3NDBjMWViMzU6ZGZlY2I3Y2JhY2ZiNDVmN2FkYjkzYmU1OTQyZTkzMTU=");
            },
            contentType: "application/x-www-form-urlencoded",
            url: "https://accounts.spotify.com/api/token",
            data: "grant_type=client_credentials",
            success: function (tokenObj) {
                accessToken = tokenObj.access_token;
                console.log(accessToken);
            }
        });
    }

    // Update text on page with current song
    function showNowPlaying() {
        if (currentTrack != null) {
            let info = document.getElementById("now-playing");

            // TODO: If multiple artists are listed, show
            info.innerHTML = currentTrack.artists[0].name +
                " - " + currentTrack.name;
        }
    }

})();