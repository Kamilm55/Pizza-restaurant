import Image from 'next/image'
import React from 'react'

const Product = () => {
    const pizza =  {
        id:1,
        title:'CAMPAGNOLA' ,
        prices: [19.90 , 25.2 , 30.5],
        description:' Lorem ipsum, dolor sit am error nisi, aut ',
        imgUrl:'/img/pizza.png' ,
    };
  return (
    <div className='mt-5 py-4'>
         <div className='p-relative img-parent' >
        <Image  src={pizza.imgUrl} fill  alt='img' style={{objectFit:"contain"}}/>
      </div>
        <h6 className='text-center text-red'>{pizza.title}</h6>    
        <h6 className='text-center'>${pizza.prices[0]}</h6>
        <p className='text-muted text-center'>{pizza.description}</p>    
    </div>
  )
}

export default Product