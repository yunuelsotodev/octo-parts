import { MenuBarCustom } from '@/components/ui/menuBarCustom';
import { getUser } from '@/utils/getUserServe'
import { Menubar } from '@base-ui/react';
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
    
  const user = await getUser();

  return (
    <div>
      <MenuBarCustom/>
      Session: {JSON.stringify(user)}
      
    </div>
  )
}
