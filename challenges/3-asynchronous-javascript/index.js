"use strict";
const text1 = "1Lorem 1Ipsum 1is 1simply";
const text2 = "2dummy 2text 2of 2the 2printing";
const text3 = "3and 3typesetting 3industry.";
const recorrerPalabras = async (text, callback, msPerWord = 1000) => {
  const splitText = text.split(" ");
  for (let i = 0; i < splitText.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, msPerWord));
    console.log(splitText[i]);
  }
  console.log(`${splitText.length} palabras encontradas`);
  callback(splitText.length);
};
recorrerPalabras(text1, (res1) => {
  recorrerPalabras(text2, (res2) => {
    recorrerPalabras(text3, (res3) => {
      const amountOfWords = res1 + res2 + res3;
      console.log("Proceso completo");
      console.log(`Cantidad de palabras totales ${amountOfWords}`);
    }, 2000);
  }, 2000);
}, 2000);
