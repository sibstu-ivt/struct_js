var eoc = ' ';
var eol = ' ';
var fs = require('fs');

function Student (secondName, name, classNumber, letter){
  this.secondName = secondName;
  this.name = name;
  this.classNumber +classNumber;
  this.letter = letter;
  return this;
};


fs.readFile('fileName', {encoding: 'utf-8'}, function(err, data){
  if (err) {
    console.error('Can\'t open file');
    process.exit(1);
  }
  var students = [];
  data=data.split(eol);
  for (var i in data){
    data[i]=data[i].split(eoc);
    students.push(new Student(data[i][0], data[i][1], data[i][2], data[i][3]));
  };
  //нужная функция вызывается
  console.log(isRepeatedSecondNames(students)?'There are persons with repeated second names':'There aren\'t persons with repeated second names');
});

//Однофамильцы?
function isRepeatedSecondNames (array){
  for (var i=0; i<array.length; i++){
    for (var j=i+1; j<array.length; j++){
      if (array[i].secondName === array[j].secondName) return true;
    }
  }
  return false;
};
