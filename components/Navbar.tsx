import React from 'react'
import styles from '@/styles/Navbar.module.css'
import Image from 'next/image'

const Navbar = () => {

    const navItems = ['Homepage' , 'Products' , 'Menu' , 'Pizza' , 'Events' , 'Blog' , 'Contact']
    const counter = 2;
    return (
    <div className={styles.navBarP}>

        <nav className={styles.navBar} >
           <div className="nav-div  d-flex">
            <div className={`${styles.phone} my-auto mx-2`}>
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
                        <div className={`${styles.navItem}  mx-4 c-pointer fs-6`} key={index}>
                            <p className='p'>{navItem}</p>
                        </div>
                )
            })}
           </div>
           <div className="nav-div px-4 mx-4">
            <Image src='/img/cart.png' width={40} height={40} alt='cart' className='c-pointer'/>
            <span className={styles.counter}>{counter}</span>
           </div>
        </nav>
    </div>
  )
}

export default Navbar