import Image from 'next/image'
import React, { useState } from 'react'

const Slider = () => {
    const [index , setIndex] = useState(0);
    const imageUrl = ['featured1','featured2','featured3'];
    
  return (
    <>
        <Image onClick={()=>{
            index === 0 ? setIndex(2) : setIndex(index - 1)
        }}  className='arrowSign c-pointer' src={'/img/arrowl.png'} width={100} height={100} alt="img" style={{objectFit:"contain"}}/>
        <div className="img-wrapper d-flex" style={{transform:`translateX(-${index * 100}vw)`}} >
            {imageUrl.map((sliderItem,i) => {
                return (
                    <div className='img-container' key={i} >
                        <Image className='bg-red' src={`/img/${sliderItem}.png`}  fill alt="img" style={{objectFit:"contain"}}/>
                    </div>
                    )
            })}

        </div>
        <Image onClick={()=>{
            index === 2 ? setIndex(0) : setIndex(index + 1)
        }} className='arrowSign c-pointer'  src={'/img/arrowr.png'}  width={100} height={100} alt="img" style={{objectFit:"contain"}}/>
    </>
  )
}

export default Slider