// MyChartComponent.js
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const MyChartComponent = ({ data }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        // Si ya existe un gráfico, destruirlo antes de crear uno nuevo
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Crear el gráfico
        chartRef.current = new Chart(canvasRef.current, {
            type: 'bar', // Puedes usar cualquier tipo de gráfico
            data: data,
            options: {
                // Opciones del gráfico (como escalas, leyenda, etc.)
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                scales: {
                    x: {
                        type: 'category', // Asegúrate de usar la escala correcta
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            }
        });

        return () => {
            // Limpiar el gráfico cuando el componente se desmonte
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return <canvas ref={canvasRef}></canvas>;
};

export default MyChartComponent;
