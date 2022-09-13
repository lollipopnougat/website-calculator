if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

setTimeout(() => {
    console.log('OK!');
}, 1000);


