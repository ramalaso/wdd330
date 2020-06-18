var times = [0, 0, 0, 0, 0, 0, 0, 0, 0];
window.addEventListener('keydown', playSound);
function playSound(e) {
  var keys = [65, 83, 68, 70, 71, 72, 74, 75, 76];
  console.log(keys.includes(e.keyCode));
  //If the key is a valid one
  if (keys.includes(e.keyCode)) {
    index = keys.indexOf(e.keyCode);
    times[index]++;
    if (times[index] == 10) {
      times[index] = 0;
    }

    let element = document.querySelector(`[data-key="${e.keyCode}"]`);
    element.style.position = 'relative';
    element.style.left = '0px';
    element.style.top = '0px';
    element.style.top = parseInt(element.style.top) + 10 * times[index] + 'px';
    console.log(times);
    let audio = document.querySelector('#audio' + e.keyCode);
    audio.currentTime = 0;
    console.dir(audio);
    audio.play();
  }
}
const audios = Array.from(document.getElementsByTagName('audio'));
audios.forEach((aud) => {
  aud.addEventListener('play', (event) => {
    const id = event.currentTarget.id;
    const key = id.slice(-2);
    const container = document.querySelector(`[data-key="${key}"]`);

    container.classList.add('playing');
  });
  aud.addEventListener('ended', (event) => {
    const id = event.currentTarget.id;
    const key = id.slice(-2);
    const container = document.querySelector(`[data-key="${key}"]`);
    container.classList.remove('playing');
  });
});
