import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,LabelList} from 'recharts';


const Chart = ({data}) => (
    <div style={{fontSize: 12}}>
    <LineChart width={700} height={170} data={data}
            margin={{top: 20, right: 30, left: 30, bottom: 5}}>
       <XAxis dataKey="name"/>
       <Tooltip/>
       <Line type="monotone" dataKey="Temporature" stroke="rgb(255, 204, 0)" activeDot={{r: 8}}>
       <LabelList dataKey="Temporature" position="top" formatter={(temp) => `${temp}°C`} />
       </Line>
      </LineChart>
    </div>
)


export default Chart