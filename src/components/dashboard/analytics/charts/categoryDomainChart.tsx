import React from 'react';
import { PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer, Radar, RadarChart, PolarGrid } from 'recharts';


interface CategoryDomainChartDataType {
    category: string | undefined,
    ['Yearly Average']: number | undefined,
    ['Monthly Average']: number | undefined,
    ['Daily Average']: number | undefined,
    total: number | undefined
}

interface CategoryDomainChartProps {
    categoryData: CategoryDomainChartDataType[] | undefined | null
}

const CategoryDomainChart: React.FC<CategoryDomainChartProps> = ({categoryData}) => {

    if(!categoryData){
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
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoryData}>
        <Tooltip />
        <PolarGrid />
        <PolarAngleAxis dataKey="category" />
        <PolarRadiusAxis angle={50} domain={[0, 5000]}/>
        
        {/* Radar for Total */}
        <Radar
          name="Total Spending"
          dataKey="total"
          stroke="#4C9457"
          fill="#4C9457"
          fillOpacity={0.6}
        />
        
        {/* Radar for Yearly Average */}
        <Radar
          name="Yearly Average"
          dataKey="Yearly Average"
          stroke="#ff7300"
          fill="#ff7300"
          fillOpacity={0.6}
        />

        {/* Radar for Monthly Average */}
        <Radar
          name="Monthly Average"
          dataKey="Monthly Average"
          stroke="#387908"
          fill="#387908"
          fillOpacity={0.6}
        />

        {/* Radar for Daily Average */}
        <Radar
          name="Daily Average"
          dataKey="Daily Average"
          stroke="#B59DC1"
          fill="#B59DC1"
          fillOpacity={0.6}
        />

        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default CategoryDomainChart