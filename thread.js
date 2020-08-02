console.log('thread.js thread');

while (true) {
  console.log("Loop! child_thread");
  const d1 = new Date();
  while (true) {
    const d2 = new Date();
    if (d2 - d1 > 60) {
      break;
    }
  }
}
