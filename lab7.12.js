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

var string = '(5*(3+8))';

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
  else if (string.match(/\d*[\*\-\+]\d*/)) {
    tree.setRoot(string.match(/[\*\-\+]/)[0]);
    tree.setLLeaf(stringToTree(string.match(/^\d*/)[0]));
    tree.setRLeaf(stringToTree(string.match(/\d*$/)[0]));
  }
  else if (string.match(/^\d+$/)){
    tree.setRoot(string);
  }
  else console.error('can\'t resolve');
  return tree;
}

var tree = stringToTree(string);
console.log(tree);

var doing = function(what, left, right){
  if (what == '*') return left * right;
  if (what == '+') return left + right;
  if (what == '-') return left - right;
  throw Error('Undefined doing '+what+'.');
}

function calcTree(t){
  var root = t.getRoot();
  if (root.match(/\d+/)) return Number(root);
  return doing(root, calcTree(t.getLLeaf()), calcTree(t.getRLeaf()));
}

console.log('Calculate:', calcTree(tree));
console.log('Eval:', eval(string));