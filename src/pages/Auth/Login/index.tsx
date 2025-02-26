import React from 'react';
import {
  SimpleGrid,
  Box,
  Stack,
  Image,
  Group,
  Title,
  Flex,
  Text
} from '@mantine/core';
import LoginBackground from '@/assets/Login/auth.webp';
import { Login } from '@/features/login';

export const LoginPage = () => {
  return (
    <Stack
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: 'linear-gradient(to top, #dccf9e, #f7f3e9)'
      }}
    >
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2 }}
        style={{ minHeight: '100dvh' }}
      >
        <Flex
          style={{ padding: '20px' }}
          align="center"
          direction="column"
          justify="space-between"
        >
          <Text
            style={{
              padding: '5px 10px',
              borderRadius: '50px',
              border: '1px solid #5f5f60',
              alignSelf: 'flex-start'
            }}
          >
            KRAD
          </Text>
          <Group style={{ display: 'flex', flexDirection: 'column' }}>
            <Title fw={400} mb={20}>
              Log In
            </Title>
            <Box miw={400}>
              <Login />
            </Box>
          </Group>
          <Text style={{ alignSelf: 'flex-start' }} color={'#5f5f60'} />
        </Flex>
        <Box style={{ padding: '20px' }}>
          <Image
            src={LoginBackground}
            width={'100%'}
            height={'100%'}
            style={{ borderRadius: '50px' }}
          />
        </Box>
      </SimpleGrid>
    </Stack>
  );
};
