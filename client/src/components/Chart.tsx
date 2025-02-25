import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts"

interface IChart {
    totalIncome: number,
    totalExpense: number
}

interface IData {
    value: number,
    name: string
}

const COLORS: string[] = ['#00C49F', '#FF8042']

const Chart: React.FunctionComponent<IChart> = ({ totalExpense, totalIncome }) => {

    const data = new Array<IData>(
        {value: totalIncome, name: 'Income'},
        {value: totalExpense, name: 'Expense'}
    )

    return (
        <div>
            <PieChart width={390} height={240}>
                <Pie
                    data={data}
                    cx={'50%'}
                    cy={'50%'}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
                <Tooltip />
            </PieChart>
        </div>
    )
}

export default Chart