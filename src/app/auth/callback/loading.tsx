import { Spinner } from '@/components/global/loader/spinner';
import React from 'react';

const AuthLoading = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <Spinner />
    </div>
  );
};

export default AuthLoading;
