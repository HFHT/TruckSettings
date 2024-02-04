import './charts.css'
import { Bar, BarChart as ReBarChart, CartesianGrid, Legend, Line, LineChart as ReLineChart, Sankey as ReSankey, Text, Tooltip, XAxis, YAxis } from "recharts"

interface ICharts {
    data: any
    dataKeys: string[]
    width?: number
    height?: number
    className?: string
    title?: string
    note?: string
}
export function StackedBar({ data, dataKeys, width = 500, height = 300, title, note = '' }: ICharts) {
    return (
        <div className='chartdiv'>
            {title && <div className='charttitle'><h2 >{title}</h2><sub className='chartnote'>{note}</sub></div>}

            <ReBarChart
                className='chartarea'
                width={width}
                height={height}
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
            </ReBarChart>
        </div>
    )
}
export function LineChart({ data, dataKeys, width = 500, height = 300 }: ICharts) {
    return (
        <ReLineChart
            width={width}
            height={height}
            data={data}
            margin={{
                top: 5,
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
            <Line
                type="monotone"
                dataKey={dataKeys[1]}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey={dataKeys[2]} stroke="#82ca9d" />
        </ReLineChart>
    )
}

export function BiAxialLineChart({ data, dataKeys, width = 500, height = 300 }: ICharts) {
    return (
        <ReLineChart
            width={width}
            height={height}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeys[0]} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
                yAxisId="left"
                type="monotone"
                dataKey={dataKeys[1]}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <Line yAxisId="right" type="monotone" dataKey={dataKeys[2]} stroke="#82ca9d" />

        </ReLineChart>
    )
}
export function Sankey({ data, dataKeys, width = 500, height = 300 }: ICharts) {
    return (
        <ReSankey
            width={960}
            height={500}
            data={data}
            node={<MyCustomNode mt={20} ml={20} />}
            // node={{stroke: 'red', strokeWidth: 2}}

            nodePadding={50}
            margin={{
                left: 20,
                right: 100,
                top: 20,
                bottom: 40,
            }}
            link={{ stroke: '#77c878' }}
        >
            <Tooltip />
        </ReSankey>
    )
    function MyCustomNode(props: any) {
        const labelOffset = Math.round(props.payload.dy / 3)
        return <>
            <path
                x={props.x} y={props.y}
                width={props.payload.dx} height={props.payload.dy} radius={0}
                fill='#0088fe' fillOpacity={0.8}
                stroke='green'
                strokeWidth={2} role='img'
                className='recharts-rectangle recharts-sankey-node'
                d={`M ${props.x}, ${props.y} h ${props.payload.dx} v ${props.payload.dy} h -10 Z`}
            >
                Stuff
            </path>
            <g className='chartnodetext'>
                <text x={props.x} y={props.y} dx={props.payload.dx + 5} dy={labelOffset}>{props.payload.name}</text>
                <text x={props.x} y={props.y} dx={props.payload.dx + 5} dy={labelOffset + 20}>{props.payload.value}</text>
            </g>
        </>
    }
}