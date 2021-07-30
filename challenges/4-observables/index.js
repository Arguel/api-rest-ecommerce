const {Observable, fromEvent} = rxjs;
const {filter, map} = rxjs.operators;

document.addEventListener('DOMContentLoaded', () => {

  function blockInput(reason, subs, input, mirror, raiseError) {
    subs.unsubscribe();
    input.setAttribute('disabled', '');
    mirror.textContent = '';
    console.log(reason);
    if (raiseError) throw new Error(reason);
  }



  const inputText = document.getElementById('ejemplosInput');
  const espejo = document.getElementById('espejo');

  const observable = fromEvent(inputText, 'keyup').pipe(map(e => e.target.value.split('').reverse().join('')));

  const subscription = observable.subscribe((e) => {

    //usando metodos nativos 
    //e = e.target.value.split('').reverse().join('')

    espejo.textContent = e;
    //error
    if (/rorre/.test(e)) {
      blockInput('Salgo por error', subscription, inputText, espejo, true);
    }
    //complete
    else if (/etelpmoc/.test(e)) {
      blockInput('Complete', subscription, inputText, espejo, false);
    }

  });

  setTimeout(() => {
    subscription.unsubscribe();
    blockInput('Desubscripcion automatica', subscription, inputText, espejo, false);
  }, 30000);





});

