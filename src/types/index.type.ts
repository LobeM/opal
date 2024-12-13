export type WorkspaceProps = {
  data: {
    subscription: {
      plan: 'FREE' | 'PRO';
    } | null;
    workspace: {
      id: string;
      name: string;
      type: 'PERSONAL' | 'PUBLIC';
    }[];
    members: {
      WorkSpace: {
        id: string;
        name: string;
        type: 'PERSONAL' | 'PUBLIC';
      };
    }[];
  };
};

export type NotificationProps = {
  status: number;
  data: {
    _count: {
      notifications: number;
    };
  };
};

export type FolderProps = {
  status: number;
  data: {
    name: string;
    _count: {
      videos: number;
    };
  };
};

export type VideosProps = {
  status: number;
  data: {
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
    } | null;
    id: string;
    processing: boolean;
    Folder: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
    title: string | null;
    source: string;
  }[];
};

export type VideoProps = {
  status: number;
  data: {
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
      clerkid: string;
      trial: boolean;
      subscription: {
        plan: 'FREE' | 'PRO';
      };
    } | null;
    title: string | null;
    description: string | null;
    source: string;
    views: number;
    createdAt: Date;
    processing: boolean;
    summery: string;
  };
  author: boolean;
};

export type CommentRepliesProps = {
  id: string;
  comment: string;
  createdAt: Date;
  commentId: string | null;
  userId: string | null;
  videoId: string | null;
  User: {
    id: string;
    email: string;
    firstname: string | null;
    lastname: string | null;
    createdAt: Date;
    clerkid: string;
    image: string | null;
    trial: boolean;
    firstView: boolean;
  } | null;
};

export type VideoCommentProps = {
  data: {
    User: {
      id: string;
      email: string;
      firstname: string | null;
      lastname: string | null;
      createdAt: Date;
      clerkid: string;
      image: string | null;
      trial: boolean;
      firstview: boolean;
    } | null;
    reply: CommentRepliesProps[];
    id: string;
    comment: string;
    createdAt: Date;
    commentId: string | null;
    userId: string | null;
    videoId: string | null;
  }[];
};
