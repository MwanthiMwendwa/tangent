import React from 'react'
import Image from 'next/image'

function Footer() {
  return (
    <footer>
       <Image src={'/logo.png'} alt='logo' width={500} height={500} />
    </footer>
  )
}

export default Footer