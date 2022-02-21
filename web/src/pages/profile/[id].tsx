import {
  Avatar,
  Button,
  HStack,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import ProfilePost from "../../components/ProfilePost";
import ToggleFollowButton from "../../components/ToggleFollowButton";
import { useUserQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import UsersModal from "../../components/UsersModal";

const Profile: React.FC<{}> = ({}) => {
  const router = useRouter();

  const { id } = router.query;

  const { data, loading } = useUserQuery({
    variables: {
      id: id as string,
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
      {data?.user ? (
        <Stack spacing={6}>
          <HStack justify="center" spacing={12}>
            <UsersModal
              title="followers"
              users={data.user.followers || []}
              count={data.user.followersCount}
            />
            <Stack align="center">
              <Avatar bg="border" size="2xl" />
              <Text as="b" fontSize="2xl">
                {data.user.displayName}
              </Text>
              {!data.user.isMe && data.user.follower ? (
                <Tag>follows you</Tag>
              ) : null}
            </Stack>

            <UsersModal
              title="following"
              users={data.user.following || []}
              count={data.user.followingCount}
            />
          </HStack>
          {data.user.isMe ? (
            <Button isFullWidth variant="secondary">
              settings
            </Button>
          ) : (
            <ToggleFollowButton
              isFullWidth
              followed={data.user.followed}
              userId={data.user.id}
            />
          )}

          <Tabs isLazy={true} isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>posts</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0}>
                <Stack spacing={8} pb={8}>
                  {data.user?.posts
                    ? data.user.posts.map((post) => <ProfilePost post={post} />)
                    : null}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      ) : null}
    </Layout>
  );
};

export default withApollo()(Profile);
