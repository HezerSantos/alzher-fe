import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OverviewDataType {
    month: string;
    [year: `${number}`]: number | string;
}

interface OverviewChartProps {
    overviewData: OverviewDataType[],
    yearOne: string,
    yearTwo: string | boolean
}

const OverviewChart: React.FC<OverviewChartProps> = ({overviewData, yearOne, yearTwo}) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={"dashboard-chart"}>
      <BarChart
        width={500}
        height={300}
        data={overviewData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        maxBarSize={50}
      >
        <CartesianGrid strokeDasharray="3 " />
        <XAxis dataKey="month"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={yearOne} fill="#4C9457" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        {(yearTwo && typeof yearTwo === 'string') && (
            <Bar dataKey={yearTwo} fill="#B59DC1" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OverviewChart