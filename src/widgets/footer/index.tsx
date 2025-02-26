import { AppShell } from '@mantine/core';
import React from 'react';
import { headerHeight } from '@/constants';

export const Footer = () => {
  return (
    <>
      <AppShell.Footer style={{ padding: 0, minHeight: `${headerHeight}px` }}>
        <div>Footer</div>
      </AppShell.Footer>
    </>
  );
};
