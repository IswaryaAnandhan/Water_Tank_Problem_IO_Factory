function calculateWater() {
    var input = document.getElementById("block-height").value;
    var heights = input.split(",").map(Number);
    var waterLevels = getWaterLevels(heights);
    var totalWater = waterLevels.reduce((acc, cur) => acc + cur, 0);
    
    var output = document.getElementById("output");
    output.innerHTML = "Units of water stored: " + totalWater;
    
    drawWaterTank(heights, waterLevels);
}


function getWaterLevels(heights) {
    var n = heights.length;
    var leftMax = new Array(n);
    var rightMax = new Array(n);
    var waterLevels = new Array(n);
    leftMax[0] = heights[0];
    rightMax[n - 1] = heights[n - 1];

    for (var i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
    }

    for (var i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
    }

    for (var i = 0; i < n; i++) {
        waterLevels[i] = Math.min(leftMax[i], rightMax[i]) - heights[i];
    }

    return waterLevels;
}

function drawWaterTank(heights, waterLevels) {
    var waterTank = document.getElementById("water-tank");
    waterTank.innerHTML = "";

    var maxHeight = Math.max(...heights);
    var maxWaterLevel = Math.max(...waterLevels);
    var tankHeight = maxHeight + maxWaterLevel;

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", tankHeight + 20);

    for (var i = 0; i < heights.length; i++) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", 50 + i * 50);
        rect.setAttribute("y", tankHeight - heights[i]);
        rect.setAttribute("width", 40);
        rect.setAttribute("height", heights[i]);
        rect.setAttribute("class", "bar");
        svg.appendChild(rect);

        if (waterLevels[i] > 0) {
            var water = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            water.setAttribute("x", 50 + i * 50);
            water.setAttribute("y", tankHeight - heights[i] - waterLevels[i]);
            water.setAttribute("width", 40);
            water.setAttribute("height", waterLevels[i]);
            water.setAttribute("class", "water");
            svg.appendChild(water);
        }
    }

    waterTank.appendChild(svg);
}
