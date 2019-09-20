async function drawMeanLine() {
    // Access data
    sum_data_url = "https://raw.githubusercontent.com/SpecCRA/18_19_scoring_line_chart/master/2018-19_celts_monthly_summary_data.csv"
    const dataset = await d3.csv(sum_data_url, d3.autoType)
    console.log(dataset[2])

    dateAccessor = d => d.date
    meanPtsAccessor = d => d.mean_pts
    stdPtsAccessor = d => d.std_pts

    console.log(dateAccessor(dataset[0]).getMonth())

    console.log(meanPtsAccessor(dataset[0]) + stdPtsAccessor(dataset[0]))
    console.log(meanPtsAccessor(dataset[0]))
    console.log(meanPtsAccessor(dataset[0]) - stdPtsAccessor(dataset[0]))

    // Declare chart dimensions
    let dimensions = {
        width: 900,
        height: 450,
        margin: {
            top: 25,
            right: 15,
            bottom: 40,
            left: 60,
        }
    }
    dimensions.boundedWidth = dimensions.width 
        - dimensions.margin.right
        - dimensions.margin.left
    dimensions.boudnedHeight = dimensions.height
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

    // Scales
    const xScale = d3.scaleUtc()
        .domain(d3.extent(dataset, dateAccessor))
        .range([0, dimensions.boundedWidth])

    const yScale = d3.scaleLinear()
        .domain([90, 120])
        .range([dimensions.boudnedHeight, 0])

    // Draw data

    const lineGenerator = d3.line()
        .x(d => xScale(dateAccessor(d)))
        .y(d => yScale(meanPtsAccessor(d)))

    // mean line
    const meanLine = bounds.append("path")
        .attr("d", lineGenerator(dataset))
        .attr("fill", "none")
        .attr("stroke", "#0d6647")
        .attr("stroke-width", 2)
    
    // Axes
    
    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
        .ticks(3)
    const yAxis = bounds.append("g")
		.call(yAxisGenerator)
		.style("color", "#878787")

	// const yAxisLabel = yAxis.append("text")
	// 	.attr("x", dimensions.width * 0.085)
	// 	.attr("y", dimensions.height * 0.02)
	// 	.attr("fill", "black")
	// 	.style("font-size", "1.4em")
	// 	.text("Total Points Scored per Game")
	// 	// .style("transform", "rotate(-90deg)")
	// 	.style("text-anchor", "middle")
    
    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)

    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
            .style("transform", `translateY(${
                dimensions.boudnedHeight
            }px)`)
}


drawMeanLine();