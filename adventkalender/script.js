let currDoor;
let currHint = 1;
const totalHints = 3;


// let player;
//
// function onYouTubeIframeAPIReady() {
//     player = new YT.Player('youtube-player', {
//         events: {
//             'onReady': onPlayerReady
//         }
//     });
// }
//
// function onPlayerReady(event) {
//     event.target.playVideo();
// }
//
// function playVideo() {
//     if (player && player.playVideo) {
//         player.playVideo();
//     } else {
//         console.error('Player is not initialized');
//     }
// }
//
// function pauseVideo() {
//     if (player && player.pauseVideo) {
//         player.pauseVideo();
//     } else {
//         console.error('Player is not initialized');
//     }
// }
//
// function setVolume(volume) {
//     if (player && player.setVolume) {
//         player.setVolume(volume);
//     } else {
//         console.error('Player is not initialized');
//     }
// }

function openDoor(day) {
    const currentDay = new Date().getDate();
    if (day > currentDay) {
        alert("You cannot open this door yet!");
        return;
    }
    const door = document.getElementById(`door${day}`);

    const doorId = "door" + day;
    currDoor = doorId;

    fetch('data/doors.json')
        .then(response => response.json())
        .then(data => {
            const media = data[doorId].media;
            const title = data[doorId].title;
            const hints = data[doorId].hints;

            console.log(media);

            // const youtubePlayer = document.getElementById('youtube-player');
            // youtubePlayer.src = `https://www.youtube.com/embed/${media.split('v=')[1]}?enablejsapi=1&autoplay=0`;

            const dayNo = document.getElementById('dayNo');
            dayNo.innerText += day;

            const audioPlayer = document.getElementById('audio-player');
            audioPlayer.src = media;

            const feedback = document.getElementById('feedback');
            const songGuess = document.getElementById('song-guess');
            if (door.classList.contains('solved')) {
                feedback.style.display = 'inline-block';
                songGuess.value = data[doorId].title;
            }
        });


    const openedDoor = document.getElementById('opened-door');
    openedDoor.style.display = 'flex';
    openedDoor.style.animation = 'popIn 0.4s ease-out forwards';
}

function showFeedback(isSuccess) {
    const feedback = document.getElementById('feedback');
    const feedbackIcon = document.getElementById('feedback-icon');

    feedbackIcon.src = isSuccess ? 'img/correct.png' : 'img/incorrect.webp';
    feedback.style.display = 'inline-block';
}


function submitGuess() {
    const door = document.getElementById(currDoor);
    console.log('Door:', door);
    const guess = document.getElementById('song-guess').value;
    console.log('Guess submitted:', guess);
    // Add your logic to check the guess here
    fetch('data/doors.json')
        .then(response => response.json())
        .then(data => {
            const answer = data[currDoor].title;
            let isCorrect = checkGuess(guess, answer);
            showFeedback(isCorrect);
            if (isCorrect) {
                door.classList.add('solved');
            }
        });
}

function checkGuess(guess, answer) {
    if (guess.toLowerCase().replace(/\s/g, '') === answer.toLowerCase().replace(/\s/g, '')) {
        // alert('Correct! You have unlocked the door!');
        return true;
    } else {
        // alert('Incorrect guess. Try again!');
        return false;
    }
}

function closeDoor() {
    const openedDoor = document.getElementById('opened-door');
    const songGuess = document.getElementById('song-guess');
    const feedback = document.getElementById('feedback');
    const hints = document.getElementsByClassName('hint');
    const audio = document.getElementById('audio-player');
    const dayNo = document.getElementById('dayNo');
    const door = document.getElementById(currDoor);

    // Clear user input
    songGuess.value = '';
    feedback.style.display = 'none';

    hints[0].style.display = 'none';
    hints[0].innerText = 'Artist Name: ';

    hints[1].style.display = 'none';
    hints[1].innerText = 'Release Date: ';

    hints[2].style.display = 'none';
    hints[2].innerText = 'Duration: ';

    // Stop the audio
    audio.pause();

    dayNo.innerText = 'Day #';

    // Close the door with animation
    openedDoor.style.animation = 'popOut 0.4s ease-out forwards';
    setTimeout(() => {
        openedDoor.style.display = 'none';
    }, 500);

    currDoor = null;
    currHint = 1;
}

function getHint() {
    if (currHint > totalHints) {
        alert('No more hints available');
        return;
    }
    fetch('data/doors.json')
        .then(response => response.json())
        .then(data => {
            const hint = data[currDoor].hints[currHint];
            console.log(hint);
            document.getElementById('hint' + currHint).innerText += hint;
            document.getElementById('hint' + currHint).style.display = 'block';
            currHint++;
        });
}




// const door = "door1";
//
// fetch('data/doors.json')
//     .then(response => response.json())
//     .then(data => {
//         // console.log(data[door])
//         const media = data[door].media;
//         const title = data[door].title;
//         const hints = data[door].hints;
//         console.log(hints[1]);
//
//         console.log(media);
//         console.log(title);
//         console.log(hints);
//     });