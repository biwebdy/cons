'use client'

import { useRef } from 'react';
import { initializeStore } from '../path/to/zustand-user-store';

export function useClientUserStore() {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = initializeStore();
  }

  return storeRef.current;
}