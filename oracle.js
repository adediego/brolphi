function init(){
    svg = document.getElementById("svg")
    polygon=svg.children[0]

    const edges=7;
    const jump=4;
    const radius = 100;
    const x = radius;
    const y = radius; 

    const points = getPoints();

    for (const array_point of points){
        let point=svg.createSVGPoint();
        point.x = array_point[0];
        point.y = array_point[1];
        polygon.points.appendItem(point);
    }
}

function getPoints(){
    const number=100000;
    var x = 0;
    var y = 0;
    var points = [];
    for (let i = 0; i<number; i++){
        // do step
        var angle  = Math.random() * 2*  Math.PI;
        var radius = Math.random();
        x += radius * Math.cos(angle);
        y += radius * Math.sin(angle);
        points.push([x,y]);

    }

    var xbox = [0,0];
    var ybox = [0,0];
    for (let i = 0; i<number; i++){
        // shift to end up back where we started
        points[i][0] -= x * i / number;
        points[i][1] -= y * i / number;

        // update bounding box
        xbox[0] = Math.min(points[i][0], xbox[0]);
        xbox[1] = Math.max(points[i][0], xbox[1]);
        ybox[0] = Math.min(points[i][1], ybox[0]);
        ybox[1] = Math.max(points[i][1], ybox[1]);
    }
    const xwidth = xbox[1] - xbox[0];
    const ywidth = ybox[1] - ybox[0];
    const scaling = Math.sqrt(0.5)/Math.max(xwidth, ywidth);
    const width = 300;
    for (let i = 0; i<number; i++){
        points[i][0] -= xbox[0]; 
        points[i][1] -= ybox[0];

        points[i][0] *= scaling * width; 
        points[i][1] *= scaling * width; 

        points[i][0] += width * (1 - xwidth * scaling)/2; 
        points[i][1] += width * (1 - ywidth * scaling)/2; 
    }
    return points;
}
