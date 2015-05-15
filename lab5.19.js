var path = '';
(require('fs')).readFile(path, {encoding: 'utf-8'}, function(err, data){
  if (err) {
    console.error('Can\'t open file');
  }
//  data = 'asddsa';
  data = data || fallback();
  console.log(data);
  var endAt = data.length-1;
  for (var i = 0; i < data.length/2; i++){
    if (data[i] !== data[endAt-i]) {
     console.log(i, data[i], data[endAt-i]);
      return console.log('Not symmetric'); 
    }
  }
  return console.log('Symmetric');
});


function fallback (length){
  console.log('fallback');
  length = length || 10;
  var text = '';
  for(var i = 0; i < length; i++){
    text += 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя .'[Math.floor(Math.random()*35)];
  }
  return text;
}