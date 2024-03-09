d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
    // Process the data here
}).catch(function(error) {
    console.log("Error loading data: " + error);
});
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
    // Extract necessary data from the JSON
    var samples = data.samples;
    var otu_ids = samples[0].otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(); // Top 10 OTU IDs
    var sample_values = samples[0].sample_values.slice(0, 10).reverse(); // Top 10 sample values
    var otu_labels = samples[0].otu_labels.slice(0, 10).reverse(); // Top 10 OTU labels

    // Create the horizontal bar chart
    var trace = {
        type: 'bar',
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        orientation: 'h'
    };

    var data = [trace];

    var layout = {
        title: 'Top 10 OTUs Found',
        xaxis: { title: 'Sample Values' },
        yaxis: { title: 'OTU IDs' }
    };

    Plotly.newPlot('bar', data, layout);

    // Select the dropdown menu element
    var dropdownMenu = d3.select('#selDataset');

    // Populate the dropdown menu with options based on individual IDs
    data.names.forEach(function(name) {
        dropdownMenu.append('option').text(name).property('value', name);
    });

    // Event listener for dropdown menu changes
    dropdownMenu.on('change', updateBarChart);

    // Function to update the bar chart when a new individual is selected
    function updateBarChart() {
        var selectedIndividual = dropdownMenu.property('value');
        var index = data.names.indexOf(selectedIndividual);
        var otu_ids = samples[index].otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        var sample_values = samples[index].sample_values.slice(0, 10).reverse();
        var otu_labels = samples[index].otu_labels.slice(0, 10).reverse();

        Plotly.restyle('bar', 'x', [sample_values]);
        Plotly.restyle('bar', 'y', [otu_ids]);
        Plotly.restyle('bar', 'text', [otu_labels]);
    }
}).catch(function(error) {
    console.log("Error loading data: " + error);
});
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
    var samples = data.samples;

    // Extracting necessary data for the bubble chart
    var otu_ids = samples[0].otu_ids;
    var sample_values = samples[0].sample_values;
    var otu_labels = samples[0].otu_labels;

    // Create the bubble chart trace
    var trace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: 'Earth' // You can choose any colorscale you prefer
        }
    };

    var data = [trace];

    var layout = {
        title: 'Bubble Chart of OTUs',
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' }
    };

    Plotly.newPlot('bubble', data, layout);
}).catch(function(error) {
    console.log("Error loading data: " + error);
});
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
    var samples = data.samples;
    var metadata = data.metadata; // New line to extract metadata

    // Populate the dropdown menu with options based on individual IDs
    var dropdownMenu = d3.select('#selDataset');
    data.names.forEach(function(name) {
        dropdownMenu.append('option').text(name).property('value', name);
    });

    // Event listener for dropdown menu changes
    dropdownMenu.on('change', updateCharts);

    // Function to update charts and metadata when a new individual is selected
    function updateCharts() {
        var selectedIndividual = dropdownMenu.property('value');
        var index = data.names.indexOf(selectedIndividual);

        // Update bar chart
        var otu_ids = samples[index].otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        var sample_values = samples[index].sample_values.slice(0, 10).reverse();
        var otu_labels = samples[index].otu_labels.slice(0, 10).reverse();
        Plotly.restyle('bar', 'x', [sample_values]);
        Plotly.restyle('bar', 'y', [otu_ids]);
        Plotly.restyle('bar', 'text', [otu_labels]);

        // Update bubble chart
        var otu_ids_bubble = samples[index].otu_ids;
        var sample_values_bubble = samples[index].sample_values;
        var otu_labels_bubble = samples[index].otu_labels;
        var traceBubble = {
            x: otu_ids_bubble,
            y: sample_values_bubble,
            text: otu_labels_bubble,
            mode: 'markers',
            marker: {
                size: sample_values_bubble,
                color: otu_ids_bubble,
                colorscale: 'Earth'
            }
        };
        Plotly.newPlot('bubble', [traceBubble]);

        // Update sample metadata
        var metadataText = "";
        Object.entries(metadata[index]).forEach(([key, value]) => {
            metadataText += `${key}: ${value}<br>`;
        });
        document.getElementById('sample-metadata').innerHTML = metadataText;
    }

    // Initially display metadata for the first individual
    updateCharts();
}).catch(function(error) {
    console.log("Error loading data: " + error);
});
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
    var samples = data.samples;
    var metadata = data.metadata;

    // Populate the dropdown menu with options based on individual IDs
    var dropdownMenu = d3.select('#selDataset');
    data.names.forEach(function(name) {
        dropdownMenu.append('option').text(name).property('value', name);
    });

    // Event listener for dropdown menu changes
    dropdownMenu.on('change', updateCharts);

    // Function to update charts and metadata when a new individual is selected
    function updateCharts() {
        var selectedIndividual = dropdownMenu.property('value');
        var index = data.names.indexOf(selectedIndividual);

        // Update bar chart
        var otu_ids = samples[index].otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        var sample_values = samples[index].sample_values.slice(0, 10).reverse();
        var otu_labels = samples[index].otu_labels.slice(0, 10).reverse();
        Plotly.restyle('bar', 'x', [sample_values]);
        Plotly.restyle('bar', 'y', [otu_ids]);
        Plotly.restyle('bar', 'text', [otu_labels]);

        // Update bubble chart
        var otu_ids_bubble = samples[index].otu_ids;
        var sample_values_bubble = samples[index].sample_values;
        var otu_labels_bubble = samples[index].otu_labels;
        var traceBubble = {
            x: otu_ids_bubble,
            y: sample_values_bubble,
            text: otu_labels_bubble,
            mode: 'markers',
            marker: {
                size: sample_values_bubble,
                color: otu_ids_bubble,
                colorscale: 'Earth'
            }
        };
        Plotly.newPlot('bubble', [traceBubble]);

        // Update sample metadata
        var metadataText = "";
        Object.entries(metadata[index]).forEach(([key, value]) => {
            metadataText += `${key}: ${value}<br>`;
        });
        document.getElementById('sample-metadata').innerHTML = metadataText;
    }

    // Initially display metadata for the first individual
    updateCharts();
}).catch(function(error) {
    console.log("Error loading data: " + error);
});
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
    var samples = data.samples;
    var metadata = data.metadata;

    // Populate the dropdown menu with options based on individual IDs
    var dropdownMenu = d3.select('#selDataset');
    data.names.forEach(function(name) {
        dropdownMenu.append('option').text(name).property('value', name);
    });

    // Event listener for dropdown menu changes
    dropdownMenu.on('change', updateCharts);

    // Function to update charts and metadata when a new individual is selected
    function updateCharts() {
        var selectedIndividual = dropdownMenu.property('value');
        var index = data.names.indexOf(selectedIndividual);

        // Update bar chart
        var otu_ids = samples[index].otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        var sample_values = samples[index].sample_values.slice(0, 10).reverse();
        var otu_labels = samples[index].otu_labels.slice(0, 10).reverse();
        Plotly.restyle('bar', 'x', [sample_values]);
        Plotly.restyle('bar', 'y', [otu_ids]);
        Plotly.restyle('bar', 'text', [otu_labels]);

        // Update bubble chart
        var otu_ids_bubble = samples[index].otu_ids;
        var sample_values_bubble = samples[index].sample_values;
        var otu_labels_bubble = samples[index].otu_labels;
        var traceBubble = {
            x: otu_ids_bubble,
            y: sample_values_bubble,
            text: otu_labels_bubble,
            mode: 'markers',
            marker: {
                size: sample_values_bubble,
                color: otu_ids_bubble,
                colorscale: 'Earth'
            }
        };
        Plotly.newPlot('bubble', [traceBubble]);

        // Update pie chart
        var tracePie = {
            values: sample_values,
            labels: otu_ids,
            hovertext: otu_labels,
            type: 'pie'
        };
        Plotly.newPlot('pie', [tracePie]);

        // Update sample metadata
        var metadataText = "";
        Object.entries(metadata[index]).forEach(([key, value]) => {
            metadataText += `${key}: ${value}<br>`;
        });
        document.getElementById('sample-metadata').innerHTML = metadataText;

        // Update gauge chart
        var washingFreq = metadata[index].wfreq;
        updateGauge(washingFreq);
    }

    // Initially display metadata for the first individual
    updateCharts();
}).catch(function(error) {
    console.log("Error loading data: " + error);
});

function updateGauge(washingFreq) {
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: washingFreq,
            title: { text: "Weekly Washing Frequency" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 9] },
                steps: [
                    { range: [0, 1], color: "rgba(255, 255, 255, 0)" },
                    { range: [1, 2], color: "rgba(232, 226, 202, .5)" },
                    { range: [2, 3], color: "rgba(210, 206, 145, .5)" },
                    { range: [3, 4], color: "rgba(202, 209, 95, .5)" },
                    { range: [4, 5], color: "rgba(170, 202, 42, .5)" },
                    { range: [5, 6], color: "rgba(110, 154, 22, .5)" },
                    { range: [6, 7], color: "rgba(14, 127, 0, .5)" },
                    { range: [7, 8], color: "rgba(14, 99, 0, .5)" },
                    { range: [8, 9], color: "rgba(0, 66, 0, .5)" }
                ],
                threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: washingFreq
                }
            }
        }
    ];
    
    var layout = { width: 400, height: 300, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data, layout);
}