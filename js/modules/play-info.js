/* Play-info.js is the left side of the app: 12 songs, play button */

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