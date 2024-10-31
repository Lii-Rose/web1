//Al donar play tots els colors menys blanc i negre canvien de color

//VARIABLES
//Una variable és una forma d'emmagatzemar diferents tipus d'informació que //pots utilitzar a la llarga. És útil en el meu cas, ja que no solament em //permet establir un color ficant r, g, b que és més curt que (color (xxx, //xxx, xxx)) sinó que em permet utilitzar colors random establint dins de //setup "= random (255)" a les diferents variables.

//He creat 3 grups de r, g i b per a poder crear 3 colors aleatoris. Els //colors aquí són = 0 perquè fora de les funcions no deixa establir //variables de color. Per tant aquí he ficat 0, però dintre de setup he //establert el valor random a cada valor r, g i b.
let colorsdec = [
  "#dfa5e2",
  "#7b68c9",
  "#ffafc7",
  "#b6daff",
  "#ffe6ad",
];

let col = 0
function angle(anglex, angley) {   //Això era la boca del robot
  strokeWeight(3);
  noFill();
  arc(anglex, angley, 10, 10, 0, 180);
}

function cor(a,h,d){
  noStroke()
  //fill(250);
  circle(a,h,d);
  circle(a+d,h,d);
  circle(a+d/2,h+d/5,d/2.5)
  triangle(a-d/2.3,h+d/4,a+d*1.44,h+d/4,a+d/2,h+d*1.5);
}

function setup() {
//Si la mida del canvas canvia ex. 600*600 el mosaic no deixa espais en //blanc
  createCanvas(windowWidth,windowHeight/4.5).parent(p5js);
  angleMode(DEGREES);
  col1 =random (colorsdec);
  col2 =random (colorsdec);
  col3 =random (colorsdec);
  col4 = random (colorsdec)
  col5 = random (colorsdec)
}

function draw() {
  background(color("#FFFFFF"));
  
//For servirà per a poder repetir el cercle i altres components a la llarga //del canvas
  for (var x = 0; x <= width; x = x + 50) {
    for (var y = 0; y <= height; y = y + 50) {
      fill(col1);

//Això farà que cada línia x parell sigui d'un altre color 
      if (x%4==0 &&y%4==0) {
        fill(col4);
      } else if (y%4==0) {
        fill(col2);
      }else if (x%4 != 0){
        fill(col4)
      }else if (x%4==0){
        fill(col1)
      }
      cor(x,y,25);

//Fa que la decoració circular dintre del cercle gran cada 3 canviï de //color, fent que la 3a sigui blanca a la y
      if (y % 3 == 0) {
        stroke(255);
      } else {
        stroke(col4);
      }


    }
  }

}