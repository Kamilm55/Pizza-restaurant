import Cart from '@/components/Cart'
import { useAppSelector } from '@/REDUX/app/hooks'
import { selectCartDatas } from '@/REDUX/features/cartSlice'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

const Order = () => {
    const pizzas:any = useAppSelector(selectCartDatas);
    // const subTotal = () => (pizzas.reduce((pizza:any) => sum = sum + pizza.total))
    
    const subTotal = () => {
     let sum:number = 0;
        for(let i of pizzas){
            sum = sum + i.total
        }
       return sum;
    }
  return (
    <div className='container-fluid top100'>
        <Head>
            <title>Pizza Restaurant | Cart</title>
        </Head>

    <div className="row">
    <div className="col-md-4 col-12 mb-4 order-md-2">
        <Cart subTotal={Number(subTotal())} discount={10} btnName="CHECKOUT NOW"/>
    </div>

        <div className="col-md-8 col-12 order-md-1">
    <table className="table table-hover ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product</th>
      <th scope="col">Name</th>
      <th scope="col">Extra</th>
      <th scope="col">Price</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
  
  {pizzas.map((pizza:any,i:number) => {
    return (
        <tr key={i}>
            <th scope="row">{i}</th>
            <td><Image src={pizza.img} width={50} height={50} alt='img'/> </td>
            <td className='text-red'><strong>{pizza.title}</strong></td>
            <td>Double ingredient,spicy sauce</td>
            <td>$ {pizza.priceOfOne}</td>
            <td >{pizza.count}</td>
            <td>$ {pizza.total}</td>
        </tr>
    )
  })}
   </tbody>
    </table>
    {pizzas.length === 0 && <h2 className='text-center mt-4'>{"You don't have any order yet!"}</h2>}
    </div>
</div>

    </div>
  )
}

export default Order