const player = document.querySelector('.player');
const video = document.querySelector('video')
// Progress Elements
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.querySelector('#play-btn')
// Volume Elements
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
// Others
const timeElapsed = document.querySelector('.time-elapsed')
const duration = document.querySelector('.time-duration')
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen')

// Play & Pause ----------------------------------- //
function showPlayIcon(){
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
}

function togglePlay() {
    if(video.paused){
        video.play()
        playBtn.classList.replace('fa-play', 'fa-pause')
        playBtn.setAttribute('title', 'Pause')
    }
    else {
        video.pause();
        showPlayIcon();
    }
}

video.addEventListener('ended', showPlayIcon)

// Progress Bar ---------------------------------- //

// Calculate and format display time
function displayTime(time){
    const minutes = Math.floor(time/60)
    let seconds = Math.floor(time % 60)
    seconds = seconds > 9 ? seconds : `0${seconds}`
    return `${minutes}:${seconds}`
}

function updateProgress(){
    progressBar.style.width = `${(video.currentTime/video.duration)*100}%`
    timeElapsed.textContent = `${displayTime(video.currentTime)} /`
    duration.textContent = `${displayTime(video.duration)}`;
    
}

// Click to go to certain duration
function setProgress(event){
    const newTime = event.offsetX / progressRange.offsetWidth
    progressBar.style.width = `${(newTime)*100}%`
    video.currentTime = newTime * video.duration
}


// Volume Controls --------------------------- //
function changeVolume(event){
    let volume = event.offsetX / volumeRange.offsetWidth
    video.volume = volume
    volumeBar.style.width = `${(volume)*100}%`
    // change icon
    volumeIcon.className = ''
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up')
    }else if(volume > 0.3 && volume < 0.7){
        volumeIcon.classList.add('fas', 'fa-volume-down')
    }
    else{
        volumeIcon.classList.add('fas', 'fa-volume-off')
    }
    lastVolume = volume
}

function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
      lastVolume = video.volume;
      video.volume = 0;
      volumeIcon.classList.add('fas', 'fa-volume-mute');
      volumeIcon.setAttribute('title', 'Unmute');
      volumeBar.style.width = 0;
    } else {
      video.volume = lastVolume;
      volumeIcon.classList.add('fas', 'fa-volume-up');
      volumeIcon.setAttribute('title', 'Mute');
      volumeBar.style.width = `${lastVolume * 100}%`;
    }
  }

let lastVolume = 1


// Change Playback Speed -------------------- //
function changeSpeed() {
    video.playbackRate =  speed.value,10; 
}

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }
  
  let fullscreen = false;
  
  // Toggle fullscreen
  function toggleFullscreen() {
    if (!fullscreen) {
      openFullscreen(player);
    } else {
      closeFullscreen();
    }
    fullscreen = !fullscreen;
  }

// Event Listeners

playBtn.addEventListener('click', togglePlay)
this.addEventListener('keypress', event => {
    if(event.keyCode == 32){
        togglePlay()
    }
});
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
