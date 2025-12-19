let currentPlayingIndex = -1;

const songs = [
  {
    id: 's01',
    imageId: 'img01',
    nameId: 'nam1',
    playBtnClass: 'play00',
    audioId: 'audio1'
  },
  {
    id: 's02',
    imageId: 'img02',
    nameId: 'nam2',
    playBtnClass: 'play00',
    audioId: 'audio2'
  },
  {
    id: 's03',
    imageId: 'img03',
    nameId: 'nam3',
    playBtnClass: 'play00',
    audioId: 'audio3'
  },
  {
    id: 's04',
    imageId: 'img04',
    nameId: 'nam4',
    playBtnClass: 'play00',
    audioId: 'audio4'
  },
  {
    id: 's05',
    imageId: 'img05',
    nameId: 'nam5',
    playBtnClass: 'play00',
    audioId: 'audio5'
  },
  {
    id: 's06',
    imageId: 'img06',
    nameId: 'nam6',
    playBtnClass: 'play00',
    audioId: 'audio6'
  },
  {
    id: 's07',
    imageId: 'img07',
    nameId: 'nam7',
    playBtnClass: 'play00',
    audioId: 'audio7'
  },
  {
    id: 's08',
    imageId: 'img08',
    nameId: 'nam8',
    playBtnClass: 'play00',
    audioId: 'audio8'
  },
  {
    id: 's09',
    imageId: 'img09',
    nameId: 'nam9',
    playBtnClass: 'play00',
    audioId: 'audio9'
  },
  {
    id: 's10',
    imageId: 'img10',
    nameId: 'nam10',
    playBtnClass: 'play00',
    audioId: 'audio10'
  },
];

const playButtons = document.querySelectorAll(".play00");
// Main container
const plays = document.querySelector(".plays");
const pcontainer = plays.querySelector(".pcontainer");

// Song image container
const songImage = pcontainer.querySelector(".songimage");

// Song name and seekbar label
const songNameSeekbar = pcontainer.querySelector(".songnameseekbar");

// Seekbar input
const seekbar = pcontainer.querySelector(".seekbar");

// Icons section
const icons = pcontainer.querySelector(".icons");
const i1 = icons.querySelector(".i1");
const i2 = icons.querySelector(".i2");

// Individual control icons
const playPauseIcon = i2.querySelector(".fa-circle-play") || i2.querySelector(".fa-circle-pause");
const forwardIcon = i2.querySelector(".fa-forward");
const backwardIcon = i2.querySelector(".fa-backward");

// Timer display
const timer = pcontainer.querySelector(".timer");

const seekbarPlayIcon = document.querySelector(".seekbarPlay");


playButtons.forEach((icon, index) => {
  icon.addEventListener("click", function () {
    const currentSong = songs[index];
    const currentAudio = document.getElementById(currentSong.audioId);
    const imgElement = document.getElementById(currentSong.imageId);
    const songNameElement = document.getElementById(currentSong.nameId);
    currentPlayingIndex = index;

    currentAudio.addEventListener("timeupdate", () => {
  const remainingTime = currentAudio.duration - currentAudio.currentTime;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = Math.floor(remainingTime % 60);
  const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.querySelector(".timer").textContent = formatted;
});

    currentAudio.addEventListener("timeupdate", () => {
  const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
  document.querySelector(".seekbar").value = progress || 0;
});

    // 🧼 Reset all other icons to play and pause their audio
    playButtons.forEach(el => {
      if (el !== icon) {
        el.classList.remove("fa-circle-pause");
        el.classList.add("fa-circle-play");
      }
    });
    document.querySelectorAll("audio").forEach(el => el.pause());

    // 🖼 Update seekbar background image
    if (imgElement && imgElement.src) {
      songImage.style.backgroundImage = `url('${imgElement.src}')`;
    } else {
      songImage.style.backgroundImage = `url('fallback.jpg')`;
    }

    // 🎵 Update song name in seekbar
    document.querySelector(".songnameseekbar").textContent = songNameElement?.textContent || "Unknown";

    // 🔄 Toggle play/pause icon and audio playback
    if (icon.classList.contains("fa-circle-play")) {
      icon.classList.remove("fa-circle-play");
      icon.classList.add("fa-circle-pause");
      seekbarPlayIcon.classList.remove("fa-circle-play");
      seekbarPlayIcon.classList.add("fa-circle-pause");
      currentAudio.play();
    } else {
      icon.classList.remove("fa-circle-pause");
      icon.classList.add("fa-circle-play");
      seekbarPlayIcon.classList.remove("fa-circle-pause");
      seekbarPlayIcon.classList.add("fa-circle-play");
      currentAudio.pause();
    }
  });
});

seekbar.addEventListener("input", () => {
  const activeIcon = document.querySelector(".fa-circle-pause");
  const activeIndex = Array.from(playButtons).indexOf(activeIcon);
  if (activeIndex !== -1) {
    const playingAudio = document.getElementById(songs[activeIndex].audioId);
    const seekTime = (seekbar.value / 100) * playingAudio.duration;
    playingAudio.currentTime = seekTime;
  }
});

seekbarPlayIcon.addEventListener("click", () => {
  if (currentPlayingIndex !== -1) {
    const activeAudio = document.getElementById(songs[currentPlayingIndex].audioId);

    if (activeAudio.paused) {
      activeAudio.play();
      seekbarPlayIcon.classList.remove("fa-circle-play");
      seekbarPlayIcon.classList.add("fa-circle-pause");
      playButtons[currentPlayingIndex].classList.remove("fa-circle-play");
      playButtons[currentPlayingIndex].classList.add("fa-circle-pause");
    } else {
      activeAudio.pause();
      seekbarPlayIcon.classList.remove("fa-circle-pause");
      seekbarPlayIcon.classList.add("fa-circle-play");
      playButtons[currentPlayingIndex].classList.remove("fa-circle-pause");
      playButtons[currentPlayingIndex].classList.add("fa-circle-play");
    }
  }
});

forwardIcon.addEventListener("click", () => {
  if (currentPlayingIndex < songs.length - 1) {
    triggerSong(currentPlayingIndex + 1);
  }
});

backwardIcon.addEventListener("click", () => {
  if (currentPlayingIndex > 0) {
    triggerSong(currentPlayingIndex - 1);
  }
});

function triggerSong(index) {
  document.querySelectorAll("audio").forEach(el => el.pause());
  playButtons.forEach(icon => {
    icon.classList.remove("fa-circle-pause");
    icon.classList.add("fa-circle-play");
  });

  const currentSong = songs[index];
  const currentAudio = document.getElementById(currentSong.audioId);
  const imgElement = document.getElementById(currentSong.imageId);
  const nameElement = document.getElementById(currentSong.nameId);

  currentAudio.play();
  songImage.style.backgroundImage = `url('${imgElement?.src || "fallback.jpg"}')`;
  document.querySelector(".songnameseekbar").textContent = nameElement?.textContent || "Unknown";
  document.querySelector(".seekbarPlay").classList.remove("fa-circle-play");
  document.querySelector(".seekbarPlay").classList.add("fa-circle-pause");
  playButtons[index].classList.remove("fa-circle-play");
  playButtons[index].classList.add("fa-circle-pause");
  
  

// ⏱ Clear old timer event listeners
currentAudio.removeEventListener("timeupdate", updateTimer); // if you've set it before

// ⏳ Define a clean update function
function updateTimer() {
  if (!isNaN(currentAudio.duration)) {
    const remaining = currentAudio.duration - currentAudio.currentTime;
    const mins = Math.floor(remaining / 60);
    const secs = Math.floor(remaining % 60);
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.querySelector(".timer").textContent = formatted;
  } else {
    document.querySelector(".timer").textContent = "00:00";
  }
}

// 🧭 Attach it once
currentAudio.addEventListener("timeupdate", updateTimer);
  currentPlayingIndex = index;
}