//44. Даны целые числа , , ... Известно, что >0 и что среди  	, , ... есть хотя бы одно отрицательное число. Пусть , ...,  - члены данной последовательности, //
//предшествующие первому отрицательному члену (n заранее не известно). Получить:ж) количество удвоенных нечетных среди ,..., ;
var a = 1000;

Array.prototype.isDoubleOdd = function(i){
  if (this[i]%2 == 0 && (this[i]/2)%2 == 1) return true;
  return false;
}

Array.prototype.makeRandomInt = function(length, startAt, endAt){
  this.length = length;
  if (!endAt || endAt < length) endAt = length;
  for (var i=startAt||0; i < endAt; i++){
    this[i] = Math.floor(Math.random()*1999-999);
  }
}

var makeTest = function (length){
  var array = [];
  var count = 0;
  array[0] = Math.floor(Math.random()*999+1);
  array.makeRandomInt(length, 1);
  console.log(array);
  for (var i = 0; (i < array.length && array[i] > 0); i++) {
    if (array.isDoubleOdd(i)) count++;
  }
  console.log('There are %d double odd.', count);
  return count;
}


makeTest(a);