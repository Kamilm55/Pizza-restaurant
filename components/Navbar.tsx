import React from 'react'
import styles from '@/styles/Navbar.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/REDUX/app/hooks'
import { selectCartDatas } from '@/REDUX/features/cartSlice'

const Navbar = () => {

    const navItems = ['Homepage' , 'Admin' , 'Menu' , 'Pizza' , 'Cart' , 'Orders' , 'Contact']
    const cartData = useAppSelector(selectCartDatas);
    const counter = cartData.length;
    const router = useRouter();
    return (
    <div className={styles.navBarP}>

        <nav className={styles.navBar} >
           <div className="nav-div  d-flex">
            <div className={`${styles.phone} my-auto mx-2 d-none d-md-flex`}>
            <Image src="/img/telephone.png"  width="32" height="32" alt='phone' /> 
            </div>
            <div >
                <span className='p'>ORDER NOW!</span>
                <h4 className='p'>012 345 678</h4>
            </div>
           </div>
           <div className="nav-div  d-flex  align-items-center p">
            {navItems.map((navItem , index) => {
                return (
                        <div onClick={()=>{
                            navItem === 'Homepage' || navItem === 'Pizza' ? router.push('/') :null
                            navItem ===  'Orders' ? router.push('/orderTrack') : null;
                            navItem ===  'Cart' ? router.push('/order') : null;
                            if(navItem ===  'Menu') {
                                router.push("/");
                                setTimeout(()=>{
                                    document.querySelector('#pizzaList')?.scrollIntoView({behavior: 'smooth',block: 'start'}) 
                                },500)
                             };
                            navItem ===  'Contact' ? document.querySelector('footer')?.scrollIntoView({behavior: 'smooth',block: 'start'}) : null;
                            navItem === 'Admin' ? router.push('/admin') : null;
                        }
                            } className={`${styles.navItem}  mx-4 c-pointer fs-6`} key={index}>
                            <p className='p'>{navItem}</p>
                        </div>
                )
            })}
           </div>
           <div className="nav-div px-4 mx-4" onClick={()=>router.push('/order')}>
            <Image src='/img/cart.png' width={40} height={40} alt='cart' className='c-pointer'/>
            <span className={styles.counter}>{counter}</span>
           </div>
        </nav>
    </div>
  )
}

export default Navbar