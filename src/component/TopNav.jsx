import React, {useState} from 'react'
import './topnav.css'

const TopNav = () => {
    const Clock = () => {
        let time = new Date().toLocaleTimeString();
        const [currentTime, setCurrentTime] = useState(time)

        const updateTime = () => {
            let time = new Date().toLocaleTimeString();
            setCurrentTime(time);
        }
        setInterval(updateTime, 1000);
        return (
            <div>
                <span><strong>{currentTime}</strong></span>
            </div>
        )

    }
  return (
    <div className="topnav">
        <div className="topnav__right">
            <div className="top__right-item">
                <Clock />
            </div>
        </div>
    </div>
  )
}

export default TopNav