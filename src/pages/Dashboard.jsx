import React, {useEffect} from 'react'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector, useDispatch } from 'react-redux'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

import statusCards from '../assets/JsonData/status-card-data.json'

import ThemeAction from '../redux/actions/ThemeAction'



const chartOptions = {
  series: [{
    name: 'Online Customers',
    data: [40,70,20,90,36,80,30,91,60,]
  }, {
    name: 'Srote Customers',
    data: [40,30,70,80,40,16,40,20,50,51,10]
  }],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    },
    legend: {
      position: 'top'
    },
    grid: {
      show: false
    }
  }
}

const topCustomers ={
  head: [
    'user',
    'total orders',
    'total spending'
  ],
  body: [
    {
      "username": "Daniel Carvalho",
      "order": "142",
      "price": "$15,800"
    },
    {
      "username": "Sarah Morais",
      "order": "741",
      "price": "$4,300"
    },
    {
      "username": "George Anderson",
      "order": "172",
      "price": "$123"
    },
    {
      "username": "Marcos Eduardo",
      "order": "104",
      "price": "$742,41"
    }
  ]
}

const renderCustomerHead = (item, index) => (
  <th key={index}>{item}</th>
  )

const renderCustomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
)

const latestOrders = {
  header: [
      "order id",
      "user",
      "total price",
      "date",
      "status"
  ],
  body: [
      {
          id: "#GRD147852",
          user: "Daniel Carvalho",
          date: "03 May 2017",
          price: "$4900",
          status: "paid"
      },
      {
          id: "#GRD124782",
          user: "Guilherme Barreto",
          date: "19 Jan 2020",
          price: "$400",
          status: "refund"
      },
      {
          id: "#GRD785332",
          user: "Sarah Morais",
          date: "7 Dec 2019",
          price: "$1200",
          status: "pending"
      },
      {
          id: "#GRD444652",
          user: "Tatiana Rocha",
          date: "29 Apr 2020",
          price: "$1230",
          status: "paid"
      },
      {
          id: "#GRD194850",
          user: "Marcos Eduardo",
          date: "12 Aug 2018",
          price: "$400",
          status: "shipping"
      }
  ]
}

const orderStatus = {
  "shipping": "primary",
  "pending": "warning",
  "paid": "success",
  "refund": "danger"
}

const renderOrderHead = (item, index) => (
  <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status}/>
    </td>
  </tr>
)

const Dashboard = () => {

  const ThemeReducer = useSelector(state => state.ThemeReducer.mode)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ThemeAction.getTheme())
  })

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>  
      <div className="row">
        <div className="col-6">
          <div className="row">
            {
              statusCards.map((item, index) =>(
                <div className="col-6" key={index}>
                  {/* status card here */}
                  {item.title}
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))
            }
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            {/* chart */}
            <Chart
              options={ThemeReducer === 'theme-mode-dark' ? {
                ...chartOptions.options,
                theme: {mode: 'dark'}
              } : {
                ...chartOptions.options,
                theme: {mode: 'light'}              
              }}
              series={chartOptions.series}
              type='line'
              height='100%'
            />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>top customers</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item ,index) => renderCustomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCustomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to='/'>viel all</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>latest orders</h3>
            </div>
            <div className="card__body">
              <Table
              headData={latestOrders.header}
              renderHead={(item, index) => renderOrderHead(item, index)}
              bodyData={latestOrders.body}
              renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to='/'>view all</Link>
            </div>
          </div>
        </div>
      </div>    
    </div>
  )
}

export default Dashboard
