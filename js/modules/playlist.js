import { songsList } from '../data/songs.js';
import PlayInfo from './play-info.js';
import TrackBar from './track-bar.js';

const Playlist = (_ => {
  // data or state
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url); // builtin browser web API

  //currentSong.currentTime = 255;

  // cache the DOM
  const playlistEl = document.querySelector('.playlist');

  const init = _ => {
    render();
    listeners();
    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused
    });
  }

  const flip = _ => {
    togglePlayPause();
    render();
  }

  const changeAudioSrc = _ => {
    currentSong.src = songs[currentlyPlayingIndex].url;
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
    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused
    });
  }

  const playNext = _ => {
    if (songs[currentlyPlayingIndex + 1]){
      currentlyPlayingIndex++;
      changeAudioSrc();
      togglePlayPause();
      render();
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

  currentSong.addEventListener('timeupdate', _ => {
    // pass currentSong obj into TrackBar
    TrackBar.setState(currentSong);
  })

  currentSong.addEventListener('ended', _ => {
    // play next function
    playNext();
  })

  // renders out everything
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
  // expose:
  return {
    init,
    flip
  }
})();

export default Playlist;
