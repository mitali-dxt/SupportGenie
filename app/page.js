// app/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase'; // Import your Firebase configuration

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, redirect to the chatbot page
        router.push('/chatbot');
      } else {
        // No user is signed in, redirect to the signup page
        router.push('/signup');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  return null; // No need to render anything as the redirect happens immediately
}
