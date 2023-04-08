import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/REDUX/app/hooks';
import { resetCart } from '@/REDUX/features/cartSlice';

const Modal = ({open,setOpen,total}:any) => {
    const [formValue , setForm] = useState({customer:"",phone:"",address:"",total:total});
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleClose = () => {
        setOpen(false);
    } 
   async function handleSubmit(event:any){
        event.preventDefault();
          console.log(formValue);
          if(formValue.customer!== "" && formValue.address!== "" && formValue.phone!== ""){
              setForm({customer:"",phone:"",address:"",total:total});
              console.log(JSON.stringify(formValue));
              
              const res = await fetch("http://localhost:3000/api/Orders",{
                method:'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body:JSON.stringify(formValue)
              })
              handleClose();
              router.push("/orderTrack");
              dispatch({type:resetCart});
          }
          else
          alert("You must fill every field")
    }

  return (
         <Dialog 
         PaperProps={{
            style: {
              width: '500px',
            //   height: '350px',
            },
          }}
         open={open} onClose={handleClose}  >
        <DialogTitle>Complete Order</DialogTitle>
        <DialogContent>
         
          <form  className="d-flex flex-column gap-3" onSubmit={handleSubmit} >
                <TextField
                onChange={(e)=>setForm({...formValue,customer:e.target.value})}
                value={formValue.customer}
                    autoFocus
                    autoComplete='off'
                    margin="dense"
                    id="name"
                    label="Full Name"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        style: { padding: '6px' },
                    }}
                />
                <TextField
                onChange={(e)=>{
                    const regex = /^[0-9\b]+$/; // regex to match only digits and backspace
                    if (regex.test(e.target.value)) {
                      setForm({...formValue,phone:e.target.value})
                    }
                }}
                value={formValue.phone}
                    autoComplete='off'
                    margin="dense"
                    id="name"
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        style: { padding: '6px' },
                    }}
                />
                <TextField
                onChange={(e)=>setForm({...formValue,address:e.target.value})}
                value={formValue.address}
                    autoComplete='off'
                    id="name"
                    label="Adress"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        style: { padding: '6px' },
                    }}
                />
            <DialogActions>
          <Button type='submit' >Order</Button>
            </DialogActions>
          </form>
        </DialogContent>
       
      </Dialog>   
  )
}

export default Modal