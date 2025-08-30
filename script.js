const avatarStack = document.querySelector('.avatar-stack');
const avatars = {
  "Doraemon": "assets/avatars/Doraemon.png",
  "Nobita Nobi": "assets/avatars/Nobita_Nobi.png",
  "Shizuka Minamoto": "assets/avatars/Shizuka.png",
  "Gian": "assets/avatars/Gian.png",
  "Suneo Honekawa": "assets/avatars/Suneo_Honekawa.png",
  "Tamako Nobi": "assets/avatars/Tamako_Nobi.png",
  "Dorami": "assets/avatars/Dorami.png",
  "Sewashi Nobi": "assets/avatars/Sewashi_Nobi.png"
};

const pastelColors = {
  "Doraemon": "#a0d8f1",
  "Nobita Nobi": "#f6d7a7",
  "Shizuka Minamoto": "#f5b7b1",
  "Gian": "#f4d06f",
  "Suneo Honekawa": "#c4e17f",
  "Tamako Nobi": "#f9c5d1",
  "Dorami": "#ffe5b4",
  "Sewashi Nobi": "#d1c4e9"
};

// Slider elements
const itemsSlider = document.getElementById('items');
const itemsValue = document.getElementById('itemsValue');
const sizeSlider = document.getElementById('size');
const sizeValue = document.getElementById('sizeValue');
const columnSlider = document.getElementById('column');
const columnValue = document.getElementById('columnValue');
const borderSlider = document.getElementById('border');
const borderValue = document.getElementById('borderValue');
const letterSpacingSlider = document.getElementById('letterSpacing');
const letterSpacingValue = document.getElementById('letterSpacingValue');

// Function to create arched text around avatar
const radiusOffset = 5; // small gap outside the border
function createArchedText(container, text, size, border) {
  container.innerHTML = '';
  const letters = text.split('');
  const radius = size / 2 + border + radiusOffset;
  const angleStep = 180 / (letters.length - 1); // semi-circle on top

  letters.forEach((letter, idx) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.transform = `rotate(${angleStep * idx - 90}deg) translate(${radius}px) rotate(-${angleStep * idx - 90}deg)`;
    container.appendChild(span);
  });
}

function fetchAvatars(count) {
  avatarStack.innerHTML = '';
  const keys = Object.keys(avatars);
  const radiusOffset = 10; // distance from avatar border

  for (let i = 0; i < Math.min(count, keys.length); i++) {
    const name = keys[i];
    const imgUrl = avatars[name];

    const avatarContainer = document.createElement('div');
    avatarContainer.className = 'avatar-container';
    avatarContainer.style.backgroundColor = pastelColors[name] || "#ccc";
    avatarContainer.style.backgroundImage = `url(${imgUrl})`;
    avatarContainer.style.backgroundSize = "contain";
    avatarContainer.style.backgroundRepeat = "no-repeat";
    avatarContainer.style.backgroundPosition = "center";

    const ring = document.createElement('div');
    ring.className = 'ring-text';

    const radius = parseInt(sizeSlider.value) / 2 + radiusOffset;
    createArchedText(ring, name, radius);

    avatarContainer.appendChild(ring);
    avatarStack.appendChild(avatarContainer);
  }

  updateStyles();
}

function updateStyles() {
  const size = parseInt(sizeSlider.value);
  const column = parseInt(columnSlider.value);
  const border = parseInt(borderSlider.value);
  const letterSpacing = parseInt(letterSpacingSlider.value);
  const radiusOffset = 10;

  document.querySelectorAll('.avatar-container').forEach((container, index) => {
    const ring = container.querySelector('.ring-text');

    container.style.width = `${size}px`;
    container.style.height = `${size}px`;
    container.style.border = `${border}px solid #fff`;
    container.style.borderRadius = "50%";

    const radius = size / 2 + radiusOffset;

    // Update letters dynamically
    const letters = ring.querySelectorAll('span');
    const angleStep = 360 / letters.length;
    letters.forEach((span, idx) => {
      span.style.fontSize = `${Math.max(10, radius / 5 - letterSpacing / 10)}px`;
      span.style.transform = `rotate(${angleStep * idx}deg) translate(${radius}px) rotate(-${angleStep * idx}deg)`;
    });

    if (index > 0) container.style.marginLeft = `-${column}px`;
  });
}

// Slider sync function
function synchronizeSliderAndField(slider, field, callback) {
  slider.addEventListener('input', () => { field.value = slider.value; callback(); });
  field.addEventListener('input', () => { slider.value = field.value; callback(); });
}

synchronizeSliderAndField(itemsSlider, itemsValue, () => { fetchAvatars(itemsSlider.value); });
synchronizeSliderAndField(sizeSlider, sizeValue, updateStyles);
synchronizeSliderAndField(columnSlider, columnValue, updateStyles);
synchronizeSliderAndField(borderSlider, borderValue, updateStyles);
synchronizeSliderAndField(letterSpacingSlider, letterSpacingValue, updateStyles);

// Initial fetch
fetchAvatars(itemsSlider.value);
