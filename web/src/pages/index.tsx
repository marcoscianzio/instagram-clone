import Navbar from "../components/Navbar";
import {
  CreateCommentMutation,
  useCreateCommentMutation,
  usePostsQuery,
} from "../generated/graphql";

import { withApollo } from "../utils/withApollo";

import Post from "../components/Post";
import { Button, Container, HStack, Spinner, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { ApolloCache, gql } from "@apollo/client";

const updateAfterComent = (
  postId: string,
  cache: ApolloCache<CreateCommentMutation>
) => {
  const data = cache.readFragment<{
    commentCount: number;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _2 on Post {
        id
        commentCount
      }
    `,
  });

  if (data) {
    console.log(data);

    const newCount = data.commentCount + 1;

    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment _3 on Post {
          commentCount
        }
      `,
      data: { commentCount: newCount },
    });
  }
};

const Index = () => {
  const { data, loading } = usePostsQuery();
  const [createComment] = useCreateCommentMutation();

  return (
    <Container maxW="container.md">
      <Navbar />
      {loading && !data ? (
        <Spinner color="secondary" />
      ) : (
        <Stack pb={12} spacing={4}>
          {data?.posts.map((post) => (
            <Post key={post.id} post={post}>
              <Formik
                initialValues={{ content: "" }}
                onSubmit={async ({ content }, { resetForm }) => {
                  return await createComment({
                    variables: {
                      values: {
                        content,
                        postId: post.id,
                      },
                    },
                    update: (cache) => {
                      updateAfterComent(post.id, cache);
                      cache.evict({ fieldName: "postComments" });
                      resetForm();
                    },
                  });
                }}
              >
                {({ dirty, isSubmitting }) => (
                  <HStack p={4} as={Form}>
                    <InputField
                      border="none"
                      name="content"
                      placeholder="write a comment"
                    />
                    <Button
                      disabled={!dirty}
                      loadingText="publishing..."
                      isLoading={isSubmitting}
                      type="submit"
                      variant="primary"
                    >
                      publy
                    </Button>
                  </HStack>
                )}
              </Formik>
            </Post>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default withApollo()(Index);
