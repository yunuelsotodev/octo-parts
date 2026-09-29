import { getUser } from '@/utils/getUserServe'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
    
  const user = await getUser();

  return (
    <div>
      {/* TODO: Usa sidebar llamadda drawer para el menu de opciones y el dde abajo para las opciones de agregar carrito */}
      Session: {JSON.stringify(user)}
    </div>
  )
}
