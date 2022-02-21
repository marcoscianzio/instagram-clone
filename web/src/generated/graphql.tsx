import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  childrenComment?: Maybe<Array<Comment>>;
  childrenCount: Scalars['Int'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  likeCount: Scalars['Int'];
  liked: Scalars['Boolean'];
  likes?: Maybe<Array<Like>>;
  parentComment?: Maybe<Comment>;
  parentCommentId?: Maybe<Scalars['String']>;
  post: Post;
  postId: Scalars['String'];
  repliedUser?: Maybe<User>;
  repliedUserId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type CommentInput = {
  content: Scalars['String'];
  parentCommentId?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  repliedUserId?: InputMaybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  post: Post;
  url: Scalars['String'];
};

export type ImageInput = {
  url: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  comment?: Maybe<Comment>;
  commentId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  follow: Scalars['Boolean'];
  like?: Maybe<Like>;
  login: UserResponse;
  register: UserResponse;
};


export type MutationCreateCommentArgs = {
  values: CommentInput;
};


export type MutationCreatePostArgs = {
  values: PostInput;
};


export type MutationFollowArgs = {
  userId: Scalars['String'];
};


export type MutationLikeArgs = {
  targetId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationLoginArgs = {
  values: LoginInput;
};


export type MutationRegisterArgs = {
  values: UserInput;
};

export type Post = {
  __typename?: 'Post';
  commentCount: Scalars['Int'];
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  images?: Maybe<Array<Image>>;
  isArrayOfImages: Scalars['Boolean'];
  likeCount: Scalars['Int'];
  liked: Scalars['Boolean'];
  likes?: Maybe<Array<Like>>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type PostInput = {
  description: Scalars['String'];
  images?: InputMaybe<Array<ImageInput>>;
};

export type Query = {
  __typename?: 'Query';
  commentReplies?: Maybe<Array<Comment>>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  postComments: Array<Comment>;
  posts: Array<Post>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryCommentRepliesArgs = {
  parentCommentId: Scalars['String'];
  postId: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostCommentsArgs = {
  postId: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  commentCount: Scalars['Int'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  followed?: Maybe<Scalars['Boolean']>;
  follower?: Maybe<Scalars['Boolean']>;
  followers?: Maybe<Array<User>>;
  followersCount: Scalars['Int'];
  following?: Maybe<Array<User>>;
  followingCount: Scalars['Int'];
  githubId?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  isMe: Scalars['Boolean'];
  likeCount: Scalars['Int'];
  likes: Array<Like>;
  postCount: Scalars['Int'];
  posts?: Maybe<Array<Post>>;
  replies: Array<Comment>;
  updatedAt: Scalars['DateTime'];
};

export type UserInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ComplexUserFragment = { __typename?: 'User', postCount: number, likeCount: number, follower?: boolean | null, followed?: boolean | null, followersCount: number, followingCount: number, id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any };

export type RegularCommentFragment = { __typename?: 'Comment', id: string, postId: string, content: string, childrenCount: number, userId: string, repliedUserId?: string | null, parentCommentId?: string | null, likeCount: number, liked: boolean, createdAt: any, updatedAt: any, repliedUser?: { __typename?: 'User', id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } | null, likes?: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', displayName: string, id: string, followed?: boolean | null, isMe: boolean } }> | null, user: { __typename?: 'User', id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } };

export type RegularErrorFragment = { __typename?: 'FieldError', message: string, field: string };

export type RegularLikeFragment = { __typename?: 'Like', id: string, user: { __typename?: 'User', displayName: string, id: string, followed?: boolean | null, isMe: boolean } };

export type RegularPostFragment = { __typename?: 'Post', id: string, userId: string, description: string, commentCount: number, createdAt: any, updatedAt: any, likeCount: number, liked: boolean, isArrayOfImages: boolean, images?: Array<{ __typename?: 'Image', id: string, url: string }> | null, likes?: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', displayName: string, id: string, followed?: boolean | null, isMe: boolean } }> | null, user: { __typename?: 'User', followed?: boolean | null, follower?: boolean | null, id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } };

export type RegularUserFragment = { __typename?: 'User', id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any };

export type CreateCommentMutationVariables = Exact<{
  values: CommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, postId: string, userId: string, createdAt: any, updatedAt: any } };

export type CreatePostMutationVariables = Exact<{
  values: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, description: string } };

export type FollowMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: boolean };

export type LikeMutationVariables = Exact<{
  targetId: Scalars['String'];
  type: Scalars['String'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like?: { __typename?: 'Like', id: string, userId: string } | null };

export type LoginMutationVariables = Exact<{
  values: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, user?: { __typename?: 'User', id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } | null } };

export type RegisterMutationVariables = Exact<{
  values: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, user?: { __typename?: 'User', id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } | null } };

export type CommentRepliesQueryVariables = Exact<{
  parentCommentId: Scalars['String'];
  postId: Scalars['String'];
}>;


export type CommentRepliesQuery = { __typename?: 'Query', commentReplies?: Array<{ __typename?: 'Comment', id: string, postId: string, content: string, childrenCount: number, userId: string, repliedUserId?: string | null, parentCommentId?: string | null, likeCount: number, liked: boolean, createdAt: any, updatedAt: any, repliedUser?: { __typename?: 'User', id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } | null, likes?: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', displayName: string, id: string, followed?: boolean | null, isMe: boolean } }> | null, user: { __typename?: 'User', id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', postCount: number, likeCount: number, follower?: boolean | null, followed?: boolean | null, followersCount: number, followingCount: number, id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, userId: string, description: string, commentCount: number, createdAt: any, updatedAt: any, likeCount: number, liked: boolean, isArrayOfImages: boolean, images?: Array<{ __typename?: 'Image', id: string, url: string }> | null, likes?: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', displayName: string, id: string, followed?: boolean | null, isMe: boolean } }> | null, user: { __typename?: 'User', followed?: boolean | null, follower?: boolean | null, id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } } | null, postComments: Array<{ __typename?: 'Comment', id: string, postId: string, content: string, childrenCount: number, userId: string, repliedUserId?: string | null, parentCommentId?: string | null, likeCount: number, liked: boolean, createdAt: any, updatedAt: any, repliedUser?: { __typename?: 'User', id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } | null, likes?: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', displayName: string, id: string, followed?: boolean | null, isMe: boolean } }> | null, user: { __typename?: 'User', id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } }> };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, userId: string, description: string, commentCount: number, createdAt: any, updatedAt: any, likeCount: number, liked: boolean, isArrayOfImages: boolean, images?: Array<{ __typename?: 'Image', id: string, url: string }> | null, likes?: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', displayName: string, id: string, followed?: boolean | null, isMe: boolean } }> | null, user: { __typename?: 'User', followed?: boolean | null, follower?: boolean | null, id: string, email: string, displayName: string, isMe: boolean, createdAt: any, updatedAt: any } }> };

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email: string, displayName: string, commentCount: number, postCount: number, likeCount: number, followed?: boolean | null, follower?: boolean | null, followersCount: number, followingCount: number, isMe: boolean, createdAt: any, updatedAt: any, posts?: Array<{ __typename?: 'Post', id: string, isArrayOfImages: boolean, description: string, commentCount: number, likeCount: number, createdAt: any, images?: Array<{ __typename?: 'Image', url: string, id: string }> | null }> | null, followers?: Array<{ __typename?: 'User', displayName: string, id: string, followed?: boolean | null, isMe: boolean }> | null, following?: Array<{ __typename?: 'User', displayName: string, id: string, followed?: boolean | null, isMe: boolean }> | null } | null };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
  displayName
  isMe
  createdAt
  updatedAt
}
    `;
export const ComplexUserFragmentDoc = gql`
    fragment ComplexUser on User {
  ...RegularUser
  postCount
  likeCount
  follower
  followed
  followersCount
  followingCount
}
    ${RegularUserFragmentDoc}`;
export const RegularLikeFragmentDoc = gql`
    fragment RegularLike on Like {
  id
  user {
    displayName
    id
    followed
    isMe
  }
}
    `;
export const RegularCommentFragmentDoc = gql`
    fragment RegularComment on Comment {
  id
  postId
  content
  childrenCount
  userId
  repliedUserId
  repliedUser {
    id
    email
    displayName
    isMe
    createdAt
    updatedAt
  }
  parentCommentId
  likeCount
  liked
  likes {
    ...RegularLike
  }
  user {
    ...RegularUser
  }
  createdAt
  updatedAt
}
    ${RegularLikeFragmentDoc}
${RegularUserFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  message
  field
}
    `;
export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  userId
  images {
    id
    url
  }
  description
  commentCount
  createdAt
  updatedAt
  likes {
    ...RegularLike
  }
  likeCount
  liked
  isArrayOfImages
  user {
    ...RegularUser
    followed
    follower
  }
}
    ${RegularLikeFragmentDoc}
${RegularUserFragmentDoc}`;
export const CreateCommentDocument = gql`
    mutation CreateComment($values: CommentInput!) {
  createComment(values: $values) {
    id
    postId
    userId
    createdAt
    updatedAt
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($values: PostInput!) {
  createPost(values: $values) {
    id
    description
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($userId: String!) {
  follow(userId: $userId)
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const LikeDocument = gql`
    mutation Like($targetId: String!, $type: String!) {
  like(targetId: $targetId, type: $type) {
    id
    userId
  }
}
    `;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const LoginDocument = gql`
    mutation Login($values: LoginInput!) {
  login(values: $values) {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($values: UserInput!) {
  register(values: $values) {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CommentRepliesDocument = gql`
    query CommentReplies($parentCommentId: String!, $postId: String!) {
  commentReplies(parentCommentId: $parentCommentId, postId: $postId) {
    ...RegularComment
  }
}
    ${RegularCommentFragmentDoc}`;

/**
 * __useCommentRepliesQuery__
 *
 * To run a query within a React component, call `useCommentRepliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentRepliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentRepliesQuery({
 *   variables: {
 *      parentCommentId: // value for 'parentCommentId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentRepliesQuery(baseOptions: Apollo.QueryHookOptions<CommentRepliesQuery, CommentRepliesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentRepliesQuery, CommentRepliesQueryVariables>(CommentRepliesDocument, options);
      }
export function useCommentRepliesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentRepliesQuery, CommentRepliesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentRepliesQuery, CommentRepliesQueryVariables>(CommentRepliesDocument, options);
        }
export type CommentRepliesQueryHookResult = ReturnType<typeof useCommentRepliesQuery>;
export type CommentRepliesLazyQueryHookResult = ReturnType<typeof useCommentRepliesLazyQuery>;
export type CommentRepliesQueryResult = Apollo.QueryResult<CommentRepliesQuery, CommentRepliesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...ComplexUser
  }
}
    ${ComplexUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($postId: String!) {
  post(id: $postId) {
    ...RegularPost
  }
  postComments(postId: $postId) {
    ...RegularComment
  }
}
    ${RegularPostFragmentDoc}
${RegularCommentFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    id
    email
    displayName
    commentCount
    postCount
    posts {
      id
      images {
        url
        id
      }
      isArrayOfImages
      description
      commentCount
      likeCount
      createdAt
    }
    followers {
      displayName
      id
      followed
      isMe
    }
    following {
      displayName
      id
      followed
      isMe
    }
    likeCount
    followed
    follower
    followersCount
    followingCount
    isMe
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;