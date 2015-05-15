(require('fs')).readFile('fileName', {encoding: 'utf-8'}, function(err, data){
  if (err) {
    console.error('Can\'t open file');
   // process.exit(1);
  }
  data = 'p(8, s(p(1,2),s(6,4)))';
  function s (a,b) {return (a+b)%10};
  function p (a,b) {return (a*b)%10};
  
  console.log('eval', eval(data)); //грязный хак
  var a = Function('p', 's', 'return '+data);
  console.log('Function', a(p, s)); //считается нормой
  
  
  var switcher = {'s':s, 'p':p};
  
  function evalString (string, repated){
    if (string.match(/^\d*$/)) return Number(string);
    if (!repeated) string = string.replace(/ /g,'').toLowerCase();
    string = string.replace(/\w\(\d*,\d*\)/g, function(str){
      return switcher[str[0]](Number(str.slice(2,str.indexOf(','))), Number(str.slice(str.indexOf(',')+1, -1)));
    });
    return evalString(string, true);
  }
  
  console.log('replacer', evalString(data));
});