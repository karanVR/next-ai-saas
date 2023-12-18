import { UserButton } from '@clerk/nextjs'
import React from 'react'

const LandingPage = () => {
  return (
    <div>
      Landing page  (unpr)
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default LandingPage
