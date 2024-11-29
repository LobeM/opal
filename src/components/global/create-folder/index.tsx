import FolderPlusDuotine from '@/components/icons/folder-plus-duotone';
import { Button } from '@/components/ui/button';
import React from 'react';

type Props = { workspaceId: string };

const CreateFolder = ({ workspaceId }: Props) => {
  // WIP: add create folders
  return (
    <Button className='bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl'>
      <FolderPlusDuotine />
      Create a Folder
    </Button>
  );
};

export default CreateFolder;
