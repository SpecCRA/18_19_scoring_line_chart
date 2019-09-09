// Access data
const dataset  = d3.csv("/Users/mini/d3js_projects/project02-nba-scoring/2018_19_game_pts_data.csv", 
    function(data) {
        points = data => +data.points
    })

console.log(dataset[0])

const drawLines = team => {
    // Create accessors

}

drawLines()