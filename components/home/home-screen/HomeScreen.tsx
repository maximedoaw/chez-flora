import { auth } from '@/firebase/firebase'
import { useAuthModal } from '@/hook/useAuthModal'
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import BaseLayout from './BaseLayout'
import { Scroll } from './Scroll'

const HomeScreen = () => {
  const [user] = useAuthState(auth)
  const {setOpen} = useAuthModal()

  useEffect(() => {

    if(user) setOpen(false)

  }, [])

  return (
    <div className='relative overflow-auto'>
      <BaseLayout>
        <Scroll/>
      </BaseLayout>
    </div>
  )
}

export default HomeScreen