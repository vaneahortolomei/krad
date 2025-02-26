import { AppShell } from '@mantine/core';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { logout } from '@/entities/auth/slice';
import { headerHeight } from '@/constants';

export const Header = () => {
  const dispatch = useDispatch();

  console.log(auth);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <AppShell.Header style={{ padding: 0, minHeight: `${headerHeight}px` }}>
        <div>{auth.currentUser?.displayName}</div>
        <span></span>
        <button onClick={handleLogOut}>Log out</button>
      </AppShell.Header>
    </>
  );
};
