const input = document.querySelector("#inputTextarea");
const btnTranslate = document.querySelector("#btnTranslate");
const btnReset = document.querySelector("#btnReset");
const output = document.querySelector("#outputTextarea");
const alertModal = document.querySelector("#alertModal");
const audio = document.querySelector("audio");

output.value = "";

btnTranslate.addEventListener("click", () => {
  output.value = "";

  if (!input.value) {
    alertModal.style.display = "inline";
    setTimeout(() => {
      alertModal.style.display = "none";
    }, 2000);
  } else {
    alertModal.style.display = "none";
    fetch(
      `https://api.funtranslations.com/translate/morse.json?text=${input.value}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        output.value = data.contents.translated;
      })
      .catch((error) => {
        console.log(error, error.message);
      });

    fetch(
      `https://api.funtranslations.com/translate/morse/audio.json?text=${input.value}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        audio.src = data.contents.translated.audio;
      })
      .catch((error) => {
        console.log(error, error.message);
      });
  }
});

btnReset.addEventListener("click", () => {
  input.value = "";
  output.value = "";
  audio.src = "";
});
