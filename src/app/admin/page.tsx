import { getUser } from '@/lib/server/getUserServe'
import { redirect } from 'next/navigation'

export default async function page() {
    
  redirect('/admin/products');
}
