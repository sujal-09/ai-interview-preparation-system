import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function PerformanceChart({ data }) {

    return (

        <div className="bg-slate-900 p-6 rounded-2xl mt-10">

            <h2 className="text-2xl font-bold mb-6">
                Performance Analytics
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#06b6d4"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default PerformanceChart;