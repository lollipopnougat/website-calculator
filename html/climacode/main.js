"use strict";
const rotateDiv = document.getElementById('rot');
const rotateIcons = document.getElementById('rot-icons');
const clickRotateDiv = document.getElementById('click-rot');
const mountains = document.getElementById('mountains');
const outerRim = document.querySelector('.outer-rim');
const powerBtn = document.querySelector('.power');
powerBtn.onclick = () => {
    outerRim.classList.toggle('power-on');
};
let angle = 0;
clickRotateDiv.onclick = () => {
    angle += 60;
    rotateDiv.style.transform = `rotate(${angle}deg)`;
    rotateIcons.style.transform = `rotate(${angle}deg)`;
};
const step = 2;
const color1 = 'rgba(0,0,0,0.5)';
const color2 = 'rgba(0,0,0,0.1)';
let gradient = ' conic-gradient(';
for (let i = 0; i < 360; i += step) {
    const color = i % (2 * step) === 0 ? color1 : color2;
    gradient += `${color}  ${i}deg, `;
}
gradient = `${gradient.slice(0, -2)}), rgb(85 93 108)`;
rotateDiv.style.background = gradient;
const toggles = document.querySelectorAll('.toggle');
const tempElement = document.querySelector('.temp');
let isAnimating = false; // Add flag to indicate if animation is active
toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        if (toggle.classList.contains('active') || isAnimating) {
            // Check if animation is active
            return;
        }
        toggles.forEach(toggle => {
            toggle.classList.remove('active');
        });
        toggle.classList.add('active');
        const tempValue = parseFloat(tempElement.textContent);
        if (toggle.id === 'toggle-cel') {
            const celsius = Math.round(((tempValue - 32) * 5) / 9);
            tempElement.textContent = `${celsius}°C`;
        }
        else if (toggle.id === 'toggle-far') {
            const fahrenheit = Math.round((tempValue * 9) / 5 + 32);
            tempElement.textContent = `${fahrenheit}°F`;
        }
    });
});
let currentTempF = 34; // 改摄氏1
// cubic ease in/out function
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
function changeTemp(element, newTemp) {
    const unit = element.innerHTML.includes('F') ? '°F' : '°C';
    const currentTemp = unit === '°F' ? currentTempF : Math.round(((currentTempF - 32) * 5) / 9);
    const finalTemp = unit === '°F' ? newTemp : Math.round(((newTemp - 32) * 5) / 9);
    const duration = 2000; // Duration of the animation in milliseconds
    let startTime = null;
    function animate(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        const elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1);
        progress = easeInOutCubic(progress);
        const tempNow = Math.round(currentTemp + progress * (finalTemp - currentTemp));
        element.innerHTML = `${tempNow}${unit}`;
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
        else {
            // Update currentTempF once the animation is complete
            currentTempF = newTemp;
            isAnimating = false; // Reset the flag when animation is done
        }
    }
    isAnimating = true; // Set flag when animation starts
    requestAnimationFrame(animate);
}
window.onload = function () {
    const sixths = Array.from(document.querySelectorAll('.sixths'));
    let index = 0;
    const temp = document.querySelector('.temp');
    rotateIcons.addEventListener('click', () => {
        sixths[index].classList.remove('active');
        index = (index + 1) % sixths.length;
        sixths[index].classList.add('active');
        if (index == 0) {
            changeTemp(temp, 34);
            console.log('sun');
            mountains.classList.remove('snow');
            mountains.classList.remove('clouds');
        }
        else if (index == 1) {
            changeTemp(temp, 27);
            console.log('sunset');
            mountains.classList.add('sunset');
        }
        else if (index == 2) {
            changeTemp(temp, 14);
            console.log('moon');
            mountains.classList.remove('sunset');
            mountains.classList.add('moon');
        }
        else if (index == 3) {
            changeTemp(temp, 16);
            console.log('clouds');
            mountains.classList.add('clouds');
        }
        else if (index == 4) {
            changeTemp(temp, 8);
            console.log('storm');
            mountains.classList.add('storm');
        }
        else if (index == 5) {
            changeTemp(temp, -4);
            console.log('snow');
            mountains.classList.remove('moon');
            mountains.classList.remove('storm');
            mountains.classList.add('snow');
        }
        const loadingBar = document.querySelector('.loading-bar');
        loadingBar.classList.add('active');
        setTimeout(() => {
            loadingBar.classList.remove('active');
        }, 1200);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBbUIsQ0FBQztBQUNuRSxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBbUIsQ0FBQztBQUMzRSxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBbUIsQ0FBQztBQUM5RSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBMEIsQ0FBQztBQUNoRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBbUIsQ0FBQztBQUN4RSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBbUIsQ0FBQztBQUNwRSxRQUFRLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtJQUN0QixRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUM7QUFFRixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFFZCxjQUFjLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtJQUM1QixLQUFLLElBQUksRUFBRSxDQUFDO0lBQ1osU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsVUFBVSxLQUFLLE1BQU0sQ0FBQztJQUNsRCxXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxVQUFVLEtBQUssTUFBTSxDQUFDO0FBQ3RELENBQUMsQ0FBQztBQUVGLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQztBQUNmLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDO0FBQ2pDLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDO0FBRWpDLElBQUksUUFBUSxHQUFHLGtCQUFrQixDQUFDO0FBQ2xDLEtBQUss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