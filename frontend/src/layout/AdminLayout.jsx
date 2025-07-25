import React from 'react'
import AdminSidebar from '../pages/admin/AdminSidebar'
import AdminHeader from '../pages/admin/AdminHeader'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function AdminLayout() {
  return (
    <div className='flex'>
        <AdminSidebar/>
        <div className='flex-1'>
            <AdminHeader/>
            <main>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}
