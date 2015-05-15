//28. Даны натуральное число n, действительные числа . Получить  и . 

var a = 1000;

Array.prototype.makeRandom = function(length, startAt, endAt){
  this.length = length;
  if (!endAt || endAt < length) endAt = length;
  for (var i=startAt||0; i < endAt; i++){
    this[i] = Math.random()*1999-999;
  }
}

Array.prototype.absMax = function(){
  var max = Math.abs(this[0]);
  for (var i = 1; i < this.length; i++) {
    var cur = Math.abs(this[i]);
    if (cur > max) max = cur;
  }
  return max;
}

Array.prototype.calcSqrtOfSumm = function(){
  var summ = 0;
  for (var i = 0; i < this.length; i++) summ += this[i]*this[i];
  return Math.sqrt(summ);
}

var makeTest = function (length){
  var array = [];
  array.makeRandom(length);
  console.log(array);
  console.log('The max abs is %d.', array.absMax());
  console.log('Result of calculation is %d.', array.calcSqrtOfSumm());
}

makeTest(a);
