import { songsList } from '../data/songs.js';

const Playlist = (_ => {
  // data or state
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url); // builtin browser web API
  let isPlaying = false;

  // cache the DOM
  const playlistEl = document.querySelector('.playlist');

  const init = _ => {
    render();
    listeners();
  }

  const changeAudioSrc = _ => {
    currentSong.src = song[currentlyPlayingIndex].url;
  }

  const togglePlayPause = _ => {
    return currentSong.paused ? currentSong.play() : currentSong.pause();
  }

  const mainPlay = clickedIndex => {
    if (currentlyPlayingIndex === clickedIndex) {
      console.log('same song');
      // toggle play or pause
      togglePlayPause();
    } else {
      console.log('new song');
      currentlyPlayingIndex = clickedIndex;
      changeAudioSrc();
      togglePlayPause();
    }
  }

  const listeners = _ => {
    // 1. Get index of li tag when play icon clicked
    // 2. Change the currentPlayingIndex to index of li tag
    // 3. Play or pause
    // 4. If it's not the same song, change the src to that new song after changing
    // the currentPlayingInex
    playlistEl.addEventListener('click', event => {
      if (event.target && event.target.matches('.fa')) {
        const listElem = event.target.parentNode.parentNode;
        const listElemIndex = [...listElem.parentElement.children].indexOf(listElem); // convert to array
        mainPlay(listElemIndex);
        render();
      }
    })
  }

  const render = _ => {
    let markup = '';


  const toggleIcon = itemIndex => {
    if (currentlyPlayingIndex === itemIndex) {
      return currentSong.paused ? 'fa-play' : 'fa-pause';
    } else {
      return 'fa-play';
    }
  }

    songs.forEach((songObj, index) => {
      markup += `
        <li class="playlist__song ${index === currentlyPlayingIndex ? 'playlist__song--active' : ''}">
          <div class="play-pause">
            <i class="fa ${toggleIcon(index)} pp-icon"></i>
          </div>
          <div class="playlist__song-details">
            <span class="playlist__song-name">${songObj.title}</span>
            <br>
            <span class="playlist__song-artist">${songObj.artist}</span>
          </div>
          <div class="playlist__song-duration">
            ${songObj.time}
          </div>
        </li>
      `;
    });

    playlistEl.innerHTML = markup;
  }

  return {
    init
  }
})();

export default Playlist;
