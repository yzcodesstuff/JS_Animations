const target = document.getElementById("typingText");
const textInput = document.getElementById("textInput");
const button = document.getElementById("button");

async function typeHTML(text) {
  let i = 0;
  let display = "";

  while (i < text.length) {
    display += text[i];
    target.innerHTML = display + '<span id="cursor">|</span>';
    let currentChar = text[i];
    i++;
    let delay = 40;
    if (/[.,!?]/.test(currentChar)) {
      delay += 200;
    }

    await new Promise((r) => setTimeout(r, delay));
  }

  document.getElementById("cursor").style.display = "none";
}

button.addEventListener("click", () => {
  typeHTML(textInput.value);
});
