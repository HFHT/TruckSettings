import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"

export function StackedBar({ data, dataKeys }: any) {
    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeys[0]} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKeys[1]} stackId="a" fill="#8884d8" />
            <Bar dataKey={dataKeys[2]} stackId="a" fill="#82ca9d" />
            <Bar dataKey={dataKeys[3]} stackId="a" fill="#355c9b" />
        </BarChart>
    )
}