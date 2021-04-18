       chartit();
    async function chartit(){
            var data= await getSales();       
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.xs ,
                    datasets: [{
                        label: '# of Votes',
                        data: data.ys,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        
                        borderColor: 'rgba(255, 99, 132, 1)',
                            
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }


async function getSales(){
    var xs= [];
    var ys= [];

    for(let i=0; i<report.length;i++){

    
    ys.push(report[i].todaySales);
    xs.push(report[i].d);
    }

    return {xs,ys};
}          
