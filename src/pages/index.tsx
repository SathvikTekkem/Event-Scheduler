import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Calendar from '../components/Calendar'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Calendar/>
    </>
  )
}
