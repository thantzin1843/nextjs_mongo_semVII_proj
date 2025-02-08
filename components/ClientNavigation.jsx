// ClientRedirect.tsx (Client Component)
'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const DashboardRedirect = ({role}) => {
  const router = useRouter();

  useEffect(() => {
   
      router.push(`/${role}`)

  }, [role, router])

  return null // No UI, just a redirect based on role
}

export default DashboardRedirect
