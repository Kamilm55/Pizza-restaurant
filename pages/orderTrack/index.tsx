import Cart from '@/components/Cart'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'

const OrderTrack = ({data}:any) => {
    let status = 0;
    let discount = 0;
    if(data.length > 0){
        discount = 10 ;
       status = data[data.length - 1].status ;// it can be 0 1 2 3
        //   0 1 2 3
    }

    const statusClass = (index:number) => {
        if(index - status  < 1) return "done";
        if(index - status === 1) return "inProgress";
        if(index - status > 1) return "undone";
    }
    let subTotal = 0 ;
    data.forEach( (pizza:any) => subTotal += pizza.total) ;
    
  return (
    <div className='container-fluid top100'>
        <Head>
            <title>Pizza Restaurant | Orders-track</title>
        </Head>
    <div className="row">
    <div className="col-md-4 col-12 mb-4 order-md-2">
        <Cart btnName="PAID" subTotal={subTotal} discount={discount * data.length }/>
    </div>

        <div className="col-md-8 col-12  order-md-1">
    <table className="table table-striped ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Order ID</th>
      <th scope="col">Customer</th>
      <th scope="col">Address</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
  {data.map((pizza:any,i:number) => {
    return (
        <tr key={i}>
            <th scope="row">{i}</th>
            <td>{pizza._id}</td>
            <td>{pizza.customer}</td>
            <td>{pizza.address}</td>
            <td>$ {Number(pizza.total.toFixed(2))}</td>
        </tr>
    )
  })}
   </tbody>
    </table>
    {data.length > 0 ? (
         <div className='d-flex gap-5 m-4 '>
         <div className={`d-flex flex-column gap-1 ${statusClass(0)} `}>
             <Image className={`mx-auto `} src={'/img/paid.png'} width={50} height={50} alt="img"/>
             <p>Payment</p>
             <Image className='mx-auto checkedIcon' src={'/img/checked.png'} width={25} height={25} alt="img"/>
         </div>
         <div className={`d-flex flex-column gap-1 ${statusClass(1)}`}>
             <Image className={`mx-auto `} src={'/img/bake.png'} width={50} height={50} alt="img"/>
             <p>Preparing</p>
             <Image className='mx-auto checkedIcon' src={'/img/checked.png'} width={25} height={25} alt="img"/>
         </div>
         <div className={`d-flex flex-column gap-1 ${statusClass(2)}`}>
             <Image className={`mx-auto }`} src={'/img/bike.png'} width={50} height={50} alt="img"/>
             <p>On the way</p>
             <Image className='mx-auto checkedIcon ' src={'/img/checked.png'} width={25} height={25} alt="img"/>
         </div>
         <div className={`d-flex flex-column gap-1 ${statusClass(3)}`}>
             <Image className={`mx-auto }`} src={'/img/delivered.png'} width={50} height={50} alt="img"/>
             <p>Delivered</p>
             <Image className='mx-auto checkedIcon' src={'/img/checked.png'} width={25} height={25} alt="img"/>
         </div>
     </div>
    ) : <h2 className='text-center mt-4'>{"You don't have any order yet!"}</h2>}
       
    </div>

</div>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const URL = process.env.NODE_ENV === 'production' ? "https://pizza-next-theta.vercel.app" : "http://localhost:3000";

    const res = await fetch(`${URL}/api/Orders`);
    const data = await res.json();

    return {
        props:{
            data:data
        }
    }
}

export default OrderTrack