import React from 'react'
import Header from '../components/Header'
import Specialities from '../components/Specialities'
import Banner from '../components/Banner'
import WhyHostpital from '../components/WhyHostpital'
import Benefits from '../components/Benefits'
// import Faq from './Faq'
import Features from './Features'
import TopDoctors from './TopDoctors'

export default function HomePage() {
  return (
    <div>
      <Header/>
      <Specialities/>
      <Banner/>
      <TopDoctors/>
      <WhyHostpital/>
      <Features/>
      {/* <Faq/> */}
      
    </div>
  )
}
