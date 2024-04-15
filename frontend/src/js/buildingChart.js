function searchTimeLimit() {
    const ctx = document.getElementById('valuesChart')
    const hour = document.getElementById('timeLimitSelect').value
    const measures = []
    const equipments = []
    const avaregeValues = []
    const chart = Chart.getChart(ctx)

    //Destroying chart if it is already set
    if (chart) chart.destroy()
    
    $.get(`/findByPeriod/${hour}`)
        .done( data => {
            //Formating the data received
            Object.values(data)[0].forEach(element => {
                measures.push(element)
            })

            measures.forEach(element => {
                if (equipments.indexOf(element.equipmentId) == -1) {
                    equipments.push(element.equipmentId)
                }
            })
            
            //Calculating the avarege value of each equipment

            equipments.forEach((equipment, equipmentsIndex) => {
                let quanitityOfValues = 0
                avaregeValues.push(0)
            measures.forEach( (element) => {
                
                if (element.equipmentId == equipment) {
                    avaregeValues[equipmentsIndex] = element.value + avaregeValues[equipmentsIndex]
                    quanitityOfValues++

                }
            })
            avaregeValues[equipmentsIndex] = avaregeValues[equipmentsIndex]/quanitityOfValues
            
            })
            //Setting the chart
            new Chart(ctx, {
                type: 'bar',
                  data: {
                      labels: equipments,
                      datasets: [{
                      label: 'Equipment average values',
                      data: avaregeValues,
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

        })
        .fail( err => console.log('Error: ',err))

}


      

