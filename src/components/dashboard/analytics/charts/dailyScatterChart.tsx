import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



interface DailyScatterChartProps {
    scatterData: {
        dailyAverage: number,
        dateOfMonth: number
    }[] | undefined | null
}

const DailyScatterChart: React.FC<DailyScatterChartProps> = ({scatterData}) => {
    if(!scatterData){
        return(
            <>
                <div className='empty-chart'>
                    <p>No Data Avaliable</p>
                </div>
            </>
        )
    }
    return (
        <ResponsiveContainer width="100%" height={"100%"}>
        <ScatterChart
            margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
            }}
        >
            <CartesianGrid />
            <YAxis type="number" dataKey="dailyAverage" name="average" unit=" USD" />
            <XAxis type="number" dataKey="dateOfMonth" name="dateOfMonth" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={scatterData} fill="#2e473b" />
        </ScatterChart>
        </ResponsiveContainer>
    );
};

export default DailyScatterChart;
