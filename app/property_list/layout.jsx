import Nav from '@/components/Property/Nav'
import { FormProvider } from '@/context/PropertyListContext'
import React from 'react'

function layout({children}) {
  return (
      <FormProvider>
      <div className=''>
          <Nav/>
              <div className='px-10 '>
              {children}
              </div>
      </div>
        </FormProvider>
  )
}

export default layout