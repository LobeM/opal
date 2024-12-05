import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useMutationData } from './use-mutation-data';
import { getWorkspaceFolders, moveVideoLocation } from '@/actions/workspace';
import useZodForm from './use-zod-form';
import { moveVideoSchema } from '@/components/forms/change-video-location/schema';

export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
  // Get state redux
  const { folders } = useAppSelector((state) => state.FolderReducer);
  const { workspaces } = useAppSelector((state) => state.WorkSpaceReducer);

  // fetching states
  const [isFetching, setIsFetching] = useState(false);
  // state folders
  const [isFolders, setIsFolders] = useState<
    | ({ _count: { videos: number } } & {
        id: string;
        name: string;
        createdAt: Date;
        workSpaceId: string | null;
      })[]
    | undefined
  >(undefined);

  // use mutation data optimistic
  const { mutate, isPending } = useMutationData(
    ['change-video-location'],
    (data: { folder_id: string; workspace_id: string }) =>
      moveVideoLocation(videoId, data.workspace_id, data.folder_id)
  );

  // use zod form
  const { errors, onFormSubmit, watch, register } = useZodForm(
    moveVideoSchema,
    mutate,
    {
      folder_id: null,
      workspace_id: currentWorkspace,
    }
  );

  // fetchfolders with a use effect
  const fetchFolders = async (workspaceId: string) => {
    setIsFetching(true);
    const folders = await getWorkspaceFolders(workspaceId);
    setIsFetching(false);
    setIsFolders(folders.data);
  };

  useEffect(() => {
    fetchFolders(currentWorkspace);
  }, []);

  useEffect(() => {
    const workspace = watch(async (value) => {
      if (value.workspace_id) fetchFolders(value.workspace_id);
    });
    return () => workspace.unsubscribe();
  }, [watch]);

  return {
    isFetching,
    isFolders,
    isPending,
    folders,
    workspaces,
    errors,
    onFormSubmit,
    register,
  };
};
