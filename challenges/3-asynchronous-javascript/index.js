var text1 = '1Lorem 1Ipsum 1is 1simply';
var text2 = '2dummy 2text 2of 2the 2printing';
var text3 = '3and 3typesetting 3industry.';
var recorrerPalabras = function (text, msPerWord, callback) {
    if (msPerWord === void 0) { msPerWord = 1000; }
    var splitText = text.split(' ');
    var counter = 0;
    var myInterval = setInterval(function () {
        if (counter === splitText.length) {
            clearInterval(myInterval);
            console.log(counter + " palabras encontradas!");
            callback();
        }
        else {
            console.log(splitText[counter]);
            counter++;
        }
    }, msPerWord);
};
var myCallback = function () {
    console.log('proceso completo');
};
recorrerPalabras(text1, 800, myCallback);
recorrerPalabras(text2, 800, myCallback);
recorrerPalabras(text3, 800, myCallback);
