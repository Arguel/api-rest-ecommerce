const text1: string = '1Lorem 1Ipsum 1is 1simply';
const text2: string = '2dummy 2text 2of 2the 2printing';
const text3: string = '3and 3typesetting 3industry.';

const recorrerPalabras: Function = (text: string, msPerWord: number = 1000, callback: Function): void => {

  const splitText: string[] = text.split(' ');
  let counter: number = 0;

  const myInterval: number = setInterval((): void => {
    if (counter === splitText.length) {
      clearInterval(myInterval);
      console.log(`${counter} palabras encontradas!`);
      callback();
    } else {
      console.log(splitText[counter]);
      counter++;
    }
  }, msPerWord)

}

const myCallback: Function = (): void => {
  console.log('proceso completo');
}

recorrerPalabras(text1, 800, myCallback,);
recorrerPalabras(text2, 800, myCallback,);
recorrerPalabras(text3, 800, myCallback,);
