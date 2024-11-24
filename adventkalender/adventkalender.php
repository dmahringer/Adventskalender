<!DOCTYPE html>
<html lang="en">
<img id="background" src="img/golden-silver-christmas-deco-black.jpg" alt="Adventkalender">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://www.youtube.com/iframe_api"></script>
    <script src="script.js" defer></script>
    <title>Adventkalender</title>
</head>

<body>
<div id="circle"></div>
<div id="circle-small"><h1>Adventkalender</h1></div>
<div id="opened-door" style="display: none">
    <div style="margin-bottom: 0; padding: 0">
        <h2 id="dayNo">Day #</h2>
        <button id="close-button" onclick="closeDoor()">Close</button>
    </div>

    <div id="input" style="width: 100%">
        <input type="text" id="song-guess" placeholder="Guess the song title">
        <div id="feedback" style="display: none;">
            <img id="feedback-icon" src="" alt="Feedback Icon" style="width: 24px; height: 24px;">
        </div>
    </div>


<!--    <div id="video-container">-->
<!--        <iframe id="youtube-player" width="560" height="315" frameborder="0" allow="autoplay" allowfullscreen></iframe>-->
<!--    </div>-->
<!--    <div id="custom-controls">-->
<!--        <button id="play-button" onclick="playVideo()">Play</button>-->
<!--        <button id="pause-button" onclick="pauseVideo()">Pause</button>-->
<!--        <input type="range" id="volume-slider" min="0" max="100" value="100" onchange="setVolume(this.value)">-->
<!--    </div>-->

    <audio id="audio-player" autoplay></audio>

    <div id="random">
        <button id="get-hint" onclick="getHint()">Get hint</button>
        <div id="hints">
            <p class="hint" id="hint1" style="display: none">Artist Name: </p>
            <p class="hint" id="hint2" style="display: none">Release Date: </p>
            <p class="hint" id="hint3" style="display: none">Duration:  </p>
        </div>
        <button id="submit-guess" onclick="submitGuess()">Submit</button>
    </div>
</div>
<div id="kalender">
    <?php
    $images = glob('img/vinyl*.png');
    shuffle($images);
    $currentDay = date('j');

    for ($i = 1; $i <= 24; $i++) {
        $src = $images[$i % count($images)];
        $class = 'door';
        if ($i > $currentDay) {
            $class .= ' future';
        } elseif ($i < $currentDay) {
            $class .= ' past';
        } else {
            $class .= ' present';
        }
        echo "<div class='$class' id='door$i' onclick='openDoor($i)'>
                <img src='$src' alt='Türchen $i' class='images' id='img$i'>
              </div>";
    }
    ?>
</div>
</body>
</html>