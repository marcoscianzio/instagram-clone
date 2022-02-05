import { RegularUserFragment, useMeQuery } from "../generated/graphql";
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
  SimpleGrid,
  Image,
  Box,
} from "@chakra-ui/react";
import { isServer } from "../utils/isServer";
import { GirdIcon } from "../icons/Grid";
import { SavedIcon } from "../icons/Saved";
import { TagIcon } from "../icons/Tag";
import { useState } from "react";

interface UserProfileProps {
  user?: RegularUserFragment;
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
            <Avatar size="2xl" bg="instagram.border" />
            <Stack align="flex-start">
              <HStack spacing={6}>
                <Text fontSize="3xl">{user.username}</Text>
                {data?.Me?.username === user.username ? (
                  <Button variant="secondary">Edit profile</Button>
                ) : null}
              </HStack>
              <HStack spacing={8}>
                <Text fontSize="md">
                  <b>{user.postCount}</b> post{user.postCount == 1 ? null : "s"}
                </Text>
                <Text fontSize="md">
                  <b>{user.followers}</b> following
                </Text>
                <Text fontSize="md">
                  <b>{user.following}</b> followers
                </Text>
              </HStack>
              <Text as="b" fontSize="md">
                {user.username}
              </Text>
              <Text>{user.description}</Text>
            </Stack>
          </HStack>
          <Tabs>
            <TabList isLazy>
              <Tab>
                <GirdIcon marginRight={2} />
                POSTS
              </Tab>
              <Tab>
                <SavedIcon marginRight={2} />
                SAVED
              </Tab>
              <Tab>
                <TagIcon marginRight={2} />
                TAGGED
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={3} spacing={10}>
                  {user.posts.map(({ image, votes }) => {
                    const [isVisible, setIsVisible] = useState(false);

                    return (
                      <Box position="relative" cursor="pointer">
                        <Image
                          _hover={{
                            filter: "brightness(0.5)",
                          }}
                          src={image}
                          h={96}
                          objectFit="cover"
                          onMouseEnter={() => {
                            setIsVisible(true);
                          }}
                          onMouseLeave={() => {
                            setIsVisible(false);
                          }}
                          w="full"
                        />
                        <Box
                          display={isVisible ? "block" : "none"}
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%,-50%)"
                        >
                          <Text fontSize="md" as="b" color="white">
                            {votes} likes
                          </Text>
                        </Box>
                      </Box>
                    );
                  })}
                </SimpleGrid>
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
