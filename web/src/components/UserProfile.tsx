import { useMeQuery, User } from "../generated/graphql";
import {
  Avatar,
  Button,
  HStack,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { isServer } from "../utils/isServer";

interface UserProfileProps {
  user?: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  return (
    <Stack>
      {user && (
        <>
          <HStack justify="center" py={12} spacing={12}>
            <Avatar size="xl" />
            <Stack align="flex-start">
              <HStack spacing={6}>
                <Text fontSize="3xl">{user.username}</Text>
                {data?.Me?.username === user.username ? (
                  <Button variant="secondary">Edit profile</Button>
                ) : null}
              </HStack>
              <HStack spacing={8}>
                <Text fontSize="md">{user.postCount} posts</Text>
                <Text fontSize="md">{user.followers} following</Text>
                <Text fontSize="md">{user.following} followers</Text>
              </HStack>
              <Text as="b" fontSize="md">
                {user.username}
              </Text>
              <Text>{user.description}</Text>
            </Stack>
          </HStack>
          <Tabs>
            <TabList isLazy>
              <Tab>POSTS</Tab>
              <Tab>SAVED</Tab>
              <Tab>TAGGED</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </Stack>
  );
};

export default UserProfile;
