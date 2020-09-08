windowWidth = 400;
windowHeight = 500;

var dict={};
var rightMargin;
var leftMargin;
var upperMargin;
var billLength;
var maxValues = [];
var minValues = [];
var fQ = [];
var tQ = [];
var median = [];
var maxValue;
var minValue;
var binWidth = 5;
var scaleRatio = 10;
var species;
function preload() {
    table = loadTable("penguins.csv", "csv", "header");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    numberOfRows = table.getRowCount();
    numberOfColumns = table.getColumnCount();
    billLength = table.getColumn("bill_length_mm");
    species = table.getColumn("species");
    for(var i = 0; i < numberOfRows;i++)
    {
        if(!isNaN(billLength[i]))
        {
            if(!(species[i] in dict))
            {
                dict[species[i]] = [Number(billLength[i])];
            }
            else
            {
                dict[species[i]].push(Number(billLength[i]));
            }
        }

    }
    print(dict);
    Object.values(dict).forEach((i,idx) =>{
        console.log(i);
        maxValues.push(max(i));
        minValues.push(min(i));
        i.sort();
        let len = i.length;
        let mid = Math.round(i.length/2);
        console.log(mid);
        if(len%2==0)
        {
            median.push(Number(((i[mid] + i[mid + 1]) / 2).toFixed(1)));
        }
        else
        {
            median.push(i[mid]);
        }
        let smid = Math.round(mid/2);
        console.log(smid);
        if(mid % 2 == 0)
        {

            fQ.push(Number(((i[smid ] + i[smid + 1]) / 2).toFixed(1)));
        }
        else
        {
            fQ.push(i[smid]);
        }
        let olen = len - mid;
        let tmid = Math.round(olen/2);
        console.log(mid+tmid);
        if( olen % 2 == 0)
        {
            tQ.push(Number(((i[mid + tmid] + i[mid+tmid + 1]) / 2).toFixed(1)));
        }
        else
        {
            tQ.push(i[mid+tmid]);
        }
    });
    maxValue = max(maxValues)*scaleRatio ;
    minValue = min(minValues)*scaleRatio;
    console.log(maxValues);
    console.log(minValues);
    console.log(fQ);
    console.log(median);
    console.log(tQ);

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(220);
    species = Object.keys(dict);
    bottomMargin = maxValue - minValue + 150;
    maxValues.forEach((p, idx) =>{
        fill(0);
        textSize(14);
        text(species[idx], (idx+1)*200 + 100,bottomMargin + 20);
        line((idx+1)*200 + 125, bottomMargin-10, (idx+1)*200 + 125, bottomMargin + 10);
        text("Max("+maxValues[idx]+")", (idx+1)*200 + 50,maxValue + 100 - (maxValues[idx]*scaleRatio) - 5);
        text("3rd Q("+tQ[idx]+")",(idx+1)*200 + 20 ,maxValue +100 - (tQ[idx]*scaleRatio));
        text("Median("+median[idx]+")",(idx+1)*200 + 10 ,maxValue +100 - (median[idx]*scaleRatio));
        text("1st Q("+fQ[idx]+")",(idx+1)*200 + 20 ,maxValue +100 - (fQ[idx]*scaleRatio));
        text("Min("+minValues[idx]+")",(idx+1)*200 + 50 ,maxValue +100 - (minValues[idx]*scaleRatio));
        fill(255,255,255);
        rect((idx+1)*200 +100, maxValue +100 - (tQ[idx]*scaleRatio), 50 , tQ[idx]*scaleRatio - fQ[idx]*scaleRatio);
        line((idx+1)*200+115, maxValue + 100 - (minValues[idx]*scaleRatio), (idx+1)*200 + 135,maxValue + 100 - (minValues[idx]*scaleRatio));
        line((idx+1)*200+115, maxValue + 100 - (maxValues[idx]*scaleRatio), (idx+1)*200 + 135,maxValue + 100 - (maxValues[idx]*scaleRatio));
        line((idx+1)*200 + 125,maxValue+100 - (tQ[idx]*scaleRatio), (idx+1)*200 + 125, maxValue+100 - (maxValues[idx]*scaleRatio))
        line((idx+1)*200 + 125,maxValue+100 - (minValues[idx]*scaleRatio), (idx+1)*200 + 125, maxValue+100 - (fQ[idx]*scaleRatio))
        line((idx+1)*200 + 100,maxValue+100 - (median[idx]*scaleRatio), (idx+1)*200 + 150, maxValue+100 - (median[idx]*scaleRatio))
    });
    leftMargin = 150;
    upperMargin = 100;
    rightMargin = (Object.keys(dict).length+1) * 200 +100;
    bottomMargin = maxValue - minValue + 150;
    fill(0);
    let temp = minValue - 50;
    for (var k=minValue - 50;k<maxValue + 40 ;k=k+30){
        text(Math.round(k/10),leftMargin - 30,maxValue + 100 - k);
        if(k!=minValue - 50)
            line(leftMargin - 5, maxValue+100 - k, leftMargin+5, maxValue+100 -k);
    }
    line(leftMargin,bottomMargin, rightMargin, bottomMargin);
    triangle(rightMargin, bottomMargin - 10, rightMargin, bottomMargin+10, rightMargin+10, bottomMargin);
    line(leftMargin,upperMargin - 50, leftMargin, bottomMargin);
    triangle(leftMargin-10, upperMargin-50, leftMargin+10, upperMargin-50, leftMargin, upperMargin - 60);
    text("Bin Length(in mm)", leftMargin - 150,(bottomMargin-10)/2);
    line(leftMargin - 60, (bottomMargin-100)/2 + 30, leftMargin - 60, (bottomMargin- 100)/2 +10);
    triangle(leftMargin - 70, (bottomMargin-100)/2 + 10, leftMargin - 50, (bottomMargin-100)/2 +10, leftMargin - 60, (bottomMargin-100)/2);
    textSize(14);
    text("Species", rightMargin/2+50, bottomMargin + 40);
    line(rightMargin/2 + 100, bottomMargin + 36, rightMargin/2 +140, bottomMargin + 36);
    triangle(rightMargin/2+140, bottomMargin+30, rightMargin/2 + 140, bottomMargin + 42, rightMargin/2 + 150, bottomMargin+36);
    textSize(20);
    text("Distribution of Bin Length(in mm) [Box Plot]", rightMargin/2 - 50, upperMargin - 50);


}