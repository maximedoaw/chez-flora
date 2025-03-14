"use client"

import React, { ReactNode, useEffect, useState } from 'react';
import SideBar from './SideBar';
import RightPanel from './RightPanel';

const BaseLayout = ({ children, renderPanel=true }: { children: ReactNode, renderPanel?: boolean }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-emerald-50 dark:bg-gray-800">
      <div className="sticky top-0 h-screen">
        <SideBar />
      </div>
      <div className="flex-1 min-w-0">
        {children}
      </div>

      {!isMobile && <div className="sticky top-0 h-screen"><RightPanel /></div>}
    </div>
  );
};

export default BaseLayout;