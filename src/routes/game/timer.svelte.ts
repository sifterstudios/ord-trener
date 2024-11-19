export let timer = 0; // Timer value in seconds
let interval; // Holds the interval ID

export function startTimer() {
  if (!interval) {
    interval = setInterval(() => {
      timer += 1;
    }, 10);
  }
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
}

export function resetTimer() {
  stopTimer();
  timer = 0;
}
