import {
  Button,
  Form,
  Heading,
  ProgressCircle,
  TextField,
} from '@adobe/react-spectrum';

import { FormEvent, useState } from 'react';

export type InvitationCredentials = {
  code: string;
  password: string;
};

export type InvitationFormProps = {
  inProgress: boolean;
  code: string;
  fullName: string;
  onSubmit: (value: InvitationCredentials) => void;
};

export function InvitationForm(props: InvitationFormProps) {
  const { inProgress, code, onSubmit, fullName } = props;
  const [password, setPassword] = useState('');

  const handleChange = (e: FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    onSubmit({ code, password });
  };

  return (
    <Form
      necessityIndicator='icon'
      validationBehavior='native'
      onSubmit={handleChange}
    >
      <Heading level={3}>Hello {fullName}!!</Heading>
      <Heading level={4}>To claim your invitation enter password</Heading>
      <TextField
        label='Password'
        name='password'
        type='password'
        isRequired
        description='Password'
        value={password}
        onChange={setPassword}
      />
      <Button
        type='submit'
        variant='primary'
        width='single-line-width'
        style='fill'
        alignSelf={'center'}
      >
        {inProgress ? (
          <ProgressCircle size='S' staticColor='white' isIndeterminate />
        ) : (
          'Submit'
        )}
      </Button>
    </Form>
  );
}
