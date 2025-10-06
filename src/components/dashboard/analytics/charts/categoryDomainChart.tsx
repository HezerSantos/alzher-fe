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
          stroke="#0c2519ff"
          fill="#0c2519ff"
          fillOpacity={0.6}
        />
        
        {/* Radar for Yearly Average */}
        <Radar
          name="Yearly Average"
          dataKey="Yearly Average"
          stroke="#afe5f0ff"
          fill="#afe5f0ff"
          fillOpacity={0.6}
        />

        {/* Radar for Monthly Average */}
        <Radar
          name="Monthly Average"
          dataKey="Monthly Average"
          stroke="#0de49cff"
          fill="#0de49cff"
          fillOpacity={0.6}
        />

        {/* Radar for Daily Average */}
        <Radar
          name="Daily Average"
          dataKey="Daily Average"
          stroke="#06134eff"
          fill="#06134eff"
          fillOpacity={0.6}
        />

        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default CategoryDomainChart