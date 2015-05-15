var string = 'asQWEd.123_-=ЫВАКУук|rewer adf ker wasdrfew aer wer adfrt';

console.log(string+'\n'+string.replace(/.*?(?= )/, function(a){
  return a.toLowerCase().replace(/[^a-zа-яё0-9]/g, '');
}));