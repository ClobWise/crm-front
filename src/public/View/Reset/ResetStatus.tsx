import { Heading, View } from '@adobe/react-spectrum';
import AlertCircleFilled from '@spectrum-icons/workflow/AlertCircleFilled';

export function EmailSent() {
  return (
    <Heading level={4} alignSelf={'center'}>
      Link to reset your password has been sent to you email. Please check.
    </Heading>
  );
}

export function SuccessfulReset() {
  return (
    <Heading level={4} alignSelf={'center'}>
      The password has been set successfully
    </Heading>
  );
}

export function InvalidResetToken() {
  return (
    <View>
      <Heading level={1} alignSelf={'center'}>
        <AlertCircleFilled />
        404
      </Heading>
      <Heading level={4}>Reset password link not found</Heading>
    </View>
  );
}

export function FailedResetPassword() {
  return (
    <View>
      <Heading level={1} alignSelf={'center'}>
        <AlertCircleFilled />
        Failed to reset the password! Try again.
      </Heading>
    </View>
  );
}
