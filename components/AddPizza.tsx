import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const AddPizza = ({open,setOpen}:any) => {
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [img,setImg] = useState<any>("");
    const [prices,setPrices] = useState<Array<number>>([]);
    const [extra,setExtra] = useState<any>({text:"",price:0});
    const [extraOptions,setExtraOptions] = useState<Array<object>>([]);

    // useEffect(()=>{
    //     if(open === false)
    //     resetForm();
    // },[resetForm])
        function resetForm () {
            setTitle("");setDesc("");setImg(null);setPrices([]);setExtra({text:"",price:null});setExtraOptions([]);
            setOpen(false);//close modal
            if(open === false)
            resetForm();
        }
        const handleSubmit = (e:any) => {
            e.preventDefault();
            // console.log(title,desc,prices,img,extraOptions);
            //ilk girende yuklenmir  pizzalar onBlur change to onChange and mobile design of this app admin login form design
            postToDb();
            resetForm();
        }

        async function postToDb(){
            const URL = process.env.NODE_ENV === 'production' ? "https://pizza-next-theta.vercel.app" : "http://localhost:3000";

            const imgFile = new FormData();
            imgFile.append("file",img);
            imgFile.append("upload_preset","uploads");
            try {
                const uploadRes = await fetch("https://api.cloudinary.com/v1_1/diqjnr45t/image/upload",{
                    method:"POST",
                      body:imgFile
                })
                const response = await uploadRes.json();
                const {url} = response;
                const  newPizza = {
                    title:title,
                    desc:desc,
                    prices:prices,
                    img:url,
                    extraOptions:extraOptions
                }
                try {
                    const req = await fetch(`${URL}/api/Products`,{
                        method:"POST",
                        headers: {
                            'Content-Type': 'application/json'
                          },
                        body:JSON.stringify(newPizza)
                    })
                } catch (e) {
                    console.log(e);
                }
                // console.log(JSON.stringify(newPizza));
            } catch (e) {
                console.log(e);
            }
            
            
        }
        // console.log(prices);
        
  return (
    <Dialog 
    PaperProps={{
       style: {
         width: '700px',
       //   height: '350px',
       },
     }}
    open={open} onClose={()=>setOpen(false)}  >
   <DialogTitle>Add new Pizza</DialogTitle>
   <DialogContent>
    
     <form  className="d-flex flex-column gap-3" onSubmit={handleSubmit} >
           <TextField
           onChange={(e)=>setTitle(e.target.value)}
           value={title}
               autoFocus
               autoComplete='off'
               margin="dense"
               id="name"
               label="Title"
               fullWidth
               variant="outlined"
               InputProps={{
                   style: { padding: '9px' },
               }}
           />
           <TextField
          id="outlined-textarea"
          label="Description"
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
          multiline
          variant="outlined"
        />
           <div className="d-flex gap-2">
           <TextField
           onBlur={(e)=>setPrices([...prices,parseFloat(e.target.value)])}
        //    value={prices[0]}
               autoComplete='off'
               margin="dense"
               id="price1"
               label="Price sm ($)"
            //    type="number"
               fullWidth
               variant="outlined"
               InputProps={{
                style: { padding: '9px' },
               }}
           />
            <TextField
            onBlur={(e)=>setPrices([...prices,parseFloat(e.target.value)])}
        //    value={prices[1]}
               autoComplete='off'
               margin="dense"
               id="price2"
               label="Price md ($)"
            //    type="number"
               fullWidth
               variant="outlined"
               InputProps={{
                style: { padding: '9px' },
               }}
           />
            <TextField
           onBlur={(e)=>setPrices([...prices,parseFloat(e.target.value)])}
        //    value={prices[2]}
               autoComplete='off'
               margin="dense"
               id="price3"
               label="Price lg ($)"
            //    type="number"
               fullWidth
               variant="outlined"
               InputProps={{
                style: { padding: '9px' },
               }}
           />
           </div>

               <div >
                <label>Extra Options:</label>
                {extraOptions.length > 0 ? extraOptions.map((extra:any,index:number) => {
                    return (
                        <div className='d-flex gap-2 mt-1' key={index}>
                            <h5><span>{index + 1}.</span>{extra.text}:</h5>
                            <h5>${extra.price}</h5>
                        </div>
                    ) 
                }) : null}
                    <div className="d-flex gap-2">
               <TextField
           onChange={(e)=>setExtra({...extra,text:e.target.value})}
        //    value={extra.text}
               autoComplete='off'
               margin="dense"
               label="Name"
               type="text"
               fullWidth
               variant="outlined"
               InputProps={{
                style: { padding: '9px' },
               }}
           />
            <TextField
            onChange={(e)=>{
                setExtra({...extra,price:e.target.value})
            } }
        //    value={extra.price}
               autoComplete='off'
               margin="dense"
               id="price2"
               label="Price"
               type="number"
               fullWidth
               variant="outlined"
               InputProps={{
                style: { padding: '9px' },
               }}
           />
           <button type='button' onClick={()=>{
            if(extra.text !== "" /* && extra.price !== 0 */){
                setExtraOptions([...extraOptions,extra]);
                setExtra({text:"",price:0});
            }
            }} className="btn btn-outline-info my-2">Add</button>
               </div>
               </div>
           <div>
               <label htmlFor="img" className='m-1' >Image:  </label><br />
            <input
            placeholder='image'
            id='img'
            onChange={(e)=> {
                if(!e.target.files) return;
                setImg(e.target.files[0]);
            }}
            type='file'
            />
            </div>
       <DialogActions>
     <Button type='submit' >Add</Button>
       </DialogActions>
     </form>
   </DialogContent>
  
 </Dialog>   
  )
}

export default AddPizza