var d = 1000;
var n = 1000;
var text = '';

for(var i = Math.floor(Math.random()*n+1)*Math.floor(Math.random()*d+1); i < d*n; i++){
  text += 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя .'[Math.floor(Math.random()*35)];
}
console.log(text.length);

function StringLink (string){
  this.value = string;
  return this;
}

var array = [];
array.length = n;

for (i = 0; i < array.length; i++){
  var string = text.slice(d*i, d*i+1000);
  array[i] =  string ? (new StringLink(string)) :  null;
}

for (i = 0; i < array.length && array[i] !== null; i++){
  console.log(array[i].value);
}