import { createCommentAndReply, getUserProfile } from '@/actions/user';
import { useQueryData } from './use-query-data';
import { useMutationData } from './use-mutation-data';
import useZodForm from './use-zod-form';
import { createCommentSchema } from '@/components/forms/comment-form/schema';

export const useVideoComment = (videoId: string, commentId?: string) => {
  const { data } = useQueryData(['user-profile'], getUserProfile);
  const { status, data: user } = data as {
    status: number;
    data: { id: string; image: string };
  };

  const { isPending, mutate } = useMutationData(
    ['new-comment'],
    (data: { comment: string }) =>
      createCommentAndReply(user.id, data.comment, videoId, commentId),
    'video-comments',
    () => reset()
  );

  const { register, onFormSubmit, errors, reset } = useZodForm(
    createCommentSchema,
    mutate
  );

  return { register, errors, onFormSubmit, isPending };
};