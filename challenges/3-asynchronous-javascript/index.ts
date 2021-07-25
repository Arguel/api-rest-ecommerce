const text1: string = '1Lorem 1Ipsum 1is 1simply';
const text2: string = '2dummy 2text 2of 2the 2printing';
const text3: string = '3and 3typesetting 3industry.';

const recorrerPalabras: Function = (text: string, msPerWord: number = 1000, callback: Function) => {

  const splitText: string[] = text.split(' ');
  let i: number = 0;
  let wordCount: number = 0;
  splitText.forEach((el: string) => {
    if (i === splitText.length) {
      callback();
      console.log(`${wordCount} palabras encontradas!`);
    } else {
      setTimeout((el: string) => console.log(el), msPerWord)
      i++;
      wordCount++;
    }
  })
  //const myInterval: number = setInterval((): void => {
  //if (i === splitText.length) {
  //clearInterval(myInterval);
  //console.log(`${wordCount} palabras encontradas!`);
  //return callback();
  //} else {
  //console.log(splitText[i]);
  //i++;
  //wordCount++;
  //}
  //}, msPerWord)

}

//const recorrerPalabras = new Promise((resolve, reject) => {

//});

const myCallback: Function = (): void => {
  console.log('proceso completo');
}

//recorrerPalabras(text1, 800, myCallback);

recorrerPalabras(
  text1,
  800,
  recorrerPalabras(
    text2,
    800,
    recorrerPalabras(
      text3,
      800,
      myCallback
    )
  )
);
