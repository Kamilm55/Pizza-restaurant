import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Slider from '@/components/Slider'
import PizzaList from '@/components/PizzaList'
import { GetServerSideProps } from 'next'

const inter = Inter({ subsets: ['latin'] })
export default function Home({data}:any) {
  return (
    <>
    <Head>
      <title>Pizza Restaurant | Home</title>
    </Head>
      <div>
          <Slider/>
      </div>
        <PizzaList pizzas={data}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/Products');
  const data = await res.json(); // Parse the response body as JSON

  return {
    props: {
      data: data, // Access the `data` property of the resolved JSON data object
    },
  };
};