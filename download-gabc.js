var https  = require('https'),
    fs     = require('fs'),
    Hypher = require('hypher'),
    gabc   = require('./util.js'),
    prettier = require("@prettier/sync"),
    { addPtAlleluia } = require("./alleluias-in-of-co.js");
require('./gabc-refs.js');

const addAlleluiasTo = new Set([145, 690, 1286, 349, 1303, 391, 523, 426, 84, 529, 1080, 1290, 575, 1272, 147, 1294, 339, 899, 942, 535, 723, 902, 533, 1314, 265, 479, 904, 842, 640, 1072, 1318, 389, 616, 696]);
const addAlleluias = new Set([1319]);

gabcRefs["507&elem=2"] = "Ps 117: 1";
gabcRefs["2060"] = "Ex 15: 1-2";
gabcRefs["2075"] = "Is 5: 1-2";
gabcRefs["2086"] = "Deut 32: 1-4";
gabcRefs["943"] = "Ps 41: 2-4";
gabcRefs["958"] =
gabcRefs["10298"] =
gabcRefs["10358"] = "Ez 47: 2, 9; Ps 117: 1";
gabcRefs["497"] =
gabcRefs["142"] =
gabcRefs["905"] = "Ps 50: 9, 3a";
gabcRefs["374"] = "Gal 6: 14; Ps 66: 2";
gabcRefs["1215"] = "Joann 12; Marc 11";
gabcRefs["1155"] = "Matth 21: 8, 9";
gabcRefs["8107"] = "Joann 11: 47-49, 50, 53";
gabcRefs["8108"] = "Matth 28: 39, 41";
gabcRefs["279"] = "Joan 13: 34; Ps 118: 1";
gabcRefs["649"] = "Joan 13: 4, 5, 15; Ps 47: 2";
gabcRefs["291"] = "Joan 13: 12, 13, 15; Ps 84: 2";
gabcRefs["736"] = "Joan 13: 6-7, 8";
gabcRefs["504"] = "Joan 13: 14; Ps 48: 2";
gabcRefs["1242"] = "Joan 13: 35";
gabcRefs["1252"] = "1 Cor 13: 13";
gabcRefs["8268"] = "Tob 12: 6; Ps 83: 2-3";
gabcRefs["606"] = "Joan. 12";
gabcRefs["1092"] = " ";
gabcRefs["532"] = " ";
gabcRefs["10607"] = "Ps 17: 35-36"
gabcRefs["10604"] = "Matth 11: 28"
const skipFile = {
  'gabc/2209.gabc': true,
  'gabc/2719.gabc': true,
  'gabc/3031.gabc': true,
};
window = {Hypher: Hypher};
Hypher.languages = {};
var latin,
    countAll = 0,
    countWithRef = 0,
    regexGabcGloriaPatri = /\s*[eæ]\([^)]+\)\s*u\([^)]+\)\s*[oó]\([^)]+\)\s*u\.?\([^)]+\)\s*[aá]\(([^)]+)\)\s*e\.?\(([^)]+)\)\s*\(::\)\s*/i,
    texts = {
      Introitus: {},
      Graduale: {},
      Tractus: {},
      Alleluia: {},
      Sequentia: {},
      Offertorium: {},
      Communio: {},
      Antiphona: {},
      Canticum: {},
      Hymnus: {},
      Responsorium: {}
    },
    pages = {},
    modes = [],
    incipits = {},
    url = 'https://gregobase.selapa.net/download.php?format=gabc&elem=1&id=',
    ids = ["259&elem=2","259&elem=3","259&elem=4","259&elem=5","259&elem=6","507&elem=2","2209&elem=1","2209&elem=2","2209&elem=3","2719&elem=1","2719&elem=2","2719&elem=3","2719&elem=4","2719&elem=5","3031&elem=1","3031&elem=2",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,54,55,56,57,58,59,60,61,62,63,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,274,275,276,277,278,279,280,281,282,283,284,285,286,287,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,343,344,345,346,347,348,349,350,351,352,353,354,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,436,437,438,439,440,441,442,443,444,445,446,448,449,450,451,452,453,454,455,456,458,459,460,461,462,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,600,601,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658,659,660,661,662,663,664,665,667,668,669,670,671,672,673,674,675,676,677,678,679,680,682,683,684,685,686,687,688,689,690,691,692,693,695,696,697,698,699,700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750,751,752,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,869,870,871,872,873,874,875,876,877,878,879,880,881,882,883,884,885,886,887,888,889,890,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905,906,907,908,909,910,911,912,913,914,915,916,917,918,919,920,921,922,923,924,925,926,927,928,929,930,931,932,933,934,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,999,1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,1024,1025,1026,1027,1028,1029,1030,1031,1032,1033,1034,1035,1036,1037,1038,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050,1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,1061,1062,1063,1064,1066,1067,1069,1070,1071,1072,1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1093,1094,1095,1096,1097,1098,1099,1100,1101,1102,1103,1104,1105,1106,1107,1108,1109,1110,1111,1112,1113,1114,1115,1116,1117,1118,1119,1120,1121,1122,1123,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1134,1135,1136,1137,1138,1139,1140,1141,1142,1143,1144,1145,1146,1147,1148,1149,1150,1151,1153,1154,1155,1156,1157,1158,1159,1160,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,1184,1185,1186,1187,1188,1189,1190,1191,1192,1193,1194,1195,1196,1197,1198,1199,1200,1201,1202,1203,1204,1205,1206,1207,1208,1209,1210,1211,1212,1213,1214,1215,1216,1217,1218,1219,1220,1221,1222,1223,1224,1225,1226,1228,1229,1230,1231,1232,1233,1234,1235,1236,1237,1238,1239,1240,1241,1242,1243,1244,1245,1246,1247,1248,1249,1250,1251,1252,1253,1254,1255,1256,1257,1258,1259,1260,1261,1262,1263,1264,1265,1266,1267,1268,1269,1270,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1281,1282,1283,1284,1285,1286,1287,1289,1290,1291,1292,1293,1294,1295,1296,1297,1298,1299,1300,1301,1302,1303,1304,1305,1306,1307,1308,1309,1311,1312,1313,1314,1315,1316,1317,1318,1319,1320,1321,1322,1323,1324,1325,1326,1327,1328,1329,1330,1331,1332,1333,1334,1335,1336,1337,1338,1339,1340,1341,1342,1343,1344,1345,1346,1347,1348,1349,1350,1351,1352,1353,1354,1355,1356,1357,1358,1359,1360,1361,1362,1363,1364,1365,1366,1367,1368,1369,1370,1371,1372,1373,1374,1375,1376,1377,1378,1379,1380,1381,1382,1383,1384,1388,1395,1437,1561,1638,1661,2021,2060,2068,2075,2076,2086,2087,2107,2114,2118,2227,2237,2254,2261,2269,2363,2412,2468,2518,2522,2599,2604,2614,2659,2685,2707,2749,2760,2770,2771,2816,2820,2849,2850,2851,2856,2886,2897,2901,2902,2903,2920,2934,2952,2975,2976,2977,2978,2979,2980,2981,2982,2983,2984,2985,2986,2987,2988,2989,2990,2993,3015,3177,3266,3312,3313,3314,3315,3316,3317,3318,7670,7674,7675,7676,7808,7809,7915,7937,7957,7958,7959,7960,7961,7995,7996,7997,7998,8000,8041,8107,8108,8109,8110,8177,8252,8253,8268,8283,8284,8297,10298,10358,10604,10607,10950,12662,19927,19928,19929],
    miscChantIDs = [517,4627,1851,1976,2153,2238,2290,2435,2602,2715,3020,2092,3021,3986,3987,3988,1988,4044,2134,2129,1825,3311,3968,1227,3001,3030,2224,3034,3036,3336,3033,1310,3038,2274,1917,2828,2064,2176,3041,3994,3043,36,2305,2809,2235,2923,2813,53,2120,2456,2441,3352,2826,2299,3334,3960,2719,1830,681,2163,2932,3031,2335,1860,2232,2563,1900,3027,4073,3013,3320,4072,1950,2089,3017,4010,3044,3299,3300,3301,8146,2539,2628,2999,2294,2654,2588,1978,2320,2615,2885,2135,2698,2166,2014,2095,2432,8152,3350,7424,7426,7462,4086,3322,3022,8175,8176,1013,8300,3338,3339,3340,3341,8418,7556,2209,2391,8129,7366,2888,9733,16169,10579,10200,12999],
    oAntiphons = [2169,2596,2203,2877,2371,2133,2483],
    count = ids.length,
    litanyDir = 'gabc/litanies/',
    litanies = fs.readdirSync(litanyDir);
miscChantIDs = miscChantIDs.concat(oAntiphons);
miscChantIDs.forEach(id => {
  if(ids.indexOf(id) >= 0) throw `${id} found in both lists at index ${ids.indexOf(id)}.`;
});
var gabcOf507, gabcOf507_2;
var write507a = () => {
  if(gabcOf507 && gabcOf507_2) {
    // take the psalm from 507-2 and tack it onto 507 and write it as 507a.
    var psalm = "\n<sp>V/</sp>. " + gabcOf507_2.match(/\(c4\)\s*([\s\S]+)/s)[1].replace(/([A-Z])([A-Z]+)(?=[a-z,;:.!?]*\()/,(match,cap,low) => cap+low.toLowerCase());
    gabcOf507 += psalm;
    fs.writeFileSync(path + '507a.gabc',gabcOf507);
  }
}
var write1092 = (gabc) => {
  gabc = gabc.replace(/\([^:)]*::[^:)]*\)\s*1\.?(\s|\(\))[\s\S]*$/, '(::)');
  fs.writeFileSync(path + '1092.gabc', gabc);
};
var write12999 = (gabc) => {
  var regexRubric = /<alt>(Post.*?)<\/alt>(?=\()/;
  var regexAltText = /<alt>(.*?)<\/alt>/g;
  const rubric = regexRubric.exec(gabc)[1];
  gabc = gabc.replace(regexAltText, '');
  const syls = [
    'Pas', 'chá', 'le',
    'quæ',
    'fers',
    'gáu', 'di', 'um:',
  ];
  const altSyls = [
    // TODO?:
    // `<i>${rubric}</i> {I}n`,
    'In ',
    'hac ',
    'tri', 'úm', 'phi',
    'gló', 'ri', 'a: ',
  ];
  const regex = new RegExp(syls.map(s => `(${s})(\\([^)]*\\)\\s*)`).join(''));
  gabc = gabc.replace(regex, (whole, ...args) => args.map((val, i) => 
    // even components are words,
    // odd are parenthetic gabc
    i /2 >= altSyls.length ? '' : (i % 2) ? val : `${val}|${altSyls[i / 2]}`
  ).join(''));

  fs.writeFileSync(path + '12999.gabc', gabc);
}
let gabcParts = {};
let writeGabcPart = (gabc, id, i) => {
  if (i > 1) {
    gabc = gabc.replace(/^[\s\S]+?\(c4\)\s*/, '');
  }
  gabcA = gabcParts[id] = gabcParts[id] || [];
  gabcA[i - 1] = gabc;
  const partCount = gabcA.filter(val => !!val).length;
  const totalPartCount = Object.keys(callbackOn).filter(key => RegExp(`^${id}\\b`).test(key)).length;
  console.info(id, `${partCount} / ${totalPartCount}`);
  if (partCount === totalPartCount) {
    fs.writeFileSync(path + `${id}.gabc`, gabcA.join('\n\n'));
  }
}
var callbackOn = {
  507: gabc => (gabcOf507 = gabc, write507a()),
  "507&elem=2": gabc => (gabcOf507_2 = gabc, write507a()),
  1092: write1092,
  12999: write12999,
  "2209&elem=1": gabc => writeGabcPart(gabc.replace(/\(d\+\)\s*$/, 'Crux fidélis.() (d+) (Z-)'), 2209, 1),
  "2209&elem=2": gabc => writeGabcPart(gabc, 2209, 2),
  "2209&elem=3": gabc => writeGabcPart(gabc, 2209, 3),
  "2719&elem=1": gabc => writeGabcPart(gabc, 2719, 1),
  "2719&elem=2": gabc => writeGabcPart(gabc, 2719, 2),
  "2719&elem=3": gabc => writeGabcPart(gabc, 2719, 3),
  "2719&elem=4": gabc => writeGabcPart(gabc, 2719, 4),
  "2719&elem=5": gabc => writeGabcPart(gabc, 2719, 5),
  "3031&elem=1": gabc => writeGabcPart(gabc, 3031, 1),
  "3031&elem=2": (gabc, header, content) => writeGabcPart(content, 3031, 2),
}
ids = ids.concat(miscChantIDs);
https.get('https://raw.githubusercontent.com/gregorio-project/hyphen-la/gh-pages/patterns/la-hypher.js', result => {
  var file = 'patterns/la-hypher.master.js';
  result.setEncoding('utf8');
  var fileData = '';
  result.on('data',function(data){
    fileData += data;
  });
  result.on('close',function(e) {
    console.info('socket closed on file: ' + file);
  });
  result.on('aborted',function(e) {
    console.info('ABORTED on file: ' + file);
  });
  result.on('error',function(e) {
    console.info('ERROR on file: ' + file);
  });
  result.on('end', () => {
    fs.writeFileSync(file, fileData);
    require('./patterns/la-hypher.js');
    latin = window.Hypher.languages.la_VA;
    callback();
  });
});
var removeAcuteAccents = (word) => (word.replace(/[ǽáéíóúý]|œ́/gi, (v => ({
  "Ǽ": "Æ",
  "Œ́": "Œ",
  "Á": "A",
  "É": "E",
  "Í": "I",
  "Ó": "O",
  "Ú": "U",
  "Ý": "Y",
  "ǽ": "æ",
  "œ́": "œ",
  "á": "a",
  "é": "e",
  "í": "i",
  "ó": "o",
  "ú": "u",
  "ý": "y"
})[v])));
var path = 'gabc/',
    active = 0,
    max = 15,
    i = 0,
    replacements = [],
    sylReplacements = {},
    errors = [],
    timeA = new Date(),
    gabcUrls = litanies.map(l => `<a href='${litanyDir+l}'>litanies/${l}</a>
`).join(''),
    oAntiphonChants = [],
    miscChants = [{name: 'O Antiphons', children: oAntiphonChants}],
    litanies = litanies.sort().reduce((result, l) => {
      var match = l.match(/^([\w-_ ]+)-\d+\.(?:html?|gabc)$/);
      if(match) {
        var id = match[1];
        var map = result[id];
        if(!map) {
          map = result[id] = [];
          var file = fs.readFileSync(litanyDir+l,'utf8');
          var h = gabc.getHeader(file);
          miscChants.push({name: h.name, id:'litany/'+id});
        }
        map.push(l);
      }
      return result;
    }, {});
    function callback(startedWorker) {
        if(active > 0 && startedWorker) --active;
        while(i < ids.length && active < max) {
            ++active;
            gabcUrls += `<a href='gabc/${(ids[i]+'').replace('&elem=','-')}.gabc'>${ids[i]}</a>
`;
            var isMiscChant = i >= count;
            var isOAntiphon = oAntiphons.indexOf(ids[i]) >= 0;
            https.get(url + ids[i],(function(i) {
                return function(result){
                  var file = path + ids[i] + '.gabc';
                  file = file.replace('&elem=','-');
                  result.setEncoding('utf8');
                  var fileData = '';
                  result.on('data',function(data){
                    fileData += data;
                  });
                  result.on('close',function(e) {
                    console.info('socket closed on file: ' + file);
                  });
                  result.on('aborted',function(e) {
                    console.info('ABORTED on file: ' + file);
                  });
                  result.on('error',function(e) {
                    console.info('ERROR on file: ' + file);
                  });
                  result.on('end',function(){
                    var header = fileData.slice(0, fileData.indexOf('\n%%\n') + 4);
                    var content = fileData.slice(header.length);
                    var h = gabc.getHeader(header);
                    var ref = gabcRefs[ids[i]];
                    if(ids[i] in gabcRefs && /^(Introitus|Graduale|Tractus|Alleluia|Offertorium|Communio)$/.test(h.officePart)) {
                      ++countWithRef;
                    }
                    if(ref) {
                      h.commentary = ref;
                      header = h.toString();
                    } else if(!(ids[i] in gabcRefs) && /^(Introitus|Graduale|Tractus|Alleluia|Offertorium|Communio)$/.test(h.officePart)) {
                      header = h.toString();
                    }
                    if(isMiscChant) {
                      h.name = h.name.replace(/A[Ee]/g,'Æ').replace(/ae/g,'æ').replace(/O[Ee]/g,'Œ').replace(/oe/g,'œ').replace(/\.\s+([\divx]+)/i,' $1');
                      header = h.toString();
                      if(isOAntiphon) {
                        content = content.replace(regexGabcGloriaPatri,'');
                        var name = `Dec. ${17 + oAntiphons.indexOf(ids[i])} (${h.name})`;
                        oAntiphonChants.push({name, id: ids[i]});
                      } else {
                        miscChants.push({name: h.name, id: ids[i]});
                      }
                    } else if(/^(Introitus|Graduale|Tractus|Alleluia|Offertorium|Communio)$/.test(h.officePart)) {
                      ++countAll;
                    }
                    if(h.book) {
                      var m, regex = /(?:^|\s&\s+)Graduale Romanum, 1961, p. (\S*)/g;
                      while((m = regex.exec(h.book))) {
                        var page = pages[m[1]] = (pages[m[1]] || []);
                        page.push(ids[i]);
                        page.sort();
                      }
                    }
                    if(h.mode && (typeof ids[i] == 'number')) {
                      var m = /^\s*(\d+)/.exec(h.mode);
                      if(m) {
                        var mode = modes[m[1]] = (modes[m[1]] || []);
                        mode.push(ids[i]);
                      }
                    }
                    content = content
                      .replace(/@/g,'!') // TODO: support @ in Exsurge
                      .replace(/\[[uo](?:h|ll)(?::[^\]]*|})?\]/g, '') // TODO: support in Exsurge
                      .replace(/<\/?nlba>/g, '') // TODO: support in Exsurge
                      .replace(/(<\/?)e>/g, '$1i>') // TODO: support in Exsurge
                      .replace(/<clear>/g, '') // TODO: what does this even do in Exsurge?
                      .replace(/\*{2,}/g,'<c>$&</c>')
                      .replace(/<i>\s+/g,'<i>')
                      .replace(/\s+<\/i>/g,'</i>')
                      .replace(/^([^)]*\)?\s*[A-Z]*)(<sc>.*?\)\s)/, (_, start, firstWord) =>
                        // get rid of small caps in initial word
                        start + firstWord.replace(/<sc>([\wáéíóúæœǽœ́ýÁÉÍÓÚÆŒǼŒ́Ý]+)<\/sc>/g, '$1')
                      )
                      .replace(/([^)])\s+\*(\([a-m][^)]*\))/,"$1 <c>*</c>$2") // asterisks being kept with the previous word
                      .replace(/\)\s+\*(?=\([a-m])/,") *() ") // asterisks being under the melody
                      .replace(/\)\(([,;])\)\(/g,'$1')
                      .replace(/A[éÉ]/g,'Ǽ')
                      .replace(/<b><\/b>/g,'')
                      .replace(/<v>\\greheightstar<\/v>/g,'*')
                      .replace(/<sp>'(?:ae|æ)<\/sp>|aé/g,'ǽ')
                      .replace(/<sp>'(?:oe|œ)<\/sp>|oé/g,'œ́')
                      .replace(/<sp>ae<\/sp>/g,'æ')
                      .replace(/<sp>oe<\/sp>/g,'œ')
                      .replace(/\s*((?:<sp>v\/<\/sp>\.?\s*)?\d+\.)\(\)\s*/gi,' $1 ')
                      .replace(/\s*(<sp>v\/<\/sp>\.?|<i>Ps.<\/i>|(?:<sp>v\/<\/sp>\.?\s*)?\d+\.)(\((?:z0|[a-m]\+)?::(z|[cf][1-4])?\))\s*/gi,' $2\n$1 ')
                      .replace(/\s*(<sp>[vra]\/<\/sp>\.?\s*)\(\)\s*/gi,' $1 ')
                      .replace(/\s*(<sp>[vra]\/<\/sp>\.?\s*)(\((?:z0|[a-m]\+)?::(z|[cf][1-4])?\))\s*/gi,' $2\n$1 ')
                      .replace(/(\w)(\([^)]+\)\s+):/g,'$1:$2')
                      .replace(/[/ ]+\)/g,')')
                      .replace(/!\//g,'/')
                      .replace(/<v>\$\\guillemotright\$<\/v>/g,'»')
                      .replace(/<v>\$\\guillemotleft\$<\/v>/g,'«')
                      .replace(/<v>\s*\\kern[^<]*<\/v>/g,'')
                      .replace(/\s+([»’”"':;!?.,]+)\s*([(<])/g,'$1$2')
                      .replace(/([«‘“"']+)\s+(?=[a-zæœǽǽœ́áéíóúýäëïöüÿ])/gi,'$1')
                      .replace(/(\((?:z0|[a-m]\+)?:+(z|[cf][1-4])?\))\s+/gi,'$1\n')
                      .replace(/\/+([a-m]w)/g,'!$1') // don't put space before a quilisma
                      .replace(/\s+$/,'')
                      .replace(/\+(?=[^()]*\()/g,'†')
                      .replace(/(\S)(\([a-m]\+[^)]*\))/g,'$1() $2') // put any lyrics after a manual custos
                      .replace(/(\s+)(\([a-m]\+[^)]*\))\s+([^(\s][^(]*\(\))/g,'$1$3 $2') // put any lyrics after a manual custos
                      // some gregobase chants are encoded this way (two underscores for three note episema), and in Gregorio and Exsurge, this does not work as desired.
                      .replace(/(a'?b'?a|[a-b]'?c'?[a-b]|[a-c]'?d'?[a-c]|[a-d]'?e'?[a-d]|[a-e]'?f'?[a-e]|[a-f]'?g'?[a-f]|[a-g]'?h'?[a-g]|[a-h]'?i'?[a-h]|[a-i]'?j'?[a-i]|[a-j]'?k'?[a-j]|[a-k]'?l'?[a-k]|[a-l]'?m'?[a-l])[.']*__(?!_)/g,'$&_')
                      .replace(/ae/g,'æ').replace(/oe/g,'œ').replace(/aé/g,'ǽ').replace(/A[Ee]/g,'Æ').replace(/O[Ee]/g,'Œ')
                      .replace(/!\//g,'/') // some gregobase chants are encoded this way for some reason
                      .replace(/(\w)(\s+)([^()|a-z†*]+(<\/?\w+>)*\([^)]*\))/gi,'$1$3$2') // change things like "et :(gabc)" to "et:(gabc) "
                      .replace(/(\s[^()\w†*,;:]+) +(\w+[^\(\s]*\()/g,'$1$2') // change things like "« hoc" to "«hoc"
                      .replace(/\s*\n\s*/g,'\n')
                      .replace(/\s{2,}/g,' ')
                      .replace(/<i>\((.*?)\)<\/i>/g, '<i>$1</i>') // these parenthetical italicised notes are rubrics, found in 635 and 1236.gabc
                      .replace(/\)\s*<i>(?:<v>[()]<\/v>|[^()])+\(\)$/,')') // get rid of things like  <i>at Mass only.</i><v>)</v>() that come at the very end.  This is only in 30.gabc and 308.gabc
                      .replace(/\s\*(\([,;:]*\)\s)?[\s{}]*<i>\{?(ij\.|non\s+rep[eé]titur\.?)\}?<\/i>([\s{}]*)\(/gi,' {*}~<i>$2</i>$1(')
                      .replace(/<i>(i+j)\.?<\/i>\(:/g,'<i>$1.</i>() (:')
                      .replace(/\(\s+(?:\)\s*\()?(Z)\)/g, '() (Z)')
                      .replace(/(\s)(\([`,;:]*\))(\s*)(\{?\*+\}?(?:\s*<i>[^<]*<\/i>)?)(?:(\()|\s+)/g, '$1$4$2\n$5'); /// TODO: this should be removed and fixed in Exsurge (pushing * back to before the last bar)
                    if(ids[i] == 8152) {
                      content = content.replace("Lu(f)do(h)ví(hiH'F)co.(f.)",`Lu|Sté|Jo(f)do||(h)ví|pha|sé|Pe(hiH'F)co.|no. |pho. |tro. (f.)`);
                    }
                    var text = [];
                    var checkTextRepeat = 0;
                    content = content.replace(/<(?:i|sp)>(Ps|V\/|Cant)\.?<\/(?:i|sp)>\.?|((?:~+(?:<c>)?\*+(?:<\/c>)?|[a-zæœǽǽœ́áéíóúýäëïöüÿ|{}*<>\/]+)([,.;:!?*+†\s»"'‘’“”]*(?:<\/eu>)?(\([^)]*\))+))+/gi, function(whole, psalmMark, lastSyl, toIgnore, lastParens, index, content){
                      // figure out syllabification...
                      // 1. build word
                      // 2. syllabify
                      // 3. verify same number of syllables
                      // 4. verify that each syllable has at least one vowel.
                      // replace...
                      if(psalmMark) text.push("℣");
                      if(whole.match(/<i>|\|/)) return whole;
                      // ignore any words that have nothing in their parentheses or start with a space:
                      if(whole == lastSyl && /^\(([Zz\s)]|[a-g]\+)/.test(lastParens)) {
                        return whole;
                      }
                      var regex = /((?:<sp>'?(?:[ao]e|æ|œ)<\/sp>|[a-zæœǽœ́áéíóúýäëïöüÿ{}])+)(?=[,.;:!?*+†\s»"'‘’“”]*(?:<\/?eu>)?\([^)]+\))/gi;
                      var match,
                          syls = [];
                      while(match = regex.exec(whole)) {
                        let match1 = match[1] || '';
                        var braces = match1.match(/[{}]/g) || [];
                        if(braces.length % 2 === 0) match1 = match1.replace(/[{}]/g,'');
                        let syl = match1.replace(/(<sp>)?ae(<\/sp>)?/,'æ').replace(/aé|<sp>'(ae|æ)<\/sp>/,'ǽ').replace(/A[Ee]/,'Æ').replace(/(<sp>'?)?o[eé](<\/sp>)?/,'œ').replace(/O[Ee]/,'Œ');
                        syls.push(syl);
                      }
                      var word = syls.join('');
                      // ignore any words that have no syllables:
                      if(/^[^a-zæœǽœ́áéíóúýäëïöüÿ]*$/i.test(word)) return whole;
                      var accents = whole.match(/[áéíóú]|ǽ|œ́|ý/g);
                      if(accents && accents.length > 1) throw ids[i] + ":" + ids[i] + ": " + whole;
                      if(!/^(allel[uú]ia|[eé]ia)$/i.test(word.toLowerCase())) {
                        syls = syls.map(s => s.replace(/(?:(I)|i)(?=[AEIOUYÆŒǼÁÉÍÓÚÝÄËÏÖÜŸaeiouyæœǽœ́áéíóúýäëïöüÿ])/, (all,i) => (i? 'J' : 'j')));
                        if(word != syls.join('')) {
                          console.info(word, file);
                          errors.push(file + ': ' + word + '; replaced with ' + JSON.stringify(syls));
                        }
                        word = syls.join('');
                      }
                      if(word) text.push(removeAcuteAccents(word.toLowerCase()));
                      if(checkTextRepeat == text.length) {
                        if(text.slice(0,text.length / 2).join(' ') == text.slice(text.length / 2).join(' ')) {
                          text = text.slice(0, text.length / 2);
                        }
                        checkTextRepeat = Infinity;
                      } else if(text.length > 4 && !checkTextRepeat && text[0] == text.slice(-1)[0]) {
                        checkTextRepeat = 2 * (text.length - 1);
                      }
                      var accentCount = (word.match(/[ǽ́áéíóúý]|œ́/gi)||[]).length;
                      var vowelCount = (word.match(/[aá]u|(qu|ngu)?[aeiouyæœǽáéíóúýäëïöüÿ]/gi)||[]).length;
                      var vowelCountIJ  = (word.match(/[aá]u|(i|qu|ngu)?[aeiouyæœǽáéíóúýäëïöüÿ]/gi)||[]).length;
                      if(vowelCount !== syls.length && vowelCountIJ !== syls.length) {
                        console.warn(word, vowelCount, vowelCountIJ, "!=", syls.length, syls);
                        console.info({lastParens, whole, lastSyl, file});
                        if(!/^(c[uú]i|euge|ceu|Allelúia)$/i.test(word)) throw 1;
                      }
                      if(syls.length && syls.slice(-1)[0].match(/[ǽœ́áéíóúý](?![aeiouyæœǽœ́áéíóúýäëïöüÿ])/)) {
                        console.error(word, 'accent on final syllable', file, content.slice(index, index + 100));
                        throw 1;
                      }
                      if(accentCount && vowelCount === 2) {
                        word = removeAcuteAccents(word);
                      }
                      if(syls.length > 2 && (syls.slice(-3,-1).join('').match(/[ǽ́áéíóúýæœǼ́ÁÉÍÓÚÝÆŒAEIOUY]|œ́|Œ́/gi) || []).length == 0) {
                        throw `strangely accented: ${word} (${syls.join('~')})`;
                      }
                      var otherSyls = latin.hyphenate(word);
                      if(otherSyls.length != syls.length ||
                         (otherSyls.length > 0 && otherSyls[0].length > 0 && !otherSyls.every(syl => syl.match(/[æœǽœ́aeiouyáéíóúýäëïöüÿ]/i)))) {
                        if(syls.length && (syls.length > 1 || syls[0] != '}')) {
                          console.error(file, syls, otherSyls);
                          errors.push(file + ': ' + JSON.stringify(syls) + '::' + JSON.stringify(otherSyls));
                        }
                        return whole;
                      } else {
                        var key = syls.join('-').toLowerCase(),
                            val = otherSyls.join('-').toLowerCase();
                        if(key != val) sylReplacements[key] = val;
                        var i = 0;
                        //return whole; // don't actually perform the replacement for now
                        return whole.replace(regex, function(match, first){
                          return otherSyls[i++];
                        });
                      }
                    });
                    if(Object.keys(texts).includes(h.officePart)) {
                      var id = ids[i];
                      var match = id.match && id.match(/^(\d+)&elem=(\d+)$/);
                      if(match) {
                        id = match[1];
                      }
                      var current = texts[h.officePart][id];
                      if(current && !match) {
                        match = [0, id, 1];
                      }
                      var text = text.join(' ').replace(/gloria patri (e u o u a(?: e)?|(?:et filio et spiritui sancto sicut erat in principio et nunc et semper et in sæcula )?sæculorum amen)$/,"gloria patri");
                      if(h.officePart == 'Alleluia') {
                        if(current) {
                          if(!(current instanceof Array)) {
                            current = [current];
                          }
                          current[match[2]-1] = text;
                          text = current.join(' ');
                          match = null;
                        }
                        text = text.replace(/^alleluia (℣ )?/,'');
                      }
                      texts[h.officePart] = texts[h.officePart] || {};
                      if(match) {
                        if(!current) {
                          texts[h.officePart][id] = current = [];
                        } else if(!(current instanceof Array)) {
                          texts[h.officePart][id] = current = [current];
                        }
                        current[match[2]-1] = text;
                      } else {
                        texts[h.officePart][ids[i]] = text;
                      }
                    }
                    //content = content.replace(/ae/g,'æ').replace(/oe/g,'œ').replace(/aé/g,'ǽ').replace(/AE/,'Æ').replace(/OE/,'Œ');
                    content = content.replace(/^(\s*\([cf]b?[1-4]\)\s*([A-ZŒÆÁÉÍÓÚÝǼ]{3}[:,;!.]?\([^)]*\)\s+|[A-ZŒÆÁÉÍÓÚÝǼ]{2}(?:\([^)]*\))?|[A-ZŒÆÁÉÍÓÚÝǼ]\([^)]*\)))((?:[A-ZŒÆÁÉÍÓÚÝǼ]+[\.,;:]?\([^)]*\))*)/,
                      function(match,beginning,context,replacePart) {
                        var replacement = replacePart.replace(/([A-ZŒÆÁÉÍÓÚÝǼ]+[\.,;:]?)(\([^)]*\))/g, function(whole, lyric, gabc) {
                          return lyric.toLowerCase() + gabc;
                        });
                        if(replacePart) {
                          replacements.push(context + replacePart + '\n' + context + replacement);
                          console.info(file + ':\n' + context + replacePart + '\n' + context + replacement);
                        }
                        return beginning + replacement;
                      });
                    content = content.replace(/^(\s*\([cf]b?[1-4]\)\s*[A-ZŒÆÁÉÍÓÚÝǼ])([A-ZŒÆÁÉÍÓÚÝǼa-zœæáéíóúýǽ]([a-zœæáéíóúýǽ](?=\([^)]*\)\s+))?)/,
                      function(match, beginning, replacePart){
                        return beginning + replacePart.toUpperCase();
                      });
                    if (addAlleluiasTo.has(Number(ids[i]))) {
                      content = addPtAlleluia(content, h);
                    }
                    if (!(file in skipFile)) {
                      fs.writeFileSync(file,header + content);
                    }
                    if (addAlleluias.has(Number(ids[i]))) {
                      const alContent = addPtAlleluia(content, h);
                      fs.writeFileSync(file.slice(0,-5) + '+al.gabc', header + alContent);
                    }
                    console.info(`Processed ${(i+1)} of ${ids.length}: ${file}; ${active} active`);
                    var myCallback = callbackOn[ids[i]];
                    if(myCallback) myCallback(header + content, header, content);
                    callback(true);
                  });
                }
            })(i));
            ++i;
        }
        if(active === 0 && i == ids.length) {

// process incipits:
function areWordsSubstantiallySimilar(a,b) {
  if(!a || !b) return 0;
  if(a == b) return 1;
  var i = Math.min(a.length, b.length) - 1;
  while(i > 0) {
    if(a.slice(0, i) == b.slice(0, i)) break;
    --i;
  }
  // return true if the word with the greatest number of different characters <= 4
  return i / Math.max(a.length, b.length);
}
function collectTextsWithThisWord(word, i, wordsList) {
  var endI = i;
  while(++endI < wordsList.length) {
    if(wordsList[endI][0] != word) break;
  }
  var result = wordsList.slice(i, endI);
  // count number of matching words:
  var maxSimilarity;
  if(result.length > 1) {
    i = 1;
    while(true) {
      var words = result.map(words => words[i]);
      word = words.pop();
      if(words.length == 0 || !words.every(w => w == word)) break;
      ++i;
    }
    word = result[0].slice(0, i).join(' ');
  } else {
    maxSimilarity = Math.max(...wordsList.slice(0,i).concat(wordsList.slice(endI)).map(words => words[0]).map(w => areWordsSubstantiallySimilar(w, word)));
    i = 1;
  }
  result = result.map(words => words.slice(i));
  if(maxSimilarity) result.maxSimilarity = maxSimilarity;
  result.word = word;
  return result;
}
function makeTextTree(wordsList, textMap, prefix = "") {
  var result = {};
  for(var i = 0; i < wordsList.length; ++i) {
    var textWords = wordsList[i];
    var word = textWords[0];
    var matching = collectTextsWithThisWord(word, i, wordsList);
    word = matching.word || "";
    if(matching.length > 1) {
      result[word] = makeTextTree(matching, textMap, (prefix + " " + word).trim());
    } else {
      var subResult = result;
      while(((
              !prefix &&
              word.replace(/\s+/g,'').length < 5    // this is for more human readable incipits to avoid "in", etc. even when unambiguous
            ) || (
              matching.maxSimilarity >= 0.8
            )) &&
            matching[0].length
      ) {
        word += " " + matching[0].shift();
        matching.maxSimilarity = 0;
      }
      var text = (prefix + " " + word + " " + matching[0].join(' ')).trim();
      result[word] = textMap[text];
    }
    i += matching.length - 1;
  }
  return result;
}
Object.keys(texts).forEach(key => {
  var map = texts[key];
  var textMap = {};
  for(k in map) {
    var text = map[k];
    if(text.join) text = text.join(' ');
    textMap[text] = parseInt(k);
  }
  var wordsList = Object.keys(textMap).sort().map(t => t.split(/\s+/));
  incipits[key] = makeTextTree(wordsList, textMap);
});


// sort pages:
var tmp = {};
var regex = /^(\[)?(\d+)([a-z]*)(\**)\]?$/i;
var sectionBasedOnMatch = m => (m[1]? 0 : (m[4].length || -1));
Object.keys(pages).sort((a,b) => {
  var mA = regex.exec(a);
  var mB = regex.exec(b);
  if(mA[1] == mB[1] && mA[4]==mB[4]) {
    return (mA[2] - mB[2]) || (mA[3]||"").localeCompare(mB[3]||"");
  }
  // order: numbers, bracketed, *, **
  return sectionBasedOnMatch(mA) - sectionBasedOnMatch(mB);
}).forEach(key => {
  tmp[key] = pages[key];
});
pages = tmp;

modes.forEach(m => m.sort && m.sort((a,b) => a-b));

          var time = (new Date() - timeA) / 1000;
          var sortByName = (a,b) => (a.name||'').localeCompare(b.name);
          miscChants.sort(sortByName).forEach(chant => chant.children && chant.children.sort(sortByName));
          fs.writeFileSync('gabc-files.html', gabcUrls);

          fs.writeFileSync('miscChants.js', prettier.format(`litanyMap=${JSON.stringify(litanies)};
miscChants=${JSON.stringify(miscChants)}`, { parser: 'typescript' }));
          fs.writeFileSync('texts.js', `texts = ${JSON.stringify(texts,null, '\t')};`);
          fs.writeFileSync('incipits.js', `pages = ${JSON.stringify(pages)};
modes = ${JSON.stringify(modes)};
incipits = ${JSON.stringify(incipits,null, '\t')};
var module;
if(module && module.exports) {
  module.exports.incipits = incipits;
  module.exports.pages = pages;
  module.exports.models = modes;
}
`);
          console.info('Finished in ' + time + ' seconds!');
          console.info(`${countWithRef} / ${countAll} have reference.  (${Math.round(100 * countWithRef / countAll)}%)`);
          // console.info(replacements.join('\n\n'));
          console.info(errors.join('\n'));
          //console.info(JSON.stringify(sylReplacements, null, 2));
        }
    };