var main={};
var files = fs.readdirSync('Latin/tempora-2');
q = function(){
  for(f in files){
    if(files[f].match(/-0\.txt$/)){
      var code = files[f].slice(0,-6);
      var name = table[code];
      data = fs.readFileSync('Latin/tempora-2/' + files[f],{encoding:'UTF8'});
      if(!name) console.info(code);
      var temp = {};
      var introitus = /\[Introitus\]((?:\r?\n[^\r\n]+)*)\r?\n\r?\n/.exec(data);
      var graduale = /\[Graduale\]((?:\r?\n[^\r\n]+)*)\r?\n\r?\n/.exec(data);
      var offertorium = /\[Offertorium\]((?:\r?\n[^\r\n]+)*)\r?\n\r?\n/.exec(data);
      var communio = /\[Communio\]((?:\r?\n[^\r\n]+)*)\r?\n\r?\n/.exec(data);
      if(introitus) temp['introitus'] = introitus[1].trimLeft();
      if(graduale) temp['graduale'] = graduale[1].trimLeft();
      if(offertorium) temp['offertorium'] = offertorium[1].trimLeft();
      if(communio) temp['communio'] = communio[1].trimLeft();
      main[code] = temp;
    }
  }
};
q()