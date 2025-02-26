import React, { useState } from 'react';
import {
  IconAt,
  IconCheck,
  IconLock,
  IconX,
  IconUser
} from '@tabler/icons-react';
import {
  Box,
  Button,
  Group,
  PasswordInput,
  Popover,
  Progress,
  rem,
  Text,
  TextInput
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/entities/auth/slice';
import { updateProfile } from 'firebase/auth';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export const Register = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const icon = (
    <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );
  const emailIcon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const userIcon = <IconUser style={{ width: rem(16), height: rem(16) }} />;

  const form = useForm<RegisterFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validate: {
      name: hasLength({ min: 2 }, 'Must be at least 2 characters') as (
        value: string
      ) => string | null,
      email: isEmail('Invalid email') as (value: string) => string | null,
      password: (value) => {
        if (value.length < 6) {
          return 'Password must have at least 6 characters';
        }
      }
    }
  });

  function PasswordRequirement({
    meets,
    label
  }: {
    meets: boolean;
    label: string;
  }) {
    return (
      <Text
        c={meets ? 'teal' : 'red'}
        style={{ display: 'flex', alignItems: 'center' }}
        mt={7}
        size="sm"
      >
        {meets ? (
          <IconCheck style={{ width: rem(14), height: rem(14) }} />
        ) : (
          <IconX style={{ width: rem(14), height: rem(14) }} />
        )}{' '}
        <Box ml={10}>{label}</Box>
      </Text>
    );
  }

  function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  }

  const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' }
  ];

  const passwordValue = form.values.password;
  const strength = getStrength(passwordValue);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: values.name });

      await setDoc(doc(db, 'users', user.uid), {
        name: values.name,
        email: values.email,
        createdAt: serverTimestamp()
      });

      dispatch(setUser({ name: values.name, email: values.email }));
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        leftSection={userIcon}
        radius="xl"
        label="Full Name"
        mb={20}
        placeholder="John"
        key={form.key('name')}
        {...form.getInputProps('name')}
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
      <Popover
        opened={popoverOpened}
        position="bottom"
        width="target"
        transitionProps={{ transition: 'pop' }}
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
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
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress color={color} value={strength} size={5} mb="xs" />
          <PasswordRequirement
            label="Includes at least 6 characters"
            meets={form.values.password.length > 5}
          />
          {requirements.map((requirement, index) => (
            <PasswordRequirement
              key={index}
              label={requirement.label}
              meets={requirement.re.test(form.values.password)}
            />
          ))}
        </Popover.Dropdown>
      </Popover>

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
