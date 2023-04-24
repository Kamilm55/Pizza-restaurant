import Image from 'next/image'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const PizzaCard = ({pizza,loading}:any) => {
  return (
    <div className='p-card p-3 mx-auto my-2  c-pointer'>
      {loading ? (
        <div>
        <div className='p-relative img-parent' >
          <Skeleton width={220} height={300}/>
        </div>
          <h6 className='text-center text-red'><Skeleton/></h6>    
          <h6 className='text-center'><Skeleton /></h6>
          <p className='text-muted text-center'><Skeleton height={40}/></p>    
          </div>
      ) : (
        <div>
      <div className='p-relative img-parent' >
        <Image   src={pizza.img} fill  alt='img' style={{objectFit:"contain"}}/>
      </div>
        <h6 className='text-center text-red'>{pizza.title}</h6>    
        <h6 className='text-center'>${pizza.prices[0]}</h6>
        <p className='text-muted text-center'>{pizza.desc}</p>    
        </div>
      )}
     
    </div>
  )
}

export default PizzaCard