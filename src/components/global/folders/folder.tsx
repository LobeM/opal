'use client';

import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/dist/client/components/navigation';
import React, { useRef, useState } from 'react';
import Loader from '../loader';
import FolderDuotone from '@/components/icons/folder-duotone';
import { useMutationData } from '@/hooks/use-mutation-data';
import { renameFolders } from '@/actions/workspace';
import { Input } from '@/components/ui/input';

type Props = {
  id: string;
  name: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ id, name, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [onRename, setOnRename] = useState(false);

  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);

  // WIP: add loading states

  // Optimistic
  const { mutate, isPending } = useMutationData(
    ['rename-folders'],
    (data: { name: string }) => renameFolders(id, name),
    'workspace-folders',
    Renamed
  );

  const handleFolderClick = () => {
    router.push(`${pathname}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename();
  };

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current && folderCardRef.current) {
      if (
        !inputRef.current.contains(e.target as Node | null) &&
        !folderCardRef.current.contains(e.target as Node | null)
      ) {
        if (inputRef.current.value) {
          mutate({ name: inputRef.current.value });
        } else {
          Renamed();
        }
      }
    }
  };

  return (
    <div
      ref={folderCardRef}
      onClick={handleFolderClick}
      className={cn(
        'flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border'
      )}
    >
      <Loader state={false}>
        <div className='flex flex-col gap-[1px]'>
          {onRename ? (
            <Input
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                updateFolderName(e)
              }
              ref={inputRef}
              placeholder={name}
              autoFocus
              className='border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0'
            />
          ) : (
            <p
              onClick={(e) => e.stopPropagation()}
              className='text-neutral-300'
              onDoubleClick={handleNameDoubleClick}
            >
              {name}
            </p>
          )}

          <span className='text-neutral-500 text-sm'>{count || 0} videos</span>
        </div>
      </Loader>
      <FolderDuotone />
    </div>
  );
};

export default Folder;