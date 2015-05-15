var a = 10;

function Matrix (height, width) {
  width = width || height;
  this.value = [];
  for (var i = 0; i < height; i++){
    this.value[i] = [];
    this.value[i].length = width;
  }
  return this;
}


Matrix.prototype.make = function(rule){
  if (rule){
    for (var i = 0; i < this.value.length; i++){
      for (var j = 0; j < this.value[i].length; j++){
	this.value[i][j] = rule(i, j);
      }
    }
  }
  else {
    for (var i = 0; i < this.value.length; i++){
      for (var j = 0; j < this.value[i].length; j++){
	this.value[i][j] = Math.random()*1999-999;
      }
    }
  }
}

Matrix.prototype.howMuchNullString = function(){
  var count = 0;
  for (var i = 0; i < this.value.length; i++) {
    for (var j = 0; j < this.value[i].length; j++){
      if (this.value[i][j] != 0) break;
    }
    if (j == this.value[i].length) count++;
  }
  return count;
}

Matrix.prototype.toString = function(){
  string = '';
  for (var i = 0; i < this.value.length; i++) {
    for (var j = 0; j < this.value[i].length; j++){
      string += this.value[i][j] + '\t';
    }
    string += '\n';
  }
  return string;
}

var makeTest = function (length){
  var matrix = new Matrix(length);
  matrix.make(function(i, j){
    return Math.floor(Math.random()*2);
  });
  console.log('%s', matrix);
  console.log('There are %d null strings', matrix.howMuchNullString());
}

makeTest(a);
