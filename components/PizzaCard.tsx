import Image from 'next/image'
import React from 'react'

const PizzaCard = ({pizza}:any) => {
  return (
    <div className='p-card p-3 mx-auto my-2  c-pointer'>
      <div className='p-relative img-parent' >
        <Image  src={pizza.imgUrl} fill  alt='img' style={{objectFit:"contain"}}/>
      </div>
        <h6 className='text-center text-red'>{pizza.title}</h6>    
        <h6 className='text-center'>${pizza.prices[0]}</h6>
        <p className='text-muted text-center'>{pizza.description}</p>    
    </div>
  )
}

export default PizzaCard