import { createWorkspace } from '@/actions/workspace';
import { useMutationData } from './use-mutation-data';
import useZodForm from './use-zod-form';
import { workspaceSchema } from '@/components/forms/workspace-form/schema';

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ['create-workspace'],
    (data: { name: string }) => createWorkspace(data.name),
    'user-workspaces'
  );

  const { register, onFormSubmit, errors } = useZodForm(
    workspaceSchema,
    mutate
  );
  return { register, onFormSubmit, errors, isPending };
};
