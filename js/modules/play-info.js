/* Play-info.js is the left side of the app: 12 songs, play button */
import Playlist from './playlist.js';

const PlayInfo = (_ => {

  // better to put this in object to change state later:
  const state = {
    songsLength: 0,
    isPlaying: false
  }

  // Cache the DOM
  const playerCountEl = document.querySelector('.player__count');
  const playerTriggerEl = document.querySelector('.player__trigger');

  const init = _ => {
    render();
    listeners();
  }

  const listeners = _ => {
    playerTriggerEl.addEventListener('click',_ => {
      // 1. Change our own (Playinfo's) state
      state.isPlaying = state.isPlaying ? false : true;
      // 2. Render it
      render();
      // 3. Toggle the play/pause song functionality
      Playlist.flip();
    })
  }

  const setState = obj => {
    state.songsLength = obj.songsLength;
    state.isPlaying = obj.isPlaying;
    render();
  }

  const render = _ => {
    playerCountEl.innerHTML = state.songsLength;
    playerTriggerEl.innerHTML = state.isPlaying ? 'Pause' : 'Play';
  }
  return {
    init,
    setState
  }
})();

export default PlayInfo;