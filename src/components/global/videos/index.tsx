'use client';

import { getAllUserVideos } from '@/actions/workspace';
import VideoRecorderDuotone from '@/components/icons/video-recorder-duotone';
import { useQueryData } from '@/hooks/use-query-data';
import { cn } from '@/lib/utils';
import { VideosProps } from '@/types/index.type';
import React from 'react';
import VideoCard from './video-card';

type Props = {
  folderId: string;
  videosKey: string;
  workspaceId: string;
};

const mockVideo = {
  User: {
    firstname: 'John',
    lastname: 'Doe',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  id: 'vid_123456789',
  processing: false,
  Folder: {
    id: 'folder_987654321',
    name: 'Project Demos',
  },
  createdAt: new Date('2024-03-15T10:30:00Z'),
  title: 'Product Feature Overview',
  source: 'https://example.com/storage/videos/product-demo.mp4',
};

const index = ({ folderId, videosKey, workspaceId }: Props) => {
  // WIP: Add videos logic
  const { data: videoData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId)
  );
  const { status: videosStatus, data: videos } = videoData as VideosProps;

  return (
    <div className='flex flex-col gap-4 mt-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <VideoRecorderDuotone />
          <h2 className='text-[#bdbdbd] text-xl'>Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videosStatus !== 200
            ? 'p-5'
            : 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
        )}
      >
        {/* {videosStatus === 200 ? (
          videos.map((video) => (
            <VideoCard key={video.id} workspaceId={workspaceId} {...video} />
          ))
        ) : (
          <p className='text-[#bdbdbd]'>No videos in workspace.</p>
        )} */}
        <VideoCard workspaceId={workspaceId} {...mockVideo} />
      </section>
    </div>
  );
};

export default index;
