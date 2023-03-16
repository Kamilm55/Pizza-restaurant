import React from 'react'
import PizzaCard from './PizzaCard'

const PizzaList = () => {
    const pizzas = [
        {
            id:1,
            title:'CAMPAGNOLA' ,
            prices: [19.90 , 25.2 , 30.5],
            description:' Lorem ipsum, dolor sit am error nisi, aut ',
            imgUrl:'/img/pizza.png' ,
        },{
            id:1,
            title:'CAMPAGNOLA' ,
            prices: [19.90 , 25.2 , 30.5],
            description:' Lorem ipsum, dolor sit am error nisi, aut ',
            imgUrl:'/img/pizza.png' ,
        },{
            id:1,
            title:'CAMPAGNOLA' ,
            prices: [19.90 , 25.2 , 30.5],
            description:' Lorem ipsum, dolor sit am error nisi, aut ',
            imgUrl:'/img/pizza.png' ,
        },{
            id:1,
            title:'CAMPAGNOLA' ,
            prices: [19.90 , 25.2 , 30.5],
            description:' Lorem ipsum, dolor sit am error nisi, aut ',
            imgUrl:'/img/pizza.png' ,
        },{
            id:1,
            title:'CAMPAGNOLA' ,
            prices: [19.90 , 25.2 , 30.5],
            description:' Lorem ipsum, dolor sit am error nisi, aut ',
            imgUrl:'/img/pizza.png' ,
        },{
            id:1,
            title:'CAMPAGNOLA' ,
            prices: [19.90 , 25.2 , 30.5],
            description:' Lorem ipsum, dolor sit am error nisi, aut ',
            imgUrl:'/img/pizza.png' ,
        },{
            id:1,
            title:'CAMPAGNOLA' ,
            prices: [19.90 , 25.2 , 30.5],
            description:' Lorem ipsum, dolor sit am error nisi, aut ',
            imgUrl:'/img/pizza.png' ,
        },{
            id:1,
            title:'CAMPAGNOLA' ,
            prices: [19.90 , 25.2 , 30.5],
            description:' Lorem ipsum, dolor sit am error nisi, aut ',
            imgUrl:'/img/pizza.png' ,
        },{
            id:1,
            title:'CAMPAGNOLA' ,
            prices: [19.90 , 25.2 , 30.5],
            description:' Lorem ipsum, dolor sit am error nisi, aut ',
            imgUrl:'/img/pizza.png' ,
        },{
            id:1,
            title:'CAMPAGNOLA' ,
            prices: [19.90 , 25.2 , 30.5],
            description:' Lorem ipsum, dolor sit am error nisi, aut ',
            imgUrl:'/img/pizza.png' ,
        },
    ]
    
  return (
    <div className='container'>
        <div className="row mx-auto my-4 mt-5">
            <h2 className='text-center'>THE BEST PIZZA IN TOWN</h2>
            <p className='text-muted text-center'>Lorem ipsum dolor amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className=" mx-auto d-flex flex-wrap gap-1">
            {pizzas.map((pizza,index) => {
                return   <PizzaCard pizza={pizza} key={index}/>
            })}
        </div>
    </div>
  )
}

export default PizzaList