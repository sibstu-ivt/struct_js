function Tree (root, lLeaf, rLeaf){
  this.root = root || null;
  this.lLeaf = lLeaf || null;
  this.rLeaf = rLeaf || null;
  return this;
}

Tree.prototype.getRoot = function(){
  return this.root;
}

Tree.prototype.setRoot = function(root){
  this.root = root;
}

Tree.prototype.getLLeaf = function(){
  return this.lLeaf;
}

Tree.prototype.setLLeaf = function(link){
  this.lLeaf = link;
}

Tree.prototype.getRLeaf = function(){
  return this.rLeaf;
}

Tree.prototype.setRLeaf = function(link){
  this.rLeaf = link;
}

Tree.prototype.toString = function(){
  if (this.lLeaf == null) {
    return this.root;
  }
  else return '('+this.lLeaf.toString()+this.root+this.rLeaf.toString()+')';
}

var string = '(((b*a)-(c*0))-(((a+1)+(a-0))*((a+0)+8)))';

function stringToTree(string){
  string = string.replace(/ /g, '');
  string = string.replace(/^\((.*)?\)$/, function(all, found){
    return found;
  });
  var tree = new Tree();
  console.log(string);
  if (string.match(/\(.*\)/)) {
    var count = 0;
    for (var i = 0; i < string.length; i++){
      if (string[i] == '(') count++;
      if (string[i] == ')') count--;
      if (count == 0) {
	if (string[i] == '*' || string[i] == '+' || string[i] == '-') {
	  tree.setRoot(string[i]);
	  tree.setLLeaf(stringToTree(string.slice(0,i)));
	  tree.setRLeaf(stringToTree(string.slice(i+1)));
	}
      }
    }
  }
  else if (string.match(/[\d\w]+[\*\-\+][\w\d]+/)) {
    tree.setRoot(string.match(/[\*\-\+]/)[0]);
    tree.setLLeaf(stringToTree(string.match(/^[\d\w]+/)[0]));
    tree.setRLeaf(stringToTree(string.match(/[\d\w]+$/)[0]));
  }
  else if (string.match(/^\d+$/)){
    tree.setRoot(string);
  }
  else if (string.match(/^\w+$/)){
    tree.setRoot(string);
  }
  else console.error('can\'t resolve');
  return tree;
}

var tree = stringToTree(string);

var doing = function(what, left, right){
  if (what == '*') return left * right;
  if (what == '+') return left + right;
  if (what == '-') return left - right;
  throw Error('Undefined doing '+what+'.');
}

function minTree(t){
  var root = t.getRoot();
  if (root.match(/\d+/)) return t;
  if (root.match(/\w+/)) return t;
  if (root == '+' || root == '-' || root == '*') {
    var left = minTree(t.getLLeaf());
    t.setLLeaf(left);
    var right = minTree(t.getRLeaf());
    t.setRLeaf(right);
    if (right && left) {
    var leftR = left.getRoot();
    var rightR = right.getRoot();
    if (rightR == '0') {
      if (root == '+' || root == '-') {
	if (leftR.match(/[\+\/\*]/)) t = t.getLLeaf();
        else {
	  t.setRoot(leftR);
	  t.setLLeaf(null);
	  t.setRLeaf(null);
	}
	return t;
      }
      if (root == '*') {
        t.setLLeaf(null);
        t.setRLeaf(null);
        t.setRoot('0');
	return t;
      }
    }
    if (leftR == '0'){
      if (root == '+') {
	if (rightR.match(/[\+\/\*]/)) t = t.getRLeaf();
        else {
	  t.setRoot(rightR);
	  t.setLLeaf(null);
          t.setRLeaf(null);
	}
	return t;
      }
      if (root == '*') {
        t.setLLeaf(null);
        t.setRLeaf(null);
        t.setRoot('0');
        return t;
      }
    }
    if (rightR.match(/\d+/) && leftR.match(/\d+/)) return doing(root, Number(leftR), Number(rightR));
    return t;
  }
  throw Error('Some doing without values');
  }
}
console.log(string);
//console.log('Calculate:', minTree(tree));
console.log('String:', minTree(tree).toString());
