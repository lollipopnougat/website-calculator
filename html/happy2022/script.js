var design = anime({
  targets: '#newyear2022 #happy',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 2000,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});

var design = anime({
  targets: '#newyear2022 #NEWYEAR',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 2500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});



var design = anime({
  targets: '#newyear2022 #Vector_43,#Vector_210,#Vector_207,#Vector_42,#Vector_45',
  translateY: -10,
  easing: 'easeInOutSine',
  duration: 2500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});