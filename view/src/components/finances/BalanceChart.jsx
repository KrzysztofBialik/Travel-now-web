import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { doGet } from "../utils/fetch-utils";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export const BalanceChart = ({ balancesData }) => {

    const boxHeight = 42 * balancesData.length + 60;
    const [currency, setCurrency] = useState("");
    const { groupId } = useParams();

    const getCurrency = async () => {
        var resp = await doGet('/api/v1/trip-group/data?' + new URLSearchParams({ groupId: groupId }).toString())
            .then(response => response.json())
            .then(response => {
                var currency = response.currency;
                setCurrency(currency);
            })
            .catch(err => console.log('Request Failed', err));
    };

    useEffect(() => {
        getCurrency();
    }, []);

    const balances = balancesData.map(balance => balance.balance);
    const maxBalance = Math.max(...balances);
    const minBalance = Math.min(...balances);
    const balancesLabels = balancesData.map(balance => balance.user);
    const balancesValues = balancesData.map(balance => balance.balance);
    const backgroundColors = balancesData.map(balance => (balance.balance >= 0) ? "#8EEC44" : "#FF5151");
    // --------------------------------------WERSJA 1--------------------------------------
    // const labelAnchors = balancesData.map(balance => (balance.balance >= 0) ? "start" : "end");
    // const labelAligns = balancesData.map(balance => (balance.balance >= 0) ? "left" : "right");
    // --------------------------------------WERSJA 2--------------------------------------
    // const labelAnchors = balancesData.map(balance => (balance.balance >= 0) ? "start" : "end");
    const labelAnchors = balancesData.map(balance => (balance.balance < minBalance / 2) ? "center" : balance.balance < 0 ? "start" : balance.balance > maxBalance / 2 ? "center" : "end");
    const labelAligns = balancesData.map(balance => (balance.balance < minBalance / 2) ? "center" : balance.balance < 0 ? "left" : balance.balance > maxBalance / 2 ? "center" : "right");

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
                    align: labelAligns,
                    font: {
                        weight: "700"
                    },
                    formatter: function (value, context) {
                        return context.chart.data.datasets[0].data[context.dataIndex] + " " + currency
                    }
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