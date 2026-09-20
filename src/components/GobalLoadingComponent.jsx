import React from 'react'
import { motion } from 'framer-motion'
import { CgSpinner } from "react-icons/cg";


function GobalLoadingComponent({logo}) {
  return (
    <motion.div 
    initial={{opacity:0.2}}
    animate={{opacity:1}}
    transition={{duration:1,ease:"easeInOut"}}
    className='w-full h-screen flex-col flex items-center justify-center absolute left-0 top-0'>
        <div>
            <img src={logo} className='w-20' />
        </div>
        <div className='flex flex-col my-10 items-center '>
            <h4 className='font-bold text-2xl text-blue-800'>Your Life, In Receipts</h4>
            <span className='text-[12px] mt-1 font-semibold'>
                JOURNALING THE EVERYDAY
            </span>
        </div>
        <div className='animate-spin'>
            <CgSpinner />
        </div>
    </motion.div>
  )
}

export default GobalLoadingComponent