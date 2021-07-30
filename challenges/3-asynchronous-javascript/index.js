"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {return value instanceof P ? value : new P(function (resolve) {resolve(value);});}
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {try {step(generator.next(value));} catch (e) {reject(e);} }
        function rejected(value) {try {step(generator["throw"](value));} catch (e) {reject(e);} }
        function step(result) {result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);}
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const text1 = '1Lorem 1Ipsum 1is 1simply';
const text2 = '2dummy 2text 2of 2the 2printing';
const text3 = '3and 3typesetting 3industry.';
const recorrerPalabras = (text, msPerWord = 1000, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const splitText = text.split(' ');
    for (let i = 0; i < splitText.length; i++) {
        yield new Promise(resolve => setTimeout(resolve, msPerWord));
        console.log(splitText[i]);
    }
    console.log(`${splitText.length} palabras encontradas`);
    callback();
});
const myCallback = () => {
    console.log('proceso completo');
};
const awaitFun = () => __awaiter(void 0, void 0, void 0, function* () {
    yield recorrerPalabras(text1, 1800, myCallback);
    yield recorrerPalabras(text2, 1800, myCallback);
    yield recorrerPalabras(text3, 1800, myCallback);
});
awaitFun();
