// components/TopLoadingBar.js
'use client'; // Mark this as a Client Component

import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TopLoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start the loading bar on route change
    NProgress.start();

    // Simulate a delay for the loading bar to complete
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 700);

    // Cleanup function
    return () => {
      clearTimeout(timeout);
      NProgress.done(); // Ensure the loading bar completes when the component unmounts
    };
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}