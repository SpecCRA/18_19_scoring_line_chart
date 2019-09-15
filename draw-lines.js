async function drawLines() {
    // Access data
    const pts_url = "https://raw.githubusercontent.com/SpecCRA/18_19_scoring_line_chart/master/2018_19_game_pts_data.csv"
    const summary_data_url = "https://raw.githubusercontent.com/SpecCRA/18_19_scoring_line_chart/master/2018-19_celts_monthly_summary_data.csv"
    const pts_data  = await d3.csv(pts_url, d3.autoType);
    const summary_data = await d3.csv(summary_data_url, d3.autoType);
    yAccessor = d => +d.points;
    xAccessor = d => d.date;

    console.log(d3.min(pts_data, yAccessor))
    console.log(d3.deviation(pts_data, yAccessor))

    // Chart dimensions
    let dimensions = {
        width: window.innerWidth * 0.9,
        height: 475,
        margin: {
            top: 25,
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
        .domain(d3.extent(pts_data, yAccessor))
        .range([dimensions.boundedHeight, 0])

    const xScale = d3.scaleUtc()
        .domain(d3.extent(pts_data, xAccessor))
        .range([0, dimensions.boundedWidth])
    
    // Line for average points scored code here

    // Monthly variance in shaded area upon hover
    
    // Draw data    
    const lineGenerator = d3.line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)));

    const pointsLine = bounds.append("path")
        .attr("d", lineGenerator(pts_data))
        .attr("fill", "none")
        .attr("stroke", "#0d6647")
        .attr("stroke-width", 2.5)
    
    // Draw peripherals
    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
        .tickValues([100,120,160])
    const yAxis = bounds.append("g")
		.call(yAxisGenerator)
		.style("color", "#878787")

	const yAxisLabel = yAxis.append("text")
		.attr("x", dimensions.width * 0.085)
		.attr("y", dimensions.height * 0.02)
		.attr("fill", "black")
		.style("font-size", "1.4em")
		.text("Total Points Scored per Game")
		// .style("transform", "rotate(-90deg)")
		.style("text-anchor", "middle")
    
    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
            .style("transform", `translateY(${
                dimensions.boundedHeight
			}px)`)
		.style("color", "#878787")

	// const xAxisLabel = xAxis.append("text")
	// 	.attr("x", dimensions.boundedWidth * 0.985)
	// 	.attr("y", dimensions.margin.bottom - 25)
	// 	.attr("fill", "black")
	// 	.attr("font-size", "1.4em")
	// 	.text("Date")
	
	// Title
	const title = wrapper.append("text")
		.attr("x", (dimensions.width * 0.75))
		.attr("y", (dimensions.height * 0.05))
        .attr("text-anchor", "middle")
        .style("font-family", "sans-serif")
		.style("font-size", "16px")
		.text("The Boston Celtics had one of the most disgruntled teams of the 2018-19 season.")
    
}

drawLines()