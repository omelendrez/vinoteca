import React, { useState, useEffect } from 'react'
import { getGraphData } from '../../services/reports.js'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LabelList } from 'recharts'
import Container from '../common/Container'
import { getPeriodName, formatAmount } from '../../helpers'

const OrdersSales = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getGraphData()
      .then(results => {
        const list = []
        results.rows.map(item => list.push({ name: getPeriodName(item.periodName), Compras: item.purchases, Ventas: item.sales }))
        setData(list)
      })
  }, [])

  const renderLabel = props => {
    const {
      x, y, width, value,
    } = props

    return (
      <g>
        <text x={x + width / 2} y={y - 10} fill="#000" textAnchor="middle" dominantBaseline="middle">
          {formatAmount(value)}
        </text>
      </g>
    )
  }

  return (
    <Container
      title="Reportes"
      subTitle="Compras y ventas últimos 12 meses"
      width="is-10"
      background="is-warning"
    >
      <div className="card mt-1">
        <BarChart
          width={640}
          height={480}
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar dataKey="Compras" fill="#8884d8">
            <LabelList dataKey="Compras" content={renderLabel} />
          </Bar>
          <Bar dataKey="Ventas" fill="#82ca9d">
            <LabelList dataKey="Ventas" content={renderLabel} />
          </Bar>
        </BarChart>
      </div>
    </Container>
  )
}

export default OrdersSales