import { Spinner, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Comment from "../../components/Comment";
import Layout from "../../components/Layout";
import Post from "../../components/Post";
import { usePostQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const PostPage: React.FC<{}> = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data, loading } = usePostQuery({
    variables: {
      postId: id as string,
    },
    skip: typeof id === "undefined",
  });

  if (loading) {
    return (
      <Layout>
        <Spinner color="secondary" />
      </Layout>
    );
  }

  return (
    <Layout>
      {data?.post && data?.postComments ? (
        <Stack pb={8} spacing={0}>
          <Post post={data.post}>
            <Stack spacing={8} p={4}>
              {data.postComments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </Stack>
          </Post>
        </Stack>
      ) : null}
    </Layout>
  );
};

export default withApollo()(PostPage);
