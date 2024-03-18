document.addEventListener('DOMContentLoaded', function() {
  const seaTemperatureSlider = document.getElementById('seaTemperature');
  const pressureSlider = document.getElementById('pressure');
  const seaTemperatureValue = document.getElementById('seaTemperatureValue');
  const pressureValue = document.getElementById('pressureValue');

  seaTemperatureSlider.addEventListener('input', updateTemperature);
  pressureSlider.addEventListener('input', updatePressure);

  let chartInterval; // Variável para armazenar o intervalo de atualização do gráfico

  function updateTemperature() {
      const temperature = seaTemperatureSlider.value;
      seaTemperatureValue.textContent = temperature + '°C';
      updateChart();
  }

  function updatePressure() {
      const pressure = pressureSlider.value;
      pressureValue.textContent = pressure + ' hPa';
      updateChart();
  }

  function updateChart() {
      const temperature = parseFloat(seaTemperatureSlider.value);
      const pressure = parseFloat(pressureSlider.value);
      let windSpeed = Math.sqrt(temperature * (pressure / 1013.25));

      const ctx = document.getElementById('chart').getContext('2d');

      clearInterval(chartInterval); // Limpa o intervalo anterior para evitar múltiplas execuções simultâneas

      chartInterval = setInterval(() => {
          windSpeed += Math.random() * 0.5 - 0.25; // Simula mudanças aleatórias na velocidade do vento
          const chart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: ['0h', '3h', '6h', '9h', '12h'],
                  datasets: [{
                      label: 'Velocidade do Vento (m/s)',
                      data: [windSpeed, windSpeed * 1.1, windSpeed * 1.3, windSpeed * 1.2, windSpeed * 1.1],
                      borderColor: 'rgb(75, 192, 192)',
                      tension: 0.1
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });

          // Verifica se a velocidade do vento atinge um ponto crítico (por exemplo, 20 m/s) e exibe um alerta
          if (windSpeed >= 20) {
              alert('Alerta: Furacão em potencial! Ventos muito fortes detectados.');
          }
      }, 3000); // Atualiza o gráfico a cada 3 segundos
  }

  updateChart();
});
