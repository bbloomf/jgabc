var items = document.getElementsByTagName('li');
var regexParenthetic = /\(([^)]+)\)$/;
var regexID = /^http:\/\/gregobase\.selapa\.net\/chant\.php\?id=(\d+)$/i;
var introitus = {};

for(i=4;i<items.length;++i){
  var a = items[i].getElementsByTagName('a')[0];
  if(!a) continue;
  var parenthetic = regexParenthetic.exec(items[i].innerText);
  if(parenthetic) parenthetic = parenthetic[1];
  var id = a.innerText.toLowerCase();
  var psalmSplit = id.split(/\.*\s+ps\.\s+/);
  id = psalmSplit[0];
  var psalm = psalmSplit[1];
  var newObject = {
    incipit:a.innerText,
    parenthetic:parenthetic,
    id:regexID.exec(a.href)[1]
  };
  var bucket = introitus[id];
  if(bucket) {
    if(psalm) {
      if(bucket.psalm) bucket = bucket.psalm;
      else bucket = bucket.psalm = {};
      bucket[psalm] = newObject;
    } else {
      if(bucket.parenthetic) {
        introitus[id] = {};
        introitus[id][bucket.parenthetic] = bucket;
        bucket = introitus[id];
      }
      bucket[parenthetic] = newObject;
    }
  } else {
    if(psalm) {
      var temp = {psalm: {}};
      temp.psalm[psalm] = newObject;
      newObject = temp;
    }
    introitus[id] = newObject;
  }
}