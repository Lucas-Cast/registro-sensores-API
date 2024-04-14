
function search() {
    const hour = document.getElementById('timeLimitSelect').value
    
    $.get(`/findByPeriod/${hour}`)
        .done( data => {
            const measures = []
            Object.values(data)[0].forEach(element => {
                measures.push(element)
            })

            const equipments = []
            measures.forEach(element => {
                if (typeof(element.equipmentId) === typeof(' ')) {
                    equipments.push(element.equipmentId);
                }
            });
        })
        .fail( err => console.log('Error: ',err))
}


const ctx = document.getElementById('valuesChart');
      
new Chart(ctx, {
  type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
        label: 'Equipment values',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
    }
})
