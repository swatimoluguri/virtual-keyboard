const keyboard = document.querySelector(".keyboard");
const input_area = document.querySelector(".input-text");

const keys = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "keyboard_backspace",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  "'",
  "keyboard_return",
  "keyboard_capslock",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/",
  "pin",
  "space_bar",
  "sentiment_satisfied",
];

const Emojis = [
  "😀",
  "😁",
  "😂",
  "😃",
  "😄",
  "😅",
  "😆",
  "😇",
  "👿",
  "😉",
  "😊",
  "😋",
  "😌",
  "😍",
  "😎",
  "😏",
  "😐",
  "😑",
  "😒",
  "😓",
  "😔",
  "😕",
  "😖",
  "😗",
  "😘",
  "😛",
  "😜",
  "😝",
  "😞",
  "😟",
  "😠",
  "😡",
  "😢",
  "😣",
  "😤",
  "😥",
  "😦",
  "😧",
  "😨",
  "😩",
  "😪",
  "😫",
  "😬",
  "😭",
  "😮",
  "😯",
  "😰",
  "😱",
  "😶",
  "😷",
  "👏",
  "👋",
  "👍",
  "👎",
  "✌",
  "🙏",
  "❤️",
  "🎯",
  "🚀",
  "⌚️",
  "keyboard_backspace",
];

const nums = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "`",
  "~",
  "[",
  "{",
  "]",
  "}",
  "|",
  ";",
  ":",
  "'",
  '"',
  ",",
  "<",
  ".",
  ">",
  "?",
  "keyboard_backspace",
];

const large_keys = [
  "keyboard_backspace",
  "keyboard_return",
  "keyboard_capslock",
  "pin",
  "sentiment_satisfied",
];

const line_breaks = ["keyboard_backspace", "keyboard_return", "/",'0'];
let typed_text = "";
let toggle_caps = false;

// Function to create a key element
function createKey(key, type) {
  const element = document.createElement("div");
  element.setAttribute("class", "key");
  if (key.length > 1) element.classList.add("material-symbols-outlined");
  if (large_keys.includes(key)) element.classList.add("key-large");
  if (key == "space_bar") element.classList.add("key-extra-large");
  if (key == "pin" || key == "sentiment_satisfied")
    element.classList.add("darker");
  if ((type == "emoji" || type == "nums") && key == "keyboard_backspace") {
    element.classList.add("darker");
  }

  element.id = `key_${key}`;
  element.textContent = toggle_caps ? key.toUpperCase() : key.toLowerCase();

  // Add click event listener
  element.addEventListener("click", () => {
    switch (key) {
      case "space_bar":
        typed_text += " ";
        break;
      case "keyboard_backspace":
        if (type === "emoji" || type === "nums") {
          displayKeyboard(keys);
        } else {
          typed_text = typed_text.slice(0, -1);
        }
        break;
      case "keyboard_return":
        typed_text += "\n";
        break;
      case "keyboard_capslock":
        toggle_caps = !toggle_caps;
        updateCapsLockState();
        break;
      case "pin":
        displayKeyboard(nums, "nums");
        break;
      case "sentiment_satisfied":
        displayKeyboard(Emojis, "emoji");
        break;
      default:
        typed_text += toggle_caps ? key.toUpperCase() : key.toLowerCase();
        break;
    }
    input_area.textContent = typed_text;
  });
  return element;
}

// Function to update the caps lock state
function updateCapsLockState() {
  const caps_div = document.querySelector(
    toggle_caps ? ".caps-off" : ".caps-on"
  );
  caps_div.setAttribute("class", toggle_caps ? "caps-on" : "caps-off");
  keys.forEach((item) => {
    if (item !== "keyboard_capslock") {
      const keyElement = document.getElementById(`key_${item}`);
      if (keyElement) {
        keyElement.textContent = toggle_caps
          ? item.toUpperCase()
          : item.toLowerCase();
      }
    }
  });
}

// Function to display the emoji or number keyboard
function displayKeyboard(keyboardKeys, type) {
  keyboard.innerHTML = "";
  keyboardKeys.forEach((key) => {
    const keyElement = createKey(key, type);
    if (key == "keyboard_capslock") {
      const caps_mark = document.createElement("div");
      caps_mark.setAttribute("class", toggle_caps ? "caps-on" : "caps-off");
      keyElement.appendChild(caps_mark);
    }
    keyboard.appendChild(keyElement);
    if (line_breaks.includes(key)) {
      const br = document.createElement("br");
      keyboard.appendChild(br);
    }
  });
}

// Initialize the keyboard
keys.forEach((item) => {
  const element = createKey(item);
  if (item == "keyboard_capslock") {
    const caps_mark = document.createElement("div");
    caps_mark.setAttribute("class", toggle_caps ? "caps-on" : "caps-off");
    element.appendChild(caps_mark);
  }
  keyboard.appendChild(element);
  if (line_breaks.includes(item)) {
    const br = document.createElement("br");
    keyboard.appendChild(br);
  }
});

// Add event listener to input area for copying text to clipboard
input_area.addEventListener("click", () => {
  input_area.select();
  document.execCommand("copy");
  alert("Input text copied to clipboard!");
});
