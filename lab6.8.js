//г-код
function EmptyError(message){
  this.message = message; 
  Error.captureStackTrace(this, EmptyError);
  return this;
}

(require('util')).inherits(EmptyError, Error);

EmptyError.prototype.name = 'EmptyError';

process.on('emptyError', function(err){
 console.error('Don\'t tuch this stack!', err);
});
 
function ArrayStack(){
  this.stack = [];
  return this;
}

ArrayStack.prototype.remove = function(){
  if (this.stack.length) {
    this.last = this.last?(this.last-1):null;
    return this.stack.pull();
  }
  else {
    if (process.listeners('emptyError').length) process.emit('emptyError', new EmptyError('Stack is empty'));
    else throw new EmptyError('Queue is empty');
  }
}

ArrayStack.prototype.add = function (elem){
  this.stack.push(elem);
}

ArrayStack.prototype.isEmpty = function(){
  return !this.stack.length;
}

ArrayStack.prototype.clear = function(){
  this.stack = [];
}
var stack = new ArrayStack();
var funcs = {};

(require('fs')).readFile('fileName', {encoding: 'utf-8'}, function(err, data){
  if (err) {
    console.error('Can\'t open file');
   // process.exit(1);
  }
  data = 'M(8, m(M(1,2),m(6,4)))';
  data = data.replace(/ /g, '');
  function max (a,b) {return a>b?a:b};
  function min (a,b) {return a>b?a:b};
  funcs.M = max;
  funcs.m = min;
  
});

function make (str){
  if (str.match(/^\w+\(\d*,\d*\)$/) return funcs[str.match(/^\w+/)[0]](parseInt(str.match(/\d*,/)[0]), parseInt(str.match(/\d*\)/)[0]));
  //if (str.match(/^\d*$/)) return callback(null, Number(str));
  var current = {
    func: funcs[str.match(/^\w+/)[0]], 
    first: str.match(/^\w*\(\d+/)?Number(str.slice(str.indexOf('(')+1,str.indexOf(','))):undefined,
    sec: str.match(/,\d+\)$/)?Number(str.slice(str.lastIndexOf(',')+1, -1)):undefined,
    string: str
  }
  if (current.first == undefined) {
    var counter = 0;
    for (var i=str.indexOf('(')+1; i < str.length; i++){
      if (str[i] == '(') counter++;
      else if (str[i] == ')') {counter--;
      if (!counter) break;
      }
    }
    current.first = str.slice(str.indexOf('(')+1, i);
  }
  if (current.sec == undefined) {
    counter = 0;
    var sAt = str.indexOf(',', i||0);
    for (var i=sAt+1; i < str.length; i++){
      if (str[i] == '(') counter++;
      else if (str[i] == ')') {counter--;
      if (!counter) break;
      }
    }
    current.sec = str.slice(sAt, i);
  }
  if (typeof current.first == 'string') current.first = make(str);
  stack.push(current);
  
  
  
}