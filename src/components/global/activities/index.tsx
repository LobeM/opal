import CommentForm from '@/components/forms/comment-form';
import { TabsContent } from '@/components/ui/tabs';
import React from 'react';

type Props = {
  author: string;
  videoId: string;
};

const Activities = ({ author, videoId }: Props) => {
  return (
    <TabsContent value='Activity' className='rounded-xl flex flex-col gap-y-5'>
      <CommentForm author={author} videoId={videoId} />
    </TabsContent>
  );
};

export default Activities;
