var string = '';
var length = 66;
for (var i=0; i < length; i++){
  string += 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя .'[Math.floor(Math.random()*35)];
}
console.log(string);
for (var i=0; i < length/2; i++){
  if (string[i] != string[i+33]) {
    string += string;
    console.log(i, string[i], string[i+1]);
    break;
  }
}

console.log(string);
