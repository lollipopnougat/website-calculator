const branchesRandomOrder = $('[id^=BranchGroup]').toArray().sort(function(){return 0.5-Math.random()});
const branchesRandomOrderLeft = $('[id^=BranchGroup-left]').toArray().sort(function(){return 0.5-Math.random()});
const branchesRandomOrderRight = $('[id^=BranchGroup-right]').toArray().sort(function(){return 0.5-Math.random()});
const branchesRandomOrderBottom = $('[id^=BranchGroup-bottom]').toArray().sort(function(){return 0.5-Math.random()});

// MASTER TIMELINE
const master = new TimelineMax();
master
.add(mainSetUp)
.add(branchMaster);


function mainSetUp() {
  const tl = new TimelineMax();
  tl
  .set('[id^=petal-]', { fill: "#e5d081" })
  .set(['[id^=flower-]', '[id^=bud-]', '[id^=bloom-]'], {scale: 0,  transformOrigin: 'center center'})
  .set(branchesRandomOrderLeft, {transformOrigin: 'bottom left'})
  .set(branchesRandomOrderRight, {transformOrigin: 'bottom right'})
  .set(branchesRandomOrderBottom, {transformOrigin: 'bottom center'})
  .set('#BranchGroup-left-1', {transformOrigin: '0% 20%'})
  .set('#BranchGroup-right-16', {transformOrigin: '100% 20%'})
  .set(branchesRandomOrder, {scale: 0})
  .set(".container", {autoAlpha: 1});
  
  return tl;
}

function branchMaster() {
  const tl = new TimelineMax();
  tl
    .add(wholeBranchGrowIn)
    .add(smallBranchesSway);
  
  return tl;
}

function wholeBranchGrowIn() {
  const tl = new TimelineMax();
  tl.staggerTo(branchesRandomOrder, 3, {scale: 1, ease: Power1.easeOut, onStart: flowersBloom, onComplete: currentBranchSwaying }, 0.25);
 
  return tl;
}

function flowersBloom() {
  const tl = new TimelineMax({delay: 1.5});
  const currentBranch = $(this.target);
  const petals = currentBranch.find('[id^=petal-]');
  const flowers = currentBranch.find('[id^=flower-]');
  const buds = currentBranch.find('[id^=bud-]');
  const blooms = currentBranch.find('[id^=bloom-]');

  tl
    .staggerTo([flowers, buds, blooms], 2,{ scale: 1, ease: Back.easeOut.config(2) }, 0.5, 0)
    .to(flowers, 3, { rotation: 45, ease: Sine.easeOut }, 0)
    .to(petals, 1, { fill: "#fff" }, 0)

  return tl;
}

function currentBranchSwaying() {
  const tl = new TimelineMax({yoyo: true, repeat: -1});
  const currentBranch = $(this.target);
  var currentBranchRotation;
  
  if (currentBranch.data('position') === "left") {
    currentBranchRotation = -10;
  } else if (currentBranch.data('position') === "right") {
    currentBranchRotation = 5;
  } else {
    currentBranchRotation = 10;
  }
  
  tl.staggerTo(currentBranch, 2 + Math.random(), {rotation: currentBranchRotation, ease: Sine.easeInOut}, Math.random() / 1.2);

  return tl;  
}


function smallBranchesSway() {
  const smallBranches = $('[id^=smallbranch-group]').toArray();
  const tl = new TimelineMax({yoyo: true, repeat: -1});
  
  tl
  .staggerTo(smallBranches, 2 + Math.random(), { rotation: 5, ease: Sine.easeInOut}, Math.random() / 1.2, 'smallBranchSway')
  .to('#smallbranch-group-3-B, #smallbranch-group-8-A', 1 + Math.random(), {rotation: -5, transformOrigin: '100% 50%'}, 'smallBranchSway')
  .to('#smallbranch-group-5-A', 2 + Math.random(), {rotation: -5, transformOrigin: '50% 100%'}, 'smallBranchSway')
  .to('#smallbranch-group-2-C, #smallbranch-group-A, #smallbranch-group-12-A', 2 + Math.random(), {rotation: -5, transformOrigin: '100% 100%'}, 'smallBranchSway');
  
  return tl;
}

