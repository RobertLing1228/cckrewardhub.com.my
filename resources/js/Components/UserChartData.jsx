import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Chart({ chartData }) {
    const labels = chartData.map(item => item.date);
    const data = chartData.map(item => item.count);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Unique Logins</h3>
            <div className="w-full h-72">
                <Line
                    data={{
                        labels,
                        datasets: [{
                            label: 'Unique Logins',
                            data,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false
                    }}
                />
            </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Unique Logins</h3>
            <div className="w-full h-72">
                <Line
                    data={{
                        labels,
                        datasets: [{
                            label: 'Unique Logins',
                            data,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false
                    }}
                />
            </div>
        </div>
        </div>
    );
}
