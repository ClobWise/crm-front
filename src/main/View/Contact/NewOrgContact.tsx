import { Flex, Heading, View } from '@adobe/react-spectrum';
import PersonalizationField from '@spectrum-icons/workflow/PersonalizationField';
import { useMutation } from '@tanstack/react-query';
import { createRoute } from '@tanstack/react-router';

import type { OrganizationInput } from '#shared/gen/Api.js';
import { client, graphql } from '#shared/graphql.js';
import { workspaceRoute } from '../Workspace/WorkspaceRoute.js';
import { OrgContactForm } from './OrgContactForm.js';
import { useOrgContactForm } from './UseOrgContactForm.js';

export type NewOrgContactProps = {};

export const newContactRoute = createRoute({
  getParentRoute: () => workspaceRoute,
  path: '/contacts/new/organization',
  component: NewOrgContact,
});

const query = graphql(`
  mutation CreateContactOrg($input: OrganizationInput!, $tenantId: String!) {
    createContactOrganization(input: $input, tenantId: $tenantId) {
      addresses {
        house
        isPrimary
        landmark
        postalCodeId
        street
      }
      emails {
        address
        isPrimary
      }
      id
      name
      people {
        dob
        familyName
        givenName
        id
        middleName
      }
      phones {
        countryId
        isPrimary
        number
      }
    }
  }
`);

function createContactOrg(input: OrganizationInput, tenantId: string) {
  return client.request({
    document: query,
    variables: {
      input,
      tenantId,
    },
  });
}

function useCreateOrg(
  input: OrganizationInput,
  tenantId: string
) {
  return useMutation({
    mutationFn: () => createContactOrg(input, tenantId),
  });
}

export function NewOrgContact(_props: NewOrgContactProps) {
  const { tenantId } = newContactRoute.useParams();

  const form = useOrgContactForm(() => {
    contacts.mutate();
  });

  const contacts = useCreateOrg(form.state.values, tenantId);

  return (
    <View
      data-cl={'newContact'}
      backgroundColor={'gray-75'}
      padding={'size-400'}
      margin={'auto'}
      width={'size-6000'}
      marginTop={'size-400'}
      borderColor={'gray-200'}
      borderWidth={'thin'}
    >
      <Flex direction={'column'}>
        <PersonalizationField
          size='XXL'
          alignSelf={'center'}
          marginBottom={'size-400'}
        />
        <Heading level={1} alignSelf={'self-start'}>
          New Contact Organizations
        </Heading>
        <OrgContactForm form={form} />
      </Flex>
    </View>
  );
}
