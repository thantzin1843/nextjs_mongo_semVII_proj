import React from 'react'
import { doLogout } from '../actions'
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar'
import TopMenu from '@/components/Dashboard/TopMenu'

function layout({children}) {
  return (
    <div className='grid grid-cols-4 '>
      {/* Side bar */}
      <DashboardSidebar/>
      {/* Header */}
      <div className='col-span-3 p-5'>
      <TopMenu/>
      
      {children}
      </div>             
    </div>
  )
}

export default layout