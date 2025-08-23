import React from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';





interface YearlyLineChartDataType {
    year: number,
    total: number
}

interface YearlyLineChartProps {
    yearlyData: YearlyLineChartDataType[] | null
}

const YearlyLineChart: React.FC<YearlyLineChartProps> = ({yearlyData}) => {

    if(!yearlyData){
      return(
          <>
              <div className='empty-chart'>
                  <p>No Data Avaliable</p>
              </div>
          </>
      )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={yearlyData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#4C9457" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default YearlyLineChart