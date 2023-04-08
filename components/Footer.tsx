import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-blue '>
      <div className="row d-flex flex-sm-column flex-md-row">
      <div className="item-wrapper d-flex col-md-6">
        <div className="footer-item ">
          <Image src="/img/pizzaImg.jpg" width={300} height={300} alt='img' />
        </div>
        <div className="footer-item d-none d-md-block col-md-3 py-5 px-2 mx-5"><h4>OH YES WE DID THE JUST PIZZA ,WELL BAKED SLICE OF PIZZA</h4></div>
      </div>

      <div className="item-wrapper d-flex col-md-5">
        <div className="footer-item  col-sm-6 p-4 m-3">
          <h5 className='text-yellow'>FIND OUR RESTAURANTS</h5>
          <p>1654 R. Lorem ipsum dolor #304 NewYork, 1896 sit amet</p>
          <br />
          <p>1654 R. Lorem ipsum dolor #304 NewYork, 1896 sit amet</p>
        </div>
        <div className="footer-item  col-sm-6 p-4  px-1 m-3 ">
          <h5 className='text-yellow'>FIND OUR RESTAURANTS</h5>
          <p>1654 R. Lorem ipsum dolor #304 NewYork, 1896 sit amet</p>
          <br />
          <p>1654 R. Lorem ipsum dolor #304 NewYork, 1896 sit amet</p>
        </div>
      </div>
      </div>
     
    </footer>
  )
}

export default Footer