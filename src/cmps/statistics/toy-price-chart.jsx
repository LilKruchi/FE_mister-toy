import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../../services/toy.service.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: toyService.labels,
    datasets: [
        {
            label: '% in stock',
            data: [1, 2, 3, 4, 5, 6, 7, 8],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export function ToyPriceChart() {
    return (
        <Doughnut data={data}
            // height="200px"
            // width="200px"
            options={{ maintainAspectRatio: false }}
        />)
}
