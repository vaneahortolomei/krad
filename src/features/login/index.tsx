import React from 'react';
import { IconAt, IconLock } from '@tabler/icons-react';
import { Button, Group, PasswordInput, rem, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUser } from '@/entities/auth/slice';

interface LoginFormValues {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const icon = (
    <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );
  const emailIcon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: isEmail('Invalid email') as (value: string) => string | null,
      // password: (value) => (value.length === 0 ? 'Password is required' : null),
      password: () => null
    }
  });

  const handleLoginSubmit = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      dispatch(
        setUser({ name: user.displayName || '', email: user.email || '' })
      );
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleLoginSubmit)}>
      <TextInput
        leftSection={emailIcon}
        radius="xl"
        label="Email"
        mb={20}
        placeholder="your@email.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
        styles={{
          label: {
            color: '#9d9c9b',
            padding: '0 35px',
            marginBottom: '10px'
          },
          input: {
            height: '50px',
            border: 'none',
            backgroundColor: '#f5f5ef',
            padding: '0 35px'
          },
          error: {
            padding: '0 35px',
            marginTop: '10px'
          }
        }}
      />
      <PasswordInput
        leftSection={icon}
        radius="xl"
        label="Your password"
        placeholder="Your password"
        {...form.getInputProps('password')}
        styles={{
          label: {
            color: '#9d9c9b',
            padding: '0 35px',
            marginBottom: '10px'
          },
          input: {
            height: '50px',
            border: 'none',
            backgroundColor: '#f5f5f2'
          },
          error: {
            padding: '0 35px',
            marginTop: '10px'
          }
        }}
      />

      <Group justify="flex-end" mt="md">
        <Button
          color={'#ffd85f'}
          type="submit"
          mt={20}
          w={'100%'}
          h={50}
          fw={400}
          style={{ borderRadius: 50 }}
        >
          Submit
        </Button>
      </Group>
    </form>
  );
};
