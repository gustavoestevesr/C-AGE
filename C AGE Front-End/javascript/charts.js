
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            // Set Data
            var data0 = google.visualization.arrayToDataTable([
                ['Price', 'Size'],
                [50, 7], [60, 8], [70, 8], [80, 9], [90, 9],
                [100, 9], [110, 10], [120, 11],
                [130, 14], [140, 14], [150, 15]
            ]);
            // Set Options
            var options0 = {
                title: 'House Prices vs. Size',
                hAxis: { title: 'Square Meters' },
                vAxis: { title: 'Price in Millions' },
                legend: 'none'
            };
            // Draw
            var chart = new google.visualization.ScatterChart(document.getElementById('myChart0'));
            chart.draw(data0, options0);
        }

        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart1);
        function drawChart1() {
            // Set Data
            var data1 = google.visualization.arrayToDataTable([
                ['Price', 'Size'],
                [50, 7], [60, 8], [70, 8], [80, 9], [90, 9],
                [100, 9], [110, 10], [120, 11],
                [130, 14], [140, 14], [150, 15]
            ]);
            // Set Options
            var options1 = {
                title: 'House Prices vs. Size',
                hAxis: { title: 'Square Meters' },
                vAxis: { title: 'Price in Millions' },
                legend: 'none'
            };
            // Draw
            var chart = new google.visualization.LineChart(document.getElementById('myChart1'));
            chart.draw(data1, options1);
        }

        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart2);
        function drawChart2() {
            var data2 = google.visualization.arrayToDataTable([
                ['Contry', 'Mhl'],
                ['Italy', 55],
                ['France', 49],
                ['Spain', 44],
                ['USA', 24],
                ['Argentina', 15]
            ]);

            var options2 = {
                title: 'World Wide Wine Production'
            };

            var chart = new google.visualization.BarChart(document.getElementById('myChart2'));
            chart.draw(data2, options2);
        }




        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart3);
        function drawChart3() {
            var data3 = google.visualization.arrayToDataTable([
                ['Contry', 'Mhl'],
                ['Italy', 54.8],
                ['France', 48.6],
                ['Spain', 44.4],
                ['USA', 23.9],
                ['Argentina', 14.5]
            ]);

            var options3 = {
                title: 'World Wide Wine Production'
            };

            var chart = new google.visualization.PieChart(document.getElementById('myChart3'));
            chart.draw(data3, options3);
        }

