import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  author: User;
  authorId: Scalars['Int'];
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  post: Post;
  postId: Scalars['Int'];
  updated_at: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  confirmEmail: Scalars['Boolean'];
  createPost: Post;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
  image: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrNumberOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};

export type PathError = {
  __typename?: 'PathError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Int'];
  comment?: Maybe<Comment>;
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  image: Scalars['String'];
  updated_at: Scalars['DateTime'];
  votes: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  Me?: Maybe<User>;
  user?: Maybe<User>;
  userPosts: Array<Post>;
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUserPostsArgs = {
  authorId: Scalars['Float'];
};

export type RegisterInput = {
  birthday?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  number: Scalars['String'];
  password: Scalars['String'];
  profile_pic?: InputMaybe<Scalars['String']>;
  sex?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  birthday?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Comment>>;
  confirmed: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  followers: Scalars['Int'];
  following: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  number: Scalars['String'];
  postCount: Scalars['Int'];
  posts?: Maybe<Array<Post>>;
  profile_pic?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<PathError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'PathError', path: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: number, email: string, number: string, name: string, username: string, description?: string | null | undefined, sex?: string | null | undefined, followers: number, profile_pic?: string | null | undefined, following: number, postCount: number, birthday?: string | null | undefined, confirmed: boolean, verified: boolean, created_at: any, updated_at: any, posts?: Array<{ __typename?: 'Post', id: number, votes: number, image: string }> | null | undefined };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  usernameOrNumberOrEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'PathError', path: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, email: string, number: string, name: string, username: string, description?: string | null | undefined, sex?: string | null | undefined, followers: number, profile_pic?: string | null | undefined, following: number, postCount: number, birthday?: string | null | undefined, confirmed: boolean, verified: boolean, created_at: any, updated_at: any, posts?: Array<{ __typename?: 'Post', id: number, votes: number, image: string }> | null | undefined } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'PathError', path: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, email: string, number: string, name: string, username: string, description?: string | null | undefined, sex?: string | null | undefined, followers: number, profile_pic?: string | null | undefined, following: number, postCount: number, birthday?: string | null | undefined, confirmed: boolean, verified: boolean, created_at: any, updated_at: any, posts?: Array<{ __typename?: 'Post', id: number, votes: number, image: string }> | null | undefined } | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', Me?: { __typename?: 'User', id: number, email: string, number: string, name: string, username: string, description?: string | null | undefined, sex?: string | null | undefined, followers: number, profile_pic?: string | null | undefined, following: number, postCount: number, birthday?: string | null | undefined, confirmed: boolean, verified: boolean, created_at: any, updated_at: any, posts?: Array<{ __typename?: 'Post', id: number, votes: number, image: string }> | null | undefined } | null | undefined };

export type UserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, email: string, number: string, name: string, username: string, description?: string | null | undefined, sex?: string | null | undefined, followers: number, profile_pic?: string | null | undefined, following: number, postCount: number, birthday?: string | null | undefined, confirmed: boolean, verified: boolean, created_at: any, updated_at: any, posts?: Array<{ __typename?: 'Post', id: number, votes: number, image: string }> | null | undefined } | null | undefined };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on PathError {
  path
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  email
  number
  name
  username
  description
  sex
  posts {
    id
    votes
    image
  }
  followers
  profile_pic
  following
  postCount
  birthday
  confirmed
  verified
  created_at
  updated_at
}
    `;
export const LoginDocument = gql`
    mutation Login($password: String!, $usernameOrNumberOrEmail: String!) {
  login(password: $password, usernameOrNumberOrEmail: $usernameOrNumberOrEmail) {
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
 *      password: // value for 'password'
 *      usernameOrNumberOrEmail: // value for 'usernameOrNumberOrEmail'
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
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
 *      options: // value for 'options'
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
export const MeDocument = gql`
    query Me {
  Me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

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
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

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
 *      username: // value for 'username'
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