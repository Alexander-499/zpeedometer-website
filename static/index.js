// Story Text
const storyTextSetActive = () => {
  document.querySelectorAll("#storyText > div").forEach(div => {
    if (div.getBoundingClientRect().top <= window.innerHeight / 2) {
      div.classList.add("active");
    } else div.classList.remove("active");
  });
}

window.addEventListener("scroll", storyTextSetActive);
window.addEventListener("resize", storyTextSetActive);
storyTextSetActive();

// Features
const faqGrid = document.getElementById("faqGrid");
const faqItems = faqGrid.innerHTML.trim().split("++").map(block => {
  const qMatch = block.match(/q:\s*"(.*?)"/s);
  const aMatch = block.match(/a:\s*"(.*?)"/s);
  return {
    q: qMatch ? qMatch[1] : "",
    a: aMatch ? aMatch[1] : ""
  };
});
faqGrid.innerHTML = faqItems.map(f =>
  `<div>
    <input id="${"faqCheckbox" + f.q.replace(/[^A-Za-z0-9]+/g, "")}" type="checkbox">
    <label for="${"faqCheckbox" + f.q.replace(/[^A-Za-z0-9]+/g, "")}">
      <span>${f.q}</span><i data-lucide="chevron-down"></i>
    </label>
    <div><div>${f.a}</div></div>
  </div>`
).join("");

// Sliders
const sliders = document.querySelectorAll(".slider")

sliders.forEach(slider => {
  const updateSlider = () => {
    const sliderPercent = (slider.value - slider.min) / (slider.max - slider.min);
    slider.style.background = `linear-gradient(to right, var(--accent-blue) ${sliderPercent * 100}%, #666 ${sliderPercent * 100}%)`;
  }

  updateSlider();
  slider.addEventListener("input", updateSlider);
});

// Speedometer Showcase
const speedometer = document.getElementById("speedometer");
const speedSlider = document.getElementById("speedSlider");
const maxValueSlider = document.getElementById("maxValueSlider");
const labelTextInput = document.getElementById("labelTextInput");
let maxValue = 240;
const startAngle = 220;

function generateTicks(maxValue = 240) {
  let majorStep = 10;
  if (maxValue > 120) {
    majorStep = 20;
  } else if (maxValue > 70) {
    majorStep = 10;
  } else majorStep = 5;

  const step = majorStep / 2;
  const totalValues = maxValue / step + 1;
  const angleStep = (500 - startAngle) / (totalValues - 1);
  const ticks = speedometer.querySelectorAll(":scope > .tick");
  ticks.forEach(tick => tick.remove());
  
  for (let i = 0; i < totalValues; i++) {
    const value = i * step;
    const angle = startAngle + i * angleStep;
    const isMajor = value % majorStep === 0;
    const tick = document.createElement('div');
    tick.classList.add('tick', isMajor ? 'major' : 'minor');
    tick.style.setProperty('--angle', `${angle}deg`);
    if (isMajor) tick.style.setProperty('--label', `"${value}"`);
    speedometer.appendChild(tick);
  }
}

function setPointerToSpeed(speed = 0, maxValue = 240) {
  speed = Math.min(Math.max(speed, 0), maxValue);
  const pointerAngle = startAngle - 1 + (speed / (maxValue + 2)) * (500 - startAngle + 3.5);
  pointer.style.transform = `rotate(${pointerAngle}deg) translateY(-52px)`;
};

generateTicks();
setPointerToSpeed();
speedometer.style.setProperty("--speedometer-label", "'Zpeedometer'");
speedSlider.addEventListener("input", () => { setPointerToSpeed(speedSlider.value); });
maxValueSlider.addEventListener("input", () => { generateTicks(maxValueSlider.value); });
labelTextInput.addEventListener("input", () => { speedometer.style.setProperty("--speedometer-label", `"${labelTextInput.value}"`); });