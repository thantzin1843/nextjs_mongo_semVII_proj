'use client'
import { ChartBar, HomeIcon, Mail, Settings, TvIcon, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function DashboardSidebar() {
    const pathname = usePathname(); // e.g., "/admin/hotel/list"

  // Extract "hotel" (the second segment after "/admin")
  const segments = pathname.split('/'); // Split by "/"
  const active = segments[2]; // "hotel" (second segment after "admin")

  return (
    <div className='p-5  min-h-screen'>
        <div className='w-full h-full border rounded-lg border-primary shadow-md p-5'>
            <h1 className='text-center text-3xl p-5 bg-primary text-white rounded-lg'>logo</h1>
            <div className=''>
            <Link href='/profile' className=''>
                <div className={` hover:border shadow-sm hover:border-primary p-3 my-5 rounded-md flex items-center ${active == 'analysis' && 'border border-primary'}`}>
                    <ChartBar/> &nbsp; Analysis
                </div>
                </Link>
                <Link href='/admin/hotel/list' className=''>
                <div className={` hover:border shadow-sm hover:border-primary p-3 my-5 rounded-md flex items-center ${active == 'hotel' && 'border border-primary'}`}>
                    <HomeIcon/>&nbsp; Hotels {active}
                </div>
                </Link>
                <Link href='/profile' className=''>
                <div className={` hover:border shadow-sm hover:border-primary p-3 my-5 rounded-md flex items-center ${active == 'request' && 'border border-primary'}`}>
                    <Mail/>&nbsp; Requests
                </div>
                </Link>
                <Link href='/profile' className=''>
                <div className={` hover:border shadow-sm hover:border-primary p-3 my-5 rounded-md flex items-center ${active == 'ads' && 'border border-primary'}`}>
                    <TvIcon/>&nbsp; Ads
                </div>
                </Link>
                
                <Link href='/profile' className=''>
                <div className={` hover:border shadow-sm hover:border-primary p-3 my-5 rounded-md flex items-center ${active == 'setting' && 'border border-primary'}`}>
                    <Settings/>&nbsp; Setting
                </div>
                </Link>
            </div>     
        </div>

    </div>
  )
}

export default DashboardSidebar