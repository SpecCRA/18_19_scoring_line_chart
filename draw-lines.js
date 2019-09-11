async function drawLines() {
    // Access data
    const url = "https://raw.githubusercontent.com/SpecCRA/18_19_scoring_line_chart/master/2018_19_game_pts_data.csv"
    const dataset  = await d3.csv(url, d3.autoType);
    yAccessor = d => +d.points;
    // dateParser = d3.timeParse("%Y-%m-%d")
    xAccessor = d => d.date;

    // Chart dimensions
    let dimensions = {
        width: window.innerWidth * 0.9,
        height: 500,
        margin: {
            top: 15,
            right: 15,
            bottom: 40,
            left: 60,
        },
    }
    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.left
        - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height
        - dimensions.margin.top
        - dimensions.margin.bottom
    
    // Draw canvas
    const wrapper = d3.select("#wrapper")
        .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)
    const bounds = wrapper.append("g")
        .style("transform", `translate(${
            dimensions.margin.left
        }px, ${
            dimensions.margin.top
        }px)`)

    // Create scales
    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([dimensions.boundedHeight, 0])

    const xScale = d3.scaleUtc()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth])
    
    // Line for average points scored code here

    // Monthly variance in shaded area upon hover
    
    // Draw data    
    const lineGenerator = d3.line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)));

    const line = bounds.append("path")
        .attr("d", lineGenerator(dataset))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
    
    // Draw peripherals
}

drawLines()