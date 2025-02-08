import Link from 'next/link';
import React from 'react'

function Indicator({step}) {
  return (
    <ol className="flex items-center">
      {Array.from({ length: step }).map((_, index) => (

        <li className="relative w-full mb-6"  key={index}>
                    <div className="flex items-center">
                        <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                            <svg className="w-2.5 h-2.5 text-blue-100 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                        </div>
                        <div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div className="mt-3">
                        <h3 className="font-medium text-gray-900 dark:text-white">Step {index+1}</h3>
                    </div>
                </li>
      ))}
                    
               
      {Array.from({ length: 4-step }).map((_, index=step+1) => {
         const stepNumber = index + step + 1;
         return (
            <li className="relative w-full mb-6" key={index}>
                <div className="flex items-center">
                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full ring-0 ring-white dark:bg-gray-700 sm:ring-8 dark:ring-gray-900 shrink-0">
                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                    </div>
                </div>
                <div className="mt-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">Step {stepNumber}</h3>
                </div>
            </li>
        )})}
    
    
    
</ol>
  )
}

export default Indicator