import React from 'react';
import { Box } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// export const options = {
//     indexAxis: 'y',
//     elements: {
//         bar: {
//             borderWidth: 2,
//         },
//     },
//     responsive: true,
//     plugins: {
//         // legend: {
//         //     position: 'right',
//         // },
//         // title: {
//         //     display: true,
//         //     text: 'Chart.js Horizontal Bar Chart',
//         // },
//     },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//     labels,
//     datasets: [
//         {
//             // label: 'Dataset 1',
//             data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//             borderColor: data > 0 ? 'rgb(255, 99, 132)' : 'rgb(120, 12, 254)',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//         },
//     ],
// };

// const config = {
//     type: 'bar',
//     data,
//     options: {
//         indexAxis: 'y',
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// };


export const BalanceChart = ({ balancesData }) => {

    const boxHeight = 42 * balancesData.length + 60;
    console.log(boxHeight);
    console.log("All data");
    console.log(balancesData);
    // const negativeBalances = balancesData.filter(balance => balance.balance < 0).map(balance => balance);
    // const positiveBalances = balancesData.filter(balance => balance.balance >= 0).map(balance => balance);
    // console.log("Negative data");
    // console.log(negativeBalances);
    // console.log("Positive data");
    // console.log(positiveBalances);
    // const negativeBalancesLabels = negativeBalances.map(balance => balance.user)
    // const positiveBalancesLabels = positiveBalances.map(balance => balance.user)
    // balancesData.sort((a, b) => b.balance - a.balance);
    // console.log(balancesData);
    const balancesLabels = balancesData.map(balance => balance.user);
    console.log(balancesLabels);
    const balancesValues = balancesData.map(balance => balance.balance);
    console.log(balancesValues);

    const backgroundColors = balancesData.map(balance => (balance.balance >= 0) ? "#8EEC44" : "#FF5151");
    const borderColors = balancesData.map(balance => (balance.balance >= 0) ? "#7DF022" : "#FF5151");
    const labelAnchors = balancesData.map(balance => (balance.balance >= 0) ? "end" : "start");
    const labelAligns = balancesData.map(balance => (balance.balance >= 0) ? "right" : "left");


    const data = {
        labels: balancesLabels,
        datasets: [
            {
                data: balancesValues,
                backgroundColor: backgroundColors,
                borderWidth: 1,
                datalabels: {
                    color: "#000000",
                    anchor: labelAnchors,
                    // anchor: "center",
                    align: labelAligns,
                    // align: "center",
                    font: {
                        weight: "700"
                    },
                    clip: true
                }
            },
        ]
    };

    const options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        layout: {
            padding: 0
        },
        scales: {
            x: {
                ticks: {
                    color: '#24939e',
                    beginAtZero: true
                },
                grid: {
                    display: true
                }
            },
            y: {
                ticks: {
                    color: '#24939e',
                    beginAtZero: true
                },
                grid: {
                    display: true
                }
            }
        },
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            ChartDataLabels,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Participants balances',
                font: {
                    size: 24,
                    family: 'Calibri'
                },
                color: "#24939e"
            },
        }

    };

    return (
        <Box sx={{ height: boxHeight }}>
            <Bar options={options} data={data} />
        </Box>
    );
};