'use client'

import { useRouter } from 'next/navigation'

import styles from './page.module.css'
import { use } from 'react'

export default function Home() {

  const router = useRouter()
  router.push('/giris')
  
  return (
    <main className={styles.main}>

    </main>
  )
}
