function EmptyError(message){
  this.message = message; 
  Error.captureStackTrace(this, EmptyError);
  return this;
}

function FullError(message){
  this.message = message; 
  Error.captureStackTrace(this, EmptyError);
  return this;
}

(require('util')).inherits(EmptyError, Error);
(require('util')).inherits(FullError, Error);

EmptyError.prototype.name = 'EmptyError';
FullError.prototype.name = 'FullError';

process.on('emptyError', function(err){
 console.error('Don\'t tuch this stack!', err);
});

 
 
function ArrayStack(length){
  this.length = length; //массив бесконечный, реального переполнения не будет, пока вообще есть память
  this.stack = [];
  this.last = null; //не нужна
  return this;
}

ArrayStack.prototype.remove(){
  if (this.stack.length) {
    this.last = this.last?(this.last-1):null;
    return this.stack.pull();
  }
  else {
    if (process.listeners('emptyError').length) process.emit('emptyError', new EmptyError('Stack is empty'));
    else throw new EmptyError('Queue is empty');
  }
}

ArrayStack.prorotype.add(elem){
  if (this.stack.length+1 > this.length) {
    if (process.listeners('fullError').length) process.emit('fullError', new FullError('Stack is full'));
    else throw new FullError('Stack is full');
  }
  this.last = this.last===null?0:this.last+1;
  this.stack.push(elem);
}







function ListStack(){
  this.value = null;
  return this;
}

function ListElem(value, next){
  this.value = value;
  this.next = next || null;
  return this;
}

ListStack.prototype.add = function(value){
  this.value = new ListElem(value, this.value);
}

ListStack.prototype.push = ListStack.prototype.add;

ListStack.prototype.remove = function(){
  if (this.value){
    var val = this.value.value;
    this.value = this.value.next;
    return val;
  }
  else {
    if (process.listeners('emptyError').length) process.emit('emptyError', new EmptyError('Stack is empty'));
    else throw new EmptyError('Stack is empty');
  }
}

ListStack.prototype.shift = ListStack.prototype.remove;