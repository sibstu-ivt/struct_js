function EmptyError(message){
  this.message = message; 
  Error.captureStackTrace(this, EmptyError);
  return this;
}

(require('util')).inherits(EmptyError, Error);

EmptyError.prototype.name = 'EmptyError';



 process.on('emptyError', function(err){
   console.error('Don\'t tuch this queue!', err);
 });

function Queue (){
  this.head = null;
  this.last = null;
  return this;
}

function QueueElement (value){
  this.value = value;
  this.next = null;
  return this;
}

QueueElement.prototype.getValue = function(){
  return this.value;
}

QueueElement.prototype.getNext = function(){
  return this.next;
}

QueueElement.prototype.setNext = function(link){
  this.next = link;
}

Queue.prototype.isEmpty = function(){
  if (this.head == null) return true;
  return false;
}

Queue.prototype.print = function(){
  var cur = this.head;
  console.log('*********');
  for (var i = 0; cur; i++){
    console.log(i, cur.getValue());
    var next = cur.getNext();
    if (next) cur = next;
    else break;
  }
  console.log('*********\n\n');
}

Queue.prototype.add = function(value){
  if (this.head) {
    var cur = this.head;
    for (var i = 0; ; i++){
      var next = cur.getNext();
      if (next) cur = next;
      else break;
    }
    var elem = new QueueElement(value);
    cur.setNext(elem);
    this.last = elem;
  }
  else this.last = this.head = this.elem = new QueueElement(value);
  
  
}

Queue.prototype.push = Queue.prototype.add;

Queue.prototype.remove = function(){
  if (this.head){
    var val = this.head.getValue();
    this.head = this.head.getNext();
    if (this.head == null) this.last = null;
    return val;
  }
  else {
    if (process.listeners('emptyError').length) process.emit('emptyError', new EmptyError('Queue is empty'));
    else throw new EmptyError('Queue is empty');
  }
}

Queue.prototype.shift = Queue.prototype.remove;



var queue = new Queue();

for (var i = 0; i < 5; i++){
    queue.add(i);
    console.log('Curent:');
    queue.print();
}

for (var i = 0; i < 6; i++){
//  queue.print();
//  console.log(queue.head, queue.last);
//  try{
    var e = queue.remove();
//  }
//  catch(e){
//    console.error(e);
//  }
  if (e != null) console.log('remove %s', e);
  
}

console.log('\nсurrent:');
queue.print();

