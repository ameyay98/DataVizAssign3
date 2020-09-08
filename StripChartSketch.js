windowWidth = 400;
windowHeight = 500;

var dict={};
var rdict = {};
var rightMargin;
var leftMargin;
var upperMargin;
var bodyMass;
var maxValue;
var minValue;
var scaleRatio = 10;
var species;
function preload() {
    table = loadTable("penguins.csv", "csv", "header");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    numberOfRows = table.getRowCount();
    numberOfColumns = table.getColumnCount();
    bodyMass = table.getColumn("body_mass_g");
    species = table.getColumn("species");
    for(var i = 0; i < numberOfRows;i++)
    {
        if(!isNaN(Number(bodyMass[i])))
        {
            if(!(species[i] in dict))
            {
                dict[species[i]] = [Number(bodyMass[i])];
                rdict[species[i]] = [Math.random()*500];
            }
            else
            {
                dict[species[i]].push(Number(bodyMass[i]));
                rdict[species[i]].push( Math.random()*500);
            }
        }

    }
    print(dict);
    maxValue = 0;
    minValue = 10000;
    Object.values(dict).forEach(i=>{
        maxValue = Math.max(maxValue, Number(max(i)));
        minValue = Math.min(minValue, Number(min(i)));
    });
    maxValue = maxValue/scaleRatio;
    minValue = minValue/scaleRatio;
    console.log(maxValue);
    console.log(minValue);
    console.log(rdict);

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(220);
    species = Object.keys(dict);
    bottomMargin = maxValue ;
    Object.keys(dict).forEach((i,idx) => {

        dict[i].forEach((p,idx1) =>{
            fill(0);
            stroke(13,111,2,191);
            strokeWeight(6);
            point((idx+1)*200+60+ (rdict[i][idx1]/scaleRatio), maxValue + 100 - p/scaleRatio);
        });
        stroke(0);
        strokeWeight(0.7);
        fill(0);
        textSize(14);
        line((idx+1)*200 + 80, bottomMargin-10, (idx+1)*200 + 80, bottomMargin + 10);
        text(i, (idx+1)*200 + 60,bottomMargin + 20);
    });

    leftMargin = 170;
    upperMargin = 100;
    rightMargin = (Object.keys(dict).length+1) * 200 +100;
    fill(0);
    for (var k=minValue - 170 ;k<maxValue + 40 ;k=k+30){
        text(k*10,leftMargin - 50,maxValue + 100- k);
        if(k!=minValue - 170)
            line(leftMargin - 5, maxValue+100 - k, leftMargin+5, maxValue+100 -k);
    }
    line(leftMargin,bottomMargin, rightMargin, bottomMargin);
    triangle(rightMargin, bottomMargin - 10, rightMargin, bottomMargin+10, rightMargin+10, bottomMargin);
    line(leftMargin,upperMargin - 50, leftMargin, bottomMargin);
    triangle(leftMargin-10, upperMargin-50, leftMargin+10, upperMargin-50, leftMargin, upperMargin - 60);
    text("Body Mass(in g)", leftMargin - 150,(bottomMargin-10)/2);
    line(leftMargin - 60, (bottomMargin-100)/2 + 30, leftMargin - 60, (bottomMargin- 100)/2 +10);
    triangle(leftMargin - 70, (bottomMargin-100)/2 + 10, leftMargin - 50, (bottomMargin-100)/2 +10, leftMargin - 60, (bottomMargin-100)/2);
    textSize(14);
    text("Speices", rightMargin/2, bottomMargin + 40);
    line(rightMargin/2 + 60, bottomMargin + 36, rightMargin/2 +100, bottomMargin + 36);
    triangle(rightMargin/2+100, bottomMargin+30, rightMargin/2 + 100, bottomMargin + 42, rightMargin/2 + 110, bottomMargin+36);
    textSize(20);
    text("Distribution of Body Mass(in g) [Jitter Plot]", rightMargin/2 - 50, upperMargin - 50);


}