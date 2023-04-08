import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Modal from './Modal';
interface CartProps {
  btnName: string;
  subTotal:number;
  discount:number;
}
const Cart = ({btnName,subTotal,discount}:CartProps) => {
  const router = useRouter();
  const [open , setOpen] = useState(false);

  return (
    <div className="card  bg-dark text-light p-2">
  <div className="card-body ">
    <h5 className="card-title fs-4">CART TOTAL</h5>
    <p className="card-text  fs-4 mt-1">Subtotal: <span>${typeof(subTotal) === 'number' ? subTotal : 0.00}</span></p>
    <p className="card-text  fs-4 mt-1">Discount: <span>${typeof(discount) === 'number' && subTotal !== 0 ? discount : 0.00}</span></p>
    <p className="card-text  fs-4 mt-1">Total: <span>${subTotal === 0 ? 0 : subTotal - discount}</span></p>
  </div>
  {/* Modal is position absolute it is not correct to call this in this component but it works */}
    <Modal open={open} setOpen={setOpen} total={subTotal - discount}/>
  {/*  */}
    <a onClick={()=>{
     if(btnName !== "PAID"){
      setOpen(true);
      // router.push("/orderTrack");
     }}} className={`${btnName === "PAID" ? 'disabled text-green' : 'text-red'} btn btn-light my-3 mx-2 `}><b>{btnName}</b></a>
</div>
  )
}

export default Cart