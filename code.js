//VELA

var turns = 2;
var angle = turns * 2 * PI;
var radius_max = 16;
var radius_min = 1;
var height = 15;
var domain2 = DOMAIN([[0, angle], [radius_min, radius_max]])([120, 4])
var mapping = function (p) {
  var a = p[0];
  var r = p[1] * (1 + a / angle);
  var h = height - (a / angle * height);
  return [r * COS(a), r * SIN(a), h];
};
var vela = MAP(mapping)(domain2);

var posVela = T([2])([22])(vela)

DRAW(COLOR([1,1,1])(posVela));

//Base centrale

var b = CYL_SURFACE([16,1])([100,1])
var angolo = 2 * PI;
var raggio = 16;
var domain3 = DOMAIN([[0, angolo], [0, raggio]])([120, 4])

var mapping3 = function (p) {
  var a = p[0];
  var r = p[1];
  return [r * COS(a), r * SIN(a),0];
};
var d = MAP(mapping3)(domain3);

var dPos = T([2])([1])(d)


//Per un bug di plasm.js non si possono inserire nella struct 2 disk
var base1 = STRUCT([b,dPos]) 

//DRAW(base1)

//Base esterna

var b2 = CYL_SURFACE([20,0.5])([100,1])
var raggio = 20;
var domain3 = DOMAIN([[0, angolo], [0, raggio]])([120, 4])

var mapping3 = function (p) {
  var a = p[0];
  var r = p[1];
  return [r * COS(a), r * SIN(a),0];
};
var d3 = MAP(mapping3)(domain3);

var d4 = T([2])([0.5])(d3)

var base2 = STRUCT([b2,d3,d4])


var base = STRUCT([base1,base2])

//DRAW(base)



//box interno
var box = T([0,1,2])([-2.5,-2.5,1])(CUBOID([5,5,5]))
DRAW(box)


//Pilone

var p = CYL_SURFACE([1,32])([100,1])
var posPil = T([2])([6])(p)
//DRAW(posPil)



//Punta pilone
var angolo = 2 * PI;
var raggio = 0.5; 
var altezza = 2; 
var domain3 = DOMAIN([[0, angolo], [0, raggio], [0, altezza]])([30, 4, 4]); 
var mapping3 = function (p) { 
  var a = p[0];  
  var r = p[1];  
  var z = p[2]; 
  return [z * r * COS(a), z * r * SIN(a), altezza - z]; 
}; 
var tappo = MAP(mapping3)(domain3); 

var posTappo = T([2])([38])(tappo)
 
var pilone = STRUCT([posPil, posTappo])

//DRAW(pilone)




//aste

var supAsta = T([2])([1])(CYL_SURFACE([0.5, 6])([100,1]))

//Circonferenza per il tappo, non è possibile usare DISK per il bug dell'alpha di PLASM.js
var angolo = 2 * PI;
var raggio = 0.5;
var domain3 = DOMAIN([[0, angolo], [0, raggio]])([120, 4])

var mapping3 = function (p) {
  var a = p[0];
  var r = p[1];
  return [r * COS(a), r * SIN(a),0];
};
var tappo = MAP(mapping3)(domain3);
var posTappo = T([2])([7])(tappo)

var rotAsta = R([1,2])([PI/2])

var asta = STRUCT([rotAsta, posTappo, supAsta])



//DRAW(asta)


var rotAste = R([0,1])([PI/2])

var aste = T([2])([7])(STRUCT([asta, rotAste, asta, rotAste, asta, rotAste, asta]))


//DRAW(aste)



//Sostegni vela

var sost = SCALE([0,1,2])([0.5,2.6,0.5])(asta)

var posSost1 = T([0,2])([-2.2, 37])(R([0,1])([PI/2])(sost))

var sost2 = SCALE([0,1,2])([2.05,1.1,1.1])(posSost1)

var posSost2 = T([0,2])([-0.8,-18.7])(sost2)

var sostegni = STRUCT([posSost1, posSost2])

//DRAW(sostegni)





//Travi di supporto per la base esterna


var domain = INTERVALS(1)(50);
var domain2 = DOMAIN([[0,1],[0,1]])([30,50])
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([30,50])


var sezMcp1 = [[0,0,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],
[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[0.5,0,0]]
var sezMc1 = BEZIER(S0)(sezMcp1);
/*var sezMcurve1 = MAP(sezMc1)(domain);
DRAW (sezMcurve1);
DRAW(COLOR([0,1,1])(POLYLINE(sezMcp1)));*/



var sezMcp2 = [[0,0,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],
[6,7,0.5],[6,7,0.5],[6,7,0.5],
[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[0.5,0,0.5]]
var sezMc2 = BEZIER(S0)(sezMcp2);
/*var sezMcurve2 = MAP(sezMc2)(domain);
DRAW (sezMcurve2);
DRAW(COLOR([0,1,1])(POLYLINE(sezMcp2)));*/


var sup = BEZIER(S1)([sezMc1,sezMc2])

var rSup = MAP(sup)(domain2)

//DRAW(rSup)




var bordP1 = [[0,0,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],[6,7,0],
[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[6,7,0.5],[0,0,0.5]]
var bordC1 = BEZIER(S0)(bordP1);
/*var bordCurve1 = MAP(bordC1)(domain);
DRAW (bordCurve1);
DRAW(COLOR([0,1,1])(POLYLINE(bordP1)));*/

var bordP2 = [[0.5,0,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],[6,6.5,0],
[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],
[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[6,6.5,0.5],[0.5,0,0.5]]
var bordC2 = BEZIER(S0)(bordP2);
/*var bordCurve2 = MAP(bordC2)(domain);
DRAW (bordCurve2);
DRAW(COLOR([0,1,1])(POLYLINE(bordP2)));*/



var sup2 = BEZIER(S1)([bordC1,bordC2])

var rSup2 = MAP(sup2)(domain2)

//DRAW(rSup2)


var support = STRUCT([rSup,rSup2])

var supportPos = T([0,1,2])([-19,0.2,0.5])(S([0,2])([3,3])(R([1,2])([PI/2])(support)))


var supportStruct = STRUCT([supportPos, rotAste, supportPos, rotAste, supportPos, rotAste, supportPos])

//DRAW(supportStruct)




//Modulo di aggancio per le travi
var modTr = CYL_SURFACE([2.5,1.5])([100,1])
var posMod = T([2])([20])(modTr)

var tapMod = T([2])([20])(DISK(2.5)([100,1]))
var tapMod2 = T([2])([21.5])(DISK(2.5)([100,1]))


DRAW(posMod)
DRAW(tapMod)
DRAW(tapMod2)



//Tiranti

var tir1 = POLYLINE([[8.8,18,0],[11,13,36]])
var tir2 = POLYLINE([[17.9,8,0],[21,3,29]])
var tir3 = POLYLINE([[-12,16,0],[-11,13,34.3]])
var tir4 = POLYLINE([[-17.8,8,0],[-21,3,25.8]])
var tir5 = POLYLINE([[-8.8,-18,0],[-11,-13,32]])
var tir6 = POLYLINE([[-17.9,-8,0],[-22,-10,25]])
var tir7 = POLYLINE([[8.8,-18,0],[11,-13,30.5]])
var tir8 = POLYLINE([[17.9,-8,0],[22,-10,22.5]])


var tirs = STRUCT([tir1,tir2,tir3,tir4,tir5,tir6,tir7,tir8])
DRAW(COLOR([0.5,0.5,0.5])(tirs))



var vite = STRUCT([base,pilone,aste,sostegni,supportStruct])

DRAW(COLOR([237/255,145/255,33/255])(vite))

/*
0 -> lunghezza
1-> larghezza
2-> profondità
2 = z*r
R = z * r
z = 0 implica R = 0
z = altezza implica R = altezza * r*/
//0,2 -> y
//1,2 -> x
//0,1 - z
