'use client'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function page() {
  const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (user && user?.role=="User") {
        router.replace(`/dashboard/${user?.role?.toLowerCase()||""}`);
      }
      console.log(user)
    }, [user]);

  return (
    <div>users page</div>
  )
}
