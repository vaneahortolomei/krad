import React from 'react';
import { AppShell } from '@mantine/core';
import { headerHeight, footerHeight } from '@/constants';

export const Main = () => {
  return (
    <>
      <AppShell.Main
        style={{
          paddingTop: `${headerHeight}px`,
          paddingBottom: `${footerHeight}px`
        }}
      >
        <div>Main</div>
      </AppShell.Main>
    </>
  );
};
