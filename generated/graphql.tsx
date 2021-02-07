import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  ello: Scalars['String'];
  AllPosts: Array<Post>;
  PostById?: Maybe<Post>;
  me?: Maybe<User>;
  AllUsers: Array<User>;
};


export type QueryPostByIdArgs = {
  id: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreatePost: Post;
  UpdatePost: Post;
  DeletePost: Scalars['Boolean'];
  RegisterUser: AuthResponse;
  login: AuthResponse;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  newTitle?: Maybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterUserArgs = {
  options: EmailPasswordInput;
};


export type MutationLoginArgs = {
  options: EmailPasswordInput;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  error?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type EmailPasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { RegisterUser: (
    { __typename?: 'AuthResponse' }
    & { error?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'createdAt'>
    )> }
  ) }
);


export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  RegisterUser(options: {username: $username, password: $password}) {
    error {
      field
      message
    }
    user {
      username
      createdAt
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};