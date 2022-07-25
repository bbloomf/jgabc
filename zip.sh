#!/bin/bash
# uglifyjs jgabc.full.js -cmo jgabc.js
rm web-app-jgabc.zip
zip -9 web-app-jgabc.zip icon/* psalms/* fonts/* css/smoothness/* css/smoothness/images/* gabc/* patterns/* jquery-ui-1.10.3.custom.min.js jgabc.js jgabc.full.js jquery.min.js jquery.autosize-min.js moment.min.js moment.easter.js manifest.json readings.html readings.js psalmtone.html psalmtone.html.js psalmtone.js transcriber.html transcriber.html.js style.css faq.html sink.js audiolet.js jszip.js jszip-deflate.js versiculum.ttf propers.js propersdata.js propersdatanovus.js ordinarydata.js propers.html jquery.hypher.js FileSaver.min.js exsurge.min.js util.js propers.css js/tones.js css/bootstrap.min.css js/Tone.min.js lectiones.js miscChants.js verseRef.js incipits.js saveSvgAsPng.js
open -R web-app-jgabc.zip