import AddPizza from '@/components/AddPizza';
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Index = ({products,orders}:any) => {
    const [Products,setProducts] = useState([]);
    const [Orders,setOrders] = useState([]);
    const [open,setOpen] = useState(false);

    useEffect(()=>{
        setProducts(products);
        setOrders(orders);
    },[products,orders]);

    const status = (num:number) => {
        if(num === 0) return "Payment";
        if(num === 1) return "Preparing";
        if(num === 2) return "On the way";
        if(num === 3) return "Delivered";
    }
    const whichIs = (method:number) => (method === 0) ? 'Products' : 'Orders';

    const handleDelete = async (item:any,method:number) => {
        method === 0 ?
        setProducts((prev) => prev.filter( (allItem:any) => allItem._id !== item._id))
        :
        setOrders((prev) => prev.filter( (allItem:any) => allItem._id !== item._id))

        const URL = process.env.NODE_ENV === 'production' ? "https://pizza-next-theta.vercel.app" : "http://localhost:3000";

        try {
            await fetch(`${URL}/api/${whichIs(method)}/${item._id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }})
        } catch (e) {
            console.log(e);
        }

    }

    const handleEdit = async (item:any) => {
        const URL = process.env.NODE_ENV === 'production' ? "https://pizza-next-theta.vercel.app" : "http://localhost:3000";

        await fetch(`${URL}/api/Orders/${item._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(item)
        })
    }

    /// edit  functionalitites

  return (
        <div className="container top100">
        <Head>
            <title>Pizza Restaurant | Admin</title>
        </Head>
        {/*  */}
        <AddPizza open={open} setOpen={setOpen}/>
            <div className="row">
                <div className="col-12">
                    <h1 className='text-center my-3'>Products</h1>
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Prices</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.map( (product:any,index:number) =>{
                            return(
                                <tr key={product._id}>
                                    <th scope="row">{index}</th>
                                    <td><Image src={product.img} alt="img" width={50} height={50}/></td>
                                    <td>{product._id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.prices.map((price:any,index:number,self:any) => price + ((index === self.length - 1) ? null : ','))}</td>
                                    <td className='d-flex gap-2'>
                                    {/* <button 
                                    onClick={}
                                    type='button' className="btn btn-outline-success">Edit</button> */}
                                    <button
                                    onClick={()=>handleDelete(product,0)}
                                    type='button' className="btn btn-outline-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                    <button onClick={()=>setOpen(true)} type='button' className='mx-auto btn bg-primary text-light  p-3'>Add new pizza</button>
                </div>
                <div className="col-12 mb-5">
                    <h1 className='text-center my-3'>Orders</h1>
                    <table className="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Id</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Orders.map( (order:any,index:number) =>{
                            return(
                                <tr key={order._id}>
                                    <th scope="row">{index}</th>
                                    <td>{order.customer}</td>
                                    <td>{order._id}</td>
                                    <td>${Number(order.total.toFixed(2))}</td>
                                    <td>{status(order.status)}</td>
                                    <td className='d-flex gap-2'>
                                        <button
                                        disabled={order.status === 3}
                                        onClick={()=>{
                                        const updatedOrders:any/*for one order  */ =  Orders.map( (item:any) =>{
                                            if(item._id === order._id)  item.status+=1 
                                            return item;
                                        } )
                                        setOrders(updatedOrders);
                                        handleEdit(order)
                                        }}
                                        type='button' className="btn btn-outline-success">Next stage</button>
                                        <button
                                        onClick={()=>handleDelete(order,1)}
                                        type='button' className="btn btn-outline-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
   const myCookie = ctx.req?.cookies || "" ;

   if(myCookie.token !== process.env.TOKEN){
    return{
        redirect:{
            destination:"admin/login",
            permanent:false,
        }
    }
   }
   const URL = process.env.NODE_ENV === 'production' ? "https://pizza-next-theta.vercel.app" : "http://localhost:3000";

    const res = await fetch(`${URL}/api/Products`);
    const data = await res.json();

    const res2 = await fetch(`${URL}/api/Orders`);
    const data2 = await res2.json();

    return {
        props:{
            products:data,
            orders:data2
        }
    }
}
export default Index