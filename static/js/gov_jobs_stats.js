d3.json('./static/data/gov_jobs.json').then(function(response) {
    var keys = Object.keys(response);

    var department_list = []

    keys.forEach(function(key){
        var department = response[key].Department;

        if (department_list.length == 0){
            department_list.push(department);
          }
        else {
        var check = 0
        department_list.forEach(function(dep){
            //console.log(dep);
            if(dep == department){
            check +=1
            };
        });

        if (check == 0){
            //console.log(department);
            department_list.push(department);
        };
        check = 0;
        };
    });

    department_job_count_list = [];
    minimum_wage_list = [];
    maximum_wage_list = [];

    var wage = 0;

    department_list.forEach(function(dep){
        count = 0;
        minimum = 1000000;
        maximum = 0;
        keys.forEach(function(key){
        if(dep == response[key].Department){
            count += 1;
            wage = parseFloat(response[key].MinimumRange);
            //console.log(wage);
            if (wage != 0 && wage > 10000){

                if (wage>maximum){maximum = wage};

                if (wage<minimum){minimum = wage};
            };
           };
        });
        department_job_count_list.push(count);
        minimum_wage_list.push(minimum);
        maximum_wage_list.push(maximum);
    });

    // Create two-dimensional array (Department names & Number of job per department)
    var jobs_X = [];
    for (var i = 0; i < department_list.length; i++){
        jobs_X.push([department_list[i],department_job_count_list[i]])
    };

    jobs_X.sort((a,b) => a[1]-b[1]);

    // Create bar chart
    let trace1 = {
        x: jobs_X.map(x => x[1]), 
        y: jobs_X.map(x => x[0]),
        textposition: 'outside',
        text: jobs_X.map(x => x[1]),
        borderWidth: 1,
        type: 'bar',
        orientation: 'h'
    };
    // Apply a layout
    let layout1 = {
        margin: {
        l: 300,
        r: 600,
        t: 50,
        b: 50
        },
        height: 660,
        hovermode: false
    };
    // Data trace array
    let traceData1 = [trace1];      
    // Render the plot to the div tag with id 'bar'
    Plotly.newPlot('bar', traceData1,layout1); 
});

