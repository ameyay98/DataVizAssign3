windowWidth = 400;
windowHeight = 500;

var dict={};
var rightMargin;
var leftMargin;
var upperMargin;
var flipperLength;
var maxValue;
var minValue;
var binWidth = 5;
var scaleRatio = 5;
var fDict = {};
function preload() {
  table = loadTable("penguins.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberOfRows = table.getRowCount();
  numberOfColumns = table.getColumnCount();
  flipperLength = table.getColumn("flipper_length_mm");
  for(var i = 0; i < numberOfRows;i++)
  {
    if(!isNaN(flipperLength[i]))
    {
      if(!(flipperLength[i] in dict))
        dict[Number(flipperLength[i])] = 1;
      else
        dict[Number(flipperLength[i])] += 1;
    }

  }
  print(dict);
  maxValue = max(Object.keys(dict));
  minValue = min(Object.keys(dict));
  console.log(maxValue);
  console.log(minValue);

  for(i = minValue;i<maxValue;i+=binWidth)
  {
    fDict[i] = 0;
  }

  Object.keys(dict).forEach((j, idx) => {
    for( var x = minValue;x<maxValue+binWidth;x+=binWidth)
    {
      if(j>=x && j < x+binWidth)
      {
        fDict[x]+=dict[j];
        break;
      }
    }

  });
  maxValue = max(Object.values(fDict))*scaleRatio + 100;
  console.log(maxValue);
  print(fDict);

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  Object.keys(fDict).forEach((p, idx) =>{
    fill(0);
    textSize(14);
    text(p, (idx+1)*50 + 90, maxValue+120);
    fill(51,51,255);
    rect((idx+1)*50 +100, maxValue +100 - (fDict[p]*scaleRatio), 50 , fDict[p]*scaleRatio);
    line((idx+1)*50 + 100,maxValue+100, (idx+1)*50 + 100, maxValue+108 )
  });
  leftMargin = 110;
  upperMargin = 100;
  rightMargin = (Object.keys(fDict).length+2) * 50 +100;
  fill(0);

  for (var k=0;k<(maxValue-100)/scaleRatio+10;k=k+10){
    textSize(12);
    text(k,80,maxValue + 100 - k*scaleRatio);
    if(k!=0)
      line(leftMargin - 5, maxValue+100 - k*scaleRatio, leftMargin+5, maxValue+100 -k*scaleRatio);
  }
  line(leftMargin,maxValue+100, rightMargin, maxValue+100);
  triangle(rightMargin, maxValue+90, rightMargin, maxValue+110, rightMargin+10, maxValue+100);
  line(leftMargin,upperMargin - 50, leftMargin, maxValue+100);
  triangle(leftMargin-10, upperMargin-50, leftMargin+10, upperMargin-50, leftMargin, upperMargin - 60);
  text("Count", leftMargin - 80,maxValue/2 + 50);
  line(leftMargin - 60, maxValue/2 + 30, leftMargin - 60, maxValue/2 +10);
  triangle(leftMargin - 70, maxValue/2 + 10, leftMargin - 50, maxValue/2 +10, leftMargin - 60, maxValue/2);
  textSize(14);
  text("Flipper Length(in mm)", rightMargin/2, maxValue + 140);
  line(rightMargin/2 + 140, maxValue+136, rightMargin/2 +180, maxValue+136);
  triangle(rightMargin/2+180, maxValue+130, rightMargin/2 + 180, maxValue + 142, rightMargin/2 + 190, maxValue + 136);
  textSize(20);
  text("Distribution of Flipper Length(in mm)", rightMargin/2 - 50, upperMargin);


}