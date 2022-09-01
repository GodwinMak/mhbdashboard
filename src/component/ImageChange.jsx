import React, {useState, useEffect} from 'react'
import './imagechange.css'

import aa from '../assets/images/img1.jpeg'
import aa2 from '../assets/images/img2.jpeg'
import aa3 from '../assets/images/img3.jpeg'
import aa4 from '../assets/images/img4.jpeg'
import aa5 from '../assets/images/img5.jpeg'
import aa6 from '../assets/images/img6.jpeg'
import aa7 from '../assets/images/img7.jpeg'
import aa8 from '../assets/images/img8.jpeg'



const ImageChange = () => {
    const images = [aa4, aa3, aa2, aa, aa5, aa6, aa7, aa8];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentIndex === images.length - 1) {
                setCurrentIndex(0);
            }
            else {
                setCurrentIndex(currentIndex + 1);
            }
        }, 5000)

        return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='container'>
            <img src={images[currentIndex]} alt='' />
        </div>
    )
}

export default ImageChange