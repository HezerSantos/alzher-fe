import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const scatterData = [
  { dailyAverage: 372, dateOfMonth: 1 },
  { dailyAverage: 281, dateOfMonth: 2 },
  { dailyAverage: 498, dateOfMonth: 3 },
  { dailyAverage: 306, dateOfMonth: 4 },
  { dailyAverage: 414, dateOfMonth: 5 },
  { dailyAverage: 228, dateOfMonth: 6 },
  { dailyAverage: 578, dateOfMonth: 7 },
  { dailyAverage: 333, dateOfMonth: 8 },
  { dailyAverage: 491, dateOfMonth: 9 },
  { dailyAverage: 253, dateOfMonth: 10 },
  { dailyAverage: 462, dateOfMonth: 11 },
  { dailyAverage: 216, dateOfMonth: 12 },
  { dailyAverage: 389, dateOfMonth: 13 },
  { dailyAverage: 445, dateOfMonth: 14 },
  { dailyAverage: 278, dateOfMonth: 15 },
  { dailyAverage: 397, dateOfMonth: 16 },
  { dailyAverage: 562, dateOfMonth: 17 },
  { dailyAverage: 349, dateOfMonth: 18 },
  { dailyAverage: 417, dateOfMonth: 19 },
  { dailyAverage: 293, dateOfMonth: 20 },
  { dailyAverage: 538, dateOfMonth: 21 },
  { dailyAverage: 267, dateOfMonth: 22 },
  { dailyAverage: 429, dateOfMonth: 23 },
  { dailyAverage: 310, dateOfMonth: 24 },
  { dailyAverage: 380, dateOfMonth: 25 },
  { dailyAverage: 255, dateOfMonth: 26 },
  { dailyAverage: 468, dateOfMonth: 27 },
  { dailyAverage: 514, dateOfMonth: 28 },
  { dailyAverage: 234, dateOfMonth: 29 },
  { dailyAverage: 490, dateOfMonth: 30 },
  { dailyAverage: 321, dateOfMonth: 31 }
];

const DailyScatterChart: React.FC = () => {
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
        <YAxis type="number" dataKey="dailyAverage" name="average" unit="usd" />
        <XAxis type="number" dataKey="dateOfMonth" name="dateOfMonth" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={scatterData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default DailyScatterChart;
