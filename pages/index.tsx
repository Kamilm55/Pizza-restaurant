import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Slider from '@/components/Slider'
import PizzaList from '@/components/PizzaList'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import AddPizza from '@/components/AddPizza'
import 'react-loading-skeleton/dist/skeleton.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home({data,admin}:any) {
  const [open ,setOpen] = useState(false);
  const [pizzaList ,setPizzaList] = useState([]);
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    setPizzaList(data);
    if(pizzaList.length === 0)
    initialLoadData();
  }, [data])

   function initialLoadData() {
    setLoading(true);
      setTimeout( async () =>{
        const URL = process.env.NODE_ENV === 'production' ? "https://pizza-next-theta.vercel.app" : "http://localhost:3000";
        const res = await fetch(`${URL}/api/Products`);
        const data = await res.json(); 
        setPizzaList(data);
        setLoading(false);
      },3000);
    }

  return (
    <>
    <Head>
      <title>Pizza Restaurant | Home</title>
    </Head>
      <div>
          <Slider/>
      </div>
      {admin ? <button onClick={()=>setOpen(true)} type='button' className='btn bgRed text-light c-pointer m-4 p-3'>Add new pizza</button> : null}
        <AddPizza open={open} setOpen={setOpen}/>
      {/*  */}
        <PizzaList pizzas={pizzaList} loading={loading}/>
    </>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx:any) => {
  const myCookie = ctx.req?.cookies || "" ;
  let admin = false;
  if(myCookie.token === process.env.TOKEN)
    admin = true;

  const URL = process.env.NODE_ENV === 'production' ? "https://pizza-next-theta.vercel.app" : "http://localhost:3000";
  const res = await fetch(`${URL}/api/Products`);
  const data = await res.json(); 

  return {
    props: {
      data, // Access the `data` property of the resolved JSON data object
      admin,
    },
  };
};