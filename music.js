   document.addEventListener('DOMContentLoaded', function () {
      const bgMusic = document.getElementById('backgroundMusic');
      const musicControl = document.getElementById('musicControl');
      const nextTrackBtn = document.getElementById('nextTrack');

      const musicTracks = [
        'music/Guru githaya.mp3',
        'music/Sadawan-Ruwin-Sara.mp3',

      ];

      let currentTrack = 0;
      let musicPlaying = false;

      bgMusic.volume = 0.5;
      bgMusic.muted = true;

      const loadTrack = (index) => {
        bgMusic.src = musicTracks[index];
        bgMusic.load();
      };

      const playMusic = () => {
        bgMusic.play()
          .then(() => {
            musicPlaying = true;
            bgMusic.muted = false;
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
          })
          .catch(error => {
            console.log('Auto-play was prevented:', error);
            musicControl.innerHTML = '<i class="fas fa-play"></i>';
            musicControl.style.backgroundColor = '#f#000000';
          });
      };

      const playNextTrack = () => {
        currentTrack = (currentTrack + 1) % musicTracks.length;
        loadTrack(currentTrack);
        playMusic();
      };

      loadTrack(currentTrack); // Load first track
      playMusic();

      musicControl.addEventListener('click', function () {
        if (musicPlaying) {
          bgMusic.pause();
          musicControl.innerHTML = '<i class="fas fa-play"></i>';
        } else {
          playMusic();
        }
        musicPlaying = !musicPlaying;
      });

      nextTrackBtn.addEventListener('click', function () {
        playNextTrack();
      });

      bgMusic.addEventListener('ended', function () {
        playNextTrack(); // Automatically go to next track
      });

      document.body.addEventListener('click', function () {
        if (bgMusic.paused && !musicPlaying) {
          playMusic();
        }
      });
    });