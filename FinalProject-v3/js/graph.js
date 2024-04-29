//Update the graphs with interactions using D3.js
function updateGraph(variable) {
    d3.csv("csv/4star_chocolate.csv").then(function(data) {
        // Parsing and preparing data based on the selected variable
        const dataCount = d3.rollups(data, v => v.length, d => d[variable])
                             .map(([key, count]) => ({ key, count }));
        dataCount.sort((a, b) => d3.descending(a.count, b.count));

        const defaultContent = `<strong>Interpretation</strong>:<br/>` +
        `This bar chart shows the most common features of 112 "outstanding" chocolate bars with rating of 4. The height of the bar corresponds to the counts of the cocolate bars with specific features.  `;
        const infoDisplay = d3.select("#information").html(defaultContent);
        const detailsDisplay = d3.select("#details");

        // Clear existing SVG for new graph
        d3.select("#chart").select("svg").remove();

        // Chart dimensions and margins
        const width = 800;
        const height = 550;
        const margins = { top: 60, right: 20, bottom: 200, left: 40 };

        // Scales
        const x = d3.scaleBand()
            .domain(dataCount.map(d => d.key))
            .range([margins.left, width - margins.right])
            .padding(0.1);
        const y = d3.scaleLinear()
            .domain([0, d3.max(dataCount, d => d.count)])
            .range([height - margins.bottom, margins.top]);

        // Creating SVG element
        const svg = d3.select("#chart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height]);
        
        // Drawing bars with transition effect
        const bars = svg.append("g")
            .attr("fill", "#ABB9AD")
            .selectAll("rect")
            .data(dataCount)
            .join("rect")
            .on("mouseover", function(event, d) {
                d3.select(this).style("fill", "#71907C");
                // Update the information display element with the bar information
                detailsDisplay.style("visibility", "visible")
                    .style("left", (event.pageX + 10) + "px")     
                    .style("top", (event.pageY - 28) + "px")
                    .html(`<div>${variable} : ${d.key}</div><div>occurrence: ${d.count}</div>`);
                infoDisplay.html(
                    `<strong>${d.key}</strong>: ${d.count} items.<br/>` +
                    `Explanation: This bar represents the number of occurrences of "${d.key}". ` +
                    `You can interpret this bar as an indication of how common or popular "${d.key}" as "${variable}" is within the dataset.`
                );
            })
            .on("mousemove", function(event) {
                detailsDisplay.style("left", (event.pageX + 10) + "px")     
                       .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                d3.select(this).style("fill", "#ABB9AD"); 
                // Clear the information display when not hovering over a bar
                detailsDisplay.style("visibility", "hidden")
                infoDisplay.html(
                    `<strong>Interpretation</strong>:<br/>` +
                    `This bar chart shows the most common features of 112 "outstanding" chocolate bars with rating of 4. The height of the bar corresponds to the counts of the cocolate bars with specific features.  `
                );
            })
            .attr("x", d => x(d.key))
            .attr("y", height - margins.bottom) // Start bars at the bottom of the chart area
            .attr("width", x.bandwidth())
            .attr("height", 0)  // Start with a height of 0
            .transition()  // Begin transition
            .duration(900)  // Duration of transition
            .attr("y", d => y(d.count))  // Transition the y position to reflect the data count
            .attr("height", d => height - margins.bottom - y(d.count));  // Height grows from 0 to the appropriate value
            
            

        // X-axis and rotation of labels
        svg.append("g")
           .attr("transform", `translate(0,${height - margins.bottom})`)
           .call(d3.axisBottom(x).tickSizeOuter(0))
           .selectAll("text")
           .style("text-anchor", "end")
           .attr("dx", "-.8em")
           .attr("dy", ".15em")
           .attr("transform", "rotate(-65)")
           .style("font-size", "12px"); 

        // Y-axis
        svg.append("g")
           .attr("transform", `translate(${margins.left},0)`)
           .call(d3.axisLeft(y))
           .call(g => g.select(".domain").remove())
           .call(g => g.append("text")
               .attr("x", -margins.left)
               .attr("y", margins.top / 2) 
               .attr("fill", "currentColor")
               .attr("text-anchor", "start")
               .text("Count")
               .style("font-size", "16px"));
    })
}


