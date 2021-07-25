var text1 = '1Lorem 1Ipsum 1is 1simply';
var text2 = '2dummy 2text 2of 2the 2printing';
var text3 = '3and 3typesetting 3industry.';
var recorrerPalabras = function (text, msPerWord, callback) {
    if (msPerWord === void 0) { msPerWord = 1000; }
    var splitText = text.split(' ');
    var i = 0;
    var wordCount = 0;
    splitText.forEach(function (el) {
        if (i === splitText.length) {
            callback();
            console.log(wordCount + " palabras encontradas!");
        }
        else {
            setTimeout(function (el) { return console.log(el); }, msPerWord);
            i++;
            wordCount++;
        }
    });
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
};
//const recorrerPalabras = new Promise((resolve, reject) => {
//});
var myCallback = function () {
    console.log('proceso completo');
};
//recorrerPalabras(text1, 800, myCallback);
recorrerPalabras(text1, 800, recorrerPalabras(text2, 800, recorrerPalabras(text3, 800, myCallback)));
