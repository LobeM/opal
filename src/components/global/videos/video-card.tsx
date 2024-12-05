import React from 'react';
import Loader from '../loader';
import CardMenu from './video-card-menu';
import ChangeVideoLocation from '@/components/forms/change-video-location';

type Props = {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  source: string;
  processing: boolean;
  workspaceId: string;
};

const VideoCard = (props: Props) => {
  // WIP: wire up date
  return (
    <Loader
      state={false}
      className='bg-[#171717] flex justify-center items-center border border-[rgb(37,37,37)] rounded-xl'
    >
      {/* <div className='group overflow-hidden cursor-pointer bg-[#171717] relative border border-[#252525] flex flex-col rounded-xl'>
        <div className='absolute top-3 right-3 z-50 gap-x-3 hidden group-hover:flex'>
          <CardMenu
            currentFolder={props.Folder?.id}
            videoId={props.id}
            currentWorkspace={props.workspaceId}
            currentFolderName={props.Folder?.name}
          />
        </div>
      </div> */}
      <ChangeVideoLocation
        currentFolderName={props.Folder?.name}
        videoId={props.id}
        currentWorkspace={props.workspaceId}
        currentFolder={props.Folder?.id}
      />
    </Loader>
  );
};

export default VideoCard;
