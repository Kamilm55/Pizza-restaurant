import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Slider from '@/components/Slider'
import PizzaList from '@/components/PizzaList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
      <title>Pizza Restaurant | Home</title>
    </Head>
      <div>
          <Slider/>
      </div>
        <PizzaList/>
    </>
  )
}
