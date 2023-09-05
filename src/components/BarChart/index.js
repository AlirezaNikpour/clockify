import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useProjectsContext } from '../../context/ProjectsContext';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Project Duration Report',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

function BarChart() {
    const { projectsState } = useProjectsContext();

    const weekDays = {
        Sunday: {},
        Monday: {},
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
        Saturday: {},
    };

    // Initialize project names and total project duration for each day
    projectsState.forEach(project => {
        Object.keys(weekDays).forEach(dayOfWeek => {
            weekDays[dayOfWeek][project.name] = project.totalProjectDuration;
        });
    });

    const labels = Object.keys(weekDays);
    const datasets = projectsState.map(project => ({
        label: project.name,
        data: labels.map(day => weekDays[day][project.name] || '00:00:00'),
        backgroundColor: project.projectColor,
    }));
    console.log(datasets)
    const data = {
        labels,
        datasets,
    };

    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    );
}

export default BarChart;
