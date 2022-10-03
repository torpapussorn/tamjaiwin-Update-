import React from 'react'
import Link from 'next/link'

export const Modal = () => {

  return (
     <div className='relative'>
         <div className='absolute overlay flex flex-col justify-center items-center'>
            <div>
                <p className='text-white'><Link href=''>Main</Link></p>                
            </div>
            <div className='py-4'>
                <p className='text-white'><Link href=''>Setting</Link></p>                
            </div>
            <div>
                <p className='text-white'><Link href='/logout'>Logout</Link></p>                
            </div>
            
        </div>
     </div>
  )
}
