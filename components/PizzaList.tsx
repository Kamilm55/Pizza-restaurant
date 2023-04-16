import Link from 'next/link'
import React from 'react'
import PizzaCard from './PizzaCard'

const PizzaList = ({pizzas}:any) => {
  return (
    <div className='container p-relative' >
        <div id='pizzaList'></div>
        <div className="row mx-auto my-4 mt-5">
            <h2 className='text-center'>THE BEST PIZZA IN TOWN</h2>
            <p className='text-muted text-center'>Lorem ipsum dolor amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className=" mx-auto d-flex flex-wrap gap-1">
            {pizzas && pizzas.map((pizza:any,index:number) => {
                return  <Link className='link mx-auto'  key={index} href={`/products/${pizza._id}`}><PizzaCard pizza={pizza} /></Link>
            })}
        </div>
    </div>
  )
}

export default PizzaList