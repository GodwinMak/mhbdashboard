import React, {useState} from 'react'
import Sidebar from '../component/Sidebar'
import { Outlet } from 'react-router-dom'
import TopNav from '../component/TopNav'
import './dashboard.css'

const Dashboard = () => {
    const [show, setShow] = useState(false)

  return (
    <div className='main'>
        <Sidebar setShow={setShow} show={show} />
        <div className={show === true ? "maincontent active" : "maincontent"}>
            <TopNav/>
            <Outlet />
        </div>

    </div>
  )
}

export default Dashboard