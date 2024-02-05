import './charts.css'
import { Bar, BarChart as ReBarChart, CartesianGrid, Legend, Line, LineChart as ReLineChart, Sankey as ReSankey, Text, Tooltip, XAxis, YAxis, AreaChart, Area } from "recharts"

interface ICharts {
    data: any
    dataKeyX: string
    dataKeysY: ChartDataKey[]
    width?: number
    height?: number
    className?: string
    title?: string
    note?: string
}
export type ChartDataKey = {
    key: string
    color: string
}
export function StackedBar({ data, dataKeyX, dataKeysY, width = 320, height = 300, title, note = '' }: ICharts) {
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
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey={dataKeyX} />
                <YAxis />
                <Tooltip />
                <Legend />
                {dataKeysY.map((dataKey: ChartDataKey, idx: number) => (
                    <Bar key={idx} dataKey={dataKey.key} stackId="a" fill={dataKey.color} />
                ))}
            </ReBarChart>
        </div>
    )
}
export function StackedArea({ data, dataKeyX, dataKeysY, width = 320, height = 300, title, note = '' }: ICharts) {
    return (
        <div className='chartdiv'>
            {title && <div className='charttitle'><h2 >{title}</h2><sub className='chartnote'>{note}</sub></div>}
            <AreaChart
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
                <XAxis dataKey={dataKeyX} />
                <YAxis />
                <Tooltip />
                <Legend />
                {dataKeysY.map((dataKey: ChartDataKey, idx: number) => (
                    <Area key={idx}
                        type="monotone"
                        dataKey={dataKey.key}
                        stackId="1"
                        stroke={dataKey.color}
                        fill={dataKey.color}
                    />
                ))}
            </AreaChart>
        </div>
    )
}
export function LineChart({ data, dataKeyX, dataKeysY, width = 320, height = 300, title, note = '' }: ICharts) {
    return (
        <div className='chartdiv'>
            {title && <div className='charttitle'><h2 >{title}</h2><sub className='chartnote'>{note}</sub></div>}
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
                <XAxis dataKey={dataKeyX} />
                <YAxis />
                <Tooltip />
                <Legend />
                {dataKeysY.map((dataKey: ChartDataKey, idx: number) => (

                    <Line key={idx}
                        type="monotone"
                        dataKey={dataKey.key}
                        stroke={dataKey.color}
                        activeDot={idx === 0 ? { r: 8 } : false}
                    />
                ))}
            </ReLineChart>
        </div>
    )
}

export function BiAxialLineChart({ data, dataKeyX, dataKeysY, width = 320, height = 300, title, note = '' }: ICharts) {
    return (
        <div className='chartdiv'>
            {title && <div className='charttitle'><h2 >{title}</h2><sub className='chartnote'>{note}</sub></div>}

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
                <XAxis dataKey={dataKeyX} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey={dataKeysY[0].key}
                    stroke={dataKeysY[0].color}
                    activeDot={{ r: 8 }}
                />
                <Line yAxisId="right" type="monotone" dataKey={dataKeysY[1].key} stroke={dataKeysY[0].color} />

            </ReLineChart>
        </div>
    )
}
export function Sankey({ data, dataKeyX, dataKeysY, width = 500, height = 300 }: ICharts) {
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