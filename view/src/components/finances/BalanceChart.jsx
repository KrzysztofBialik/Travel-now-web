import React from 'react';
import { Box } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect } from "react";



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export const BalanceChart = ({ balancesData, allUsers }) => {

    const boxHeight = 42 * balancesData.length + 60;
    console.log("All data");
    console.log(balancesData);

    const balancesLabels = balancesData.map(balance => balance.user);
    // // console.log(balancesLabels);
    const balancesValues = balancesData.map(balance => balance.balance);
    // console.log(balancesValues);

    const usersWithBalancesId = balancesData.map(user => user.id);

    // const allUsersMapped = allUsers.map(user => user.id === usersWithBalancesId.some(user.id) ?
    //     console.log("tak") : console.log("nie"))
    // balancesData.find(balance => balance.id === user.id) : ({ id: user.id, user: user.fullName, balance: 0 }));
    // console.log("Mapped users");
    // console.log(allUsersMapped);

    // const mappedBalances = allUsersMapped.map(user => usersWithBalancesId.indexOf(user.id) < 0 ?
    //     balancesData.some(user) :
    //     user);
    // console.log("Mapped balances");
    // console.log(mappedBalances);

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