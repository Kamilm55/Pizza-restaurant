import Head from 'next/head';
import Image from 'next/image'
import React, { ChangeEvent,  useState } from 'react'
import {GetServerSideProps} from 'next'
import { useAppDispatch, useAppSelector } from '@/REDUX/app/hooks';
import { addProduct } from '@/REDUX/features/cartSlice';

const Product = ({pizza}:any) => {
  const [clicked,setClicked] = useState("Small");
  const [countValue , setCount] = useState(1);
  const [checked , setChecked] = useState<Array<object>>([]);
  const dispatch = useAppDispatch();
//////////////////////////////////////////////////////////////////////////////////
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => Number(e.target.value) > 0 ? setCount(Number(e.target.value)) : null;
  const handleChange2 = (e: ChangeEvent<HTMLInputElement>,extra:any) => {
    if(!checked.includes(extra))
    setChecked([...checked , extra]);
    else
    setChecked(checked.filter(item => item !== extra ));
  }
//////////////////////////////////////////////////////////////////////////////////
  const priceForSize = () =>  Number((pizza.prices[["Small","Medium","Large"].indexOf(clicked)]).toFixed(1));
  const extraPrices = () => {
    let sum = 0 ;
    checked.forEach((item:any) => sum = sum + item.price);  
    return sum;
  }
  const totalPrice = Number((countValue * (extraPrices() + priceForSize())));
  return (
    <div className="container top100 ">
      <Head>
        <title>Pizza Restaurant | Product</title>
      </Head>
      <div className="row  ">
        <Image className='col-12 col-md-6 mt-5'  src={pizza.img} width={400} height={400}  alt='img' style={{objectFit:"contain"}}/>
      <div className='col-12 col-md-6 py-4 d-flex flex-column  '>
        <h2 >{pizza.title}</h2>    
        <h6 className=' text-red fs-4 '>$ {totalPrice}</h6>
        <p className='text-muted '>{pizza.desc}</p>  <br />  
        <h5 className='title '>Choose the size</h5>
        <div className="d-flex mt-2 gap-5 c-pointer">
        {["Small","Medium","Large"].map((item,index)=>{
          return(
            <div key={index} className='p-relative ' onClick={()=>setClicked(item)}>
              <div className="badge ">{item}</div>
          <Image className={item === clicked ? `sizeActive` : ""} src={'/img/size.png'} width={(index * 10) + 40} height={(index * 10) + 40}  alt='img' style={{objectFit:"contain"}}/>
            </div>
          )
        })}
        </div><br />
        <h5 className='title'>Choose additional ingredients</h5>
        <div className='d-flex  gap-3'>
          {pizza.extraOptions.map((extra:any) => {
              return (
                 <div className='d-flex gap-1' key={extra._id} >
        <input  type="checkbox" onChange={(e)=>handleChange2(e,extra)} name={extra._id} id={extra._id} />
        <label htmlFor={extra._id}>{extra.text}</label>
                 </div>
              )
          })}
        </div>
        <br /><br />
        <label htmlFor="card">
        <div className='d-flex gap-2'>
        <input  type="number" value={countValue} onChange={handleChange} name="card" id="card" className='px-2' />
        <button type='button' className='btn btn-danger' onClick={()=>{
          dispatch(addProduct({title:pizza.title,img:pizza.img,count:countValue,priceOfOne:parseFloat((totalPrice/ countValue).toFixed(2)),extras:checked,total:totalPrice}));
        }
        }>Add to Cart</button>
        </div>
        </label>
    </div>
      </div>
    </div>
   
  )
}

export const  getServerSideProps:GetServerSideProps = async ({params:{id}}:any) => {
  const res = await fetch(`http://localhost:3000/api/Products/${id}`);
  const data = await res.json();

  return {
    props:{
      pizza:data
    }
  }
}

export default Product