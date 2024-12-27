'use client';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import React, { useEffect } from 'react';

const withAuth = (WrappedComponent: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const router = useRouter();
    const { token } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      if (!token) {
        router.push('/auth/login');
      }
    }, []);

    return token ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
