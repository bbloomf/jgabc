#!/bin/bash
uglifyjs jgabc.full.js -cmo jgabc.js
rm web-app-jgabc.zip
zip -9 web-app-jgabc.zip icon/* psalms/* css/smoothness/* gabc/* jquery-ui-1.10.3.custom.min.js cache.manifest caeciliae-staffless-webfont.ttf caeciliae-staffless-print.ttf jgabc.js jquery.min.js jquery.autosize-min.js manifest.json OFLGoudyStMTT.ttf OFLGoudyStMTT-Italic.ttf readings.html readings.js psalmtone.html psalmtone.html.js psalmtone.js transcriber.html transcriber.html.js style.css faq.html sink.js audiolet.js jszip.js versiculum.ttf propers.js propersData.js propersdatanovus.js propers.html