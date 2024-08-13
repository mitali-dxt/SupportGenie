'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/chatbot');
      } else {
        router.push('/signup');
      }
    });
    return () => unsubscribe();
  }, [router]);

  return null;
}
