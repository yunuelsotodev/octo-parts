import { getUser } from '@/utils/getUserServe'
import { redirect } from 'next/navigation'

export default async function page() {
    
  redirect('/admin/products');
}
