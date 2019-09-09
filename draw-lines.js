async function drawLines() {
    // Access data
    const dataset  = await d3.csv("./2018_19_celtics_pts_data.csv")
    yAccessor = d => +d.points
    dateParser = d3.timeParse("%Y-%m-%d")
    xAccessor = d => dateParser(d.date)
    console.log(dataset[0])
    console.log(xAccessor(dataset[81]))

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

    const xScale = d3.scaleTime()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth])

    console.log(xScale("2018-10-31"))

    // Line for average would be neat
    
    // Draw data
    const lineGenerator = d3.line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)))

    const line = bounds.append("path")
        .attr("d", lineGenerator(dataset))
        .attr("fill", "none")
        .attr("stroke", "af9358")
        .attr("stroke-width", 2)

}

drawLines()