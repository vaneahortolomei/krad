import React from 'react';
import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export const BaseTemplate = () => {
  return (
    <AppShell>
      <Header />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
};
