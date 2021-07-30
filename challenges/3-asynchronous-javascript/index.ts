const text1: string = '1Lorem 1Ipsum 1is 1simply';
const text2: string = '2dummy 2text 2of 2the 2printing';
const text3: string = '3and 3typesetting 3industry.';

const recorrerPalabras: Function = async (text: string, msPerWord: number = 1000, callback: Function) => {

  const splitText: string[] = text.split(' ');

  for (let i: number = 0; i < splitText.length; i++) {
    await new Promise(resolve => setTimeout(resolve, msPerWord));
    console.log(splitText[i]);
  }
  console.log(`${splitText.length} palabras encontradas`);
  callback();

}

const myCallback: Function = (): void => {
  console.log('proceso completo');
}

const awaitFun = async () => {
  await recorrerPalabras(text1, 1800, myCallback,);
  await recorrerPalabras(text2, 1800, myCallback,);
  await recorrerPalabras(text3, 1800, myCallback,);
}
awaitFun();
