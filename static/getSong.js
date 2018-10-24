(function () {
    "use strict";

    window.addEventListener("load", initialize);

    const genres = ["Acid-Techno","Acoustic-Blues","Acid-House","Acid-Jazz","Alternative-Dance","Alternative-Metal","Americana","African-Jazz","Appalachian-Folk","AustroPop","Album-Rock","Beach","Big-Beat","Alternative-CCM","Bluegrass","Alternative-Country","Blues","Blues-Rock","Bolero","Boogaloo","Brill-Building-Pop","British-Blues","British-Folk","British-Invasion","Britpop","Bubblegum","Alternative-Pop-Rock","Bulgarian-Folk","Canterbury-Scene","Ambient","CCM","Celtic","Ambient-Dub","Celtic-Rock","Chamber-Pop","Ambient-Techno","Chicago-Blues","Chicago-Soul","Christian-Metal","Christian-Punk","Christian-Rock","Christmas","Anti-Folk","Armenian","Armenian-Folk","Asian-Folk","Avant-Garde","Avant-Garde-Jazz","Comedy","Bachata","Banda","Baroque","Bass-Music","Bhangra","Big-Band","Blues-Gospel","Bollywood","Boogie-Woogie","Bop","Bossa-Nova","Brass-Band","Brazilian-Pop","British-Metal","Broken-Beat","Cabaret","Cajun","Calypso","Carnatic","Chant","Chinese-Classical","Chinese-Pop","Choral","Choro","Classical","Classical-Guitar","Comedy-Rock","Contemporary-Country","Contemporary-Folk","Contemporary-R-B","Contemporary-Jazz","Country","Country-Blues","Cool","Country-Rock","Cowboy","Cumbia","Dance-Rock","Delta-Blues","Country-Folk","Country-Gospel","Doom-Metal","Doo-Wop","Downtempo","Dream-Pop","Dub","Dutch-Pop","Cowpunk","Dancehall","Dance-Pop","Dark-Ambient","Deep-Funk","Deep-Soul","Detroit-Techno","Electro-Industrial","Dirty-Rap","Dirty-South","Disco","Dixieland","Drama","Early-Music","Easy-Listening","Electric-Blues","Electro","Electro-Jazz","Electronic","Electronica","Emo","Enka","Environmental","Erotica","Ethiopian-Pop","Exotica","Experimental","Fado","Finnish-Folk","Experimental-Rock","Flamenco","Folk","Freakbeat","Fuji","Folklore","French-Folk","Funky-Breaks","Free-Jazz","Free-Improvisation","Forro","French-Pop","French-Rock","Folk-Pop","Gabba","Freestyle","Goa-Trance","G-Funk","Gamelan","Grindcore","Girl-Group","Glitch","Glitter","Fusion","Hi-NRG","Gypsy","Funk-Metal","Healing","Hardcore-Punk","Hebrew","Heartland-Rock","Grunge","Garage-Rock","Heavy-Metal","Funk","Highlife","Garage-Punk","Harmony-Vocal-Group","Happy-Hardcore","Folk-Rock","Go-Go","Hardcore-Techno","Folk-Revival","Hip-Hop","Harmonica-Blues","Hard-Bop","Hard-Rock","Halloween","Gospel","Glam-Rock","Honky-Tonk","Indie-Rock","Industrial","Industrial-Metal","Instrumental-Rock","Irish-Folk","House","Jangle-Pop","Jazz-Blues","IDM","Improvisation","Indian-Classical","Indian-Folk","Karaoke","Indian-Pop","Indie-Pop","Kayokyoku","Indigenous","Italian-Folk","Italian-Pop","Japanese-Pop","Japanese-Rock","Jazz","Jazz-Funk","Jazz-Rap","Jug-Band","Jump-Blues","Latin-Rock","Louisiana-Blues","Klezmer","Korean-Pop","Lounge","Lovers-Rock","Latin","Madchester","Mambo","Latin-Jazz","Latin-Pop","Lo-Fi","Merengue","Makossa","Merseybeat","Mariachi","Math-Rock","Mbalax","Mod","Medieval","Meditation","Memphis-Soul","Motown","MPB","Memphis-Blues","Microhouse","Microtonal","Military","Minimal-Techno","New-Jack-Swing","Neo-Classical-Metal","Neo-Soul","New-Romantic","New-Wave","New-Orleans-Blues","Neo-Classical","Modern-Free","Morna","Musique-Concrete","Neo-Prog","New-Age","Mod-Revival","Noise","Neo-Traditional","Mbira","New-Orleans-Jazz","Noise-Pop","Noise-Rock","Northern-Soul","No-Wave","Outlaw-Country","Norwegian-Folk","Piano-Blues","Polka","Pop-Rock","Pop-Underground","Post-Disco","Post-Grunge","Nu-Breaks","Power-Metal","Power-Pop","Nueva-Cancion","Progressive-Metal","Psychedelic","Pub-Rock","Oi!","Punk-Blues","Quiet-Storm","Ranchera","Rap-Metal","Rap-Rock","Rave","Rock","Romantic","Roots-Reggae","Roots-Rock","Russian-Folk","Opera","Samba","Scottish-Folk","Orchestral","Singer-Songwriter","Rockabilly","Rock---Roll","Piedmont-Blues","Poetry","Shoegaze","Soundtrack","Pop","Pop-Idol","Pop-Rap","Portuguese-Music","Post-Bop","Post-Hardcore","Post-Punk","Post-Romantic","Sludge-Metal","Ska-Punk","Progressive-Alternative","Progressive-Bluegrass","Progressive-House","Progressive-Trance","Ska","Psychobilly","Punk","Ska-Revival","Punk-Pop","Qawwali","Ragga","Ragtime","Rai","Smooth-Jazz","Rap","R-B","Reggae","Reggae-Gospel","Reggaeton","Riot-Grrrl","Salsa","Shibuya-Kei","Renaissance","Screamo","Slack-Key-Guitar","Show-Tunes","Skiffle","Son","Soul-Blues","Soca","Soft-Rock","Soukous","Soul-Jazz","Sound-Art","Soul","Southern-Gospel","Sound-Effects","South-African-Pop","Southern-Rock","Stoner-Metal","Surf","Swamp-Blues","Swamp-Pop","Swedish-Folk","Swing","Symphonic-Black-Metal","Tejano","Spoken-Word","Thrash","Traditional","Traditional-Country","Traditional-Folk","Straight-Edge","Stride","Trip-Hop","Tango","Tech-House","Techno","Techno-Dub","Teen-Pop","Twee-Pop","Texas-Blues","Thai-Pop","Throat-Singing","Timba","Traditional-Chinese","Traditional-Japanese","Traditional-Korean","Traditional-Scottish-Folk","Trance","Tribal-House","Tropical","Trova","Turkish-Folk","Turntablism","Underground-Rap","Urban","Vallenato","Vaudeville","Zydeco","Video-Game-Music","Video","Vocal-Jazz","Vocal","West-Coast-Rap","Western-Swing","Zouk","World-Fusion","World","Space","Space-Age-Pop","Space-Rock","Spanish-Folk","Southern-Soul","Speed-Metal"];
    let accessToken = setToken();
    let currentTrack = null; // current selected track

    // Add event listeners to UI
    // Store an auth token
    function initialize() {
        fillDropdownYear();
        fillDropdownGenre();

        let submitButton = document.getElementById("submit");
        submitButton.addEventListener("click", getURI);

        let playButton = document.getElementById("play-button");
        playButton.addEventListener("click", playPause);
    }

    // Fills dropdown options with years 1950-2017
    function fillDropdownYear() {
        let dropdown = document.getElementById("select-year");
        dropdown.innerHTML += "<option value=&quot;null&quot;>None</option>";
        for (let i = 2018; i > 1949; i--) {
            dropdown.innerHTML += "<option value=&quot;" + i + "&quot;>" + i + "</option>";
        }
    }

    // Fills dropdown options with geners
    function fillDropdownGenre() {
        let dropdown = document.getElementById("select-genre");

        dropdown.innerHTML += "<option value=&quot;null&quot;>None</option>";
        for (let i = 0; i < genres.length; i++){
            dropdown.innerHTML += "<option value=&quot;" + formatGenreName(genres[i]) + "&quot;>" + genres[i] + "</option>";
        }
    }

    // Formats genre names into html appropriate values
    function formatGenreName(str) {
        var str2 = str.replace(/\//g, '-');
        var str3 = str2.replace(/&/g, '-');
        var str4 = str3.replace(/ /g, '-');
        return str4;
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
        let year = document.getElementById("select-year").value.replace(/\"/g, "");
        let genre = document.getElementById("select-genre").value.replace(/["']/g, "");

        let qUrl = "https://api.spotify.com/v1/search?q=";

        // year yes, genre yes
        if(year !== "null" && genre !== "null") {
            qUrl += "year:" + year + "%20genre:%22" + genre + "%22";

        // year no, genre yes
        } else if(genre !== "null" && year === "null") {
            qUrl += "genre:%22" + genre + "%22";

        // year yes, genre no
        } else if(genre === "null" & year !== "null"){
            qUrl += "year:" + year
        }

        console.log(qUrl);

        // get random number 0 to 19
        let rand = Math.floor(Math.random() * 20);

        $.ajax({
            type: "GET",
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", "Bearer " + accessToken);
            },
            url: qUrl + "&type=track",
            type: 'GET',
            success: function (data) {
                if(data.tracks.items.length < 1){
                    let info = document.getElementById("now-playing");
                    info.innerHTML = "No songs found, try another combination!"
                } else if (data.tracks.items.length - 1 < rand) {
                    rand = Math.floor(Math.random() * data.tracks.items.length);
                    currentTrack = data.tracks.items[rand];
                    showNowPlaying();
                    replaceQueue();
                } else {
                    currentTrack = data.tracks.items[rand];
                    showNowPlaying();
                    replaceQueue();
                }
                console.log(currentTrack);
            },
            error: function () {
                console.log("problem getting track")
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
                addToQueue();
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
            info.innerHTML = "";

            info.innerHTML += currentTrack.artists[0].name;
            for(let i = 1; i < currentTrack.artists.length; i++) {
                info.innerHTML += ", " + currentTrack.artists[i].name;
            }
            info.innerHTML += " - " + currentTrack.name;
        }
    }

})();