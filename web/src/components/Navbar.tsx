import {
  Avatar,
  Box,
  Container,
  Heading,
  HStack,
  Input,
  Link,
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import NextLink from "next/link";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { HomeIcon } from "../icons/Home";
import { ChatIcon } from "../icons/Chat";
import { PostIcon } from "../icons/Post";
import { LikeIcon } from "../icons/Like";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  const apolloClient = useApolloClient();

  const router = useRouter();

  const [logout, { loading: loadingLogout }] = useLogoutMutation();

  let body = null;

  if (loading) {
    body = <Spinner />;
  } else if (data?.Me) {
    body = (
      <HStack spacing={8}>
        <HomeIcon />
        <ChatIcon />
        <PostIcon />
        <LikeIcon />
        <Menu size="sm">
          <MenuButton
            _hover={{ cursor: "pointer" }}
            as={Avatar}
            bg="instagram.border"
            size="sm"
          />
          <MenuList>
            <NextLink href={`/${data.Me.username}`}>
              <MenuItem>Profile</MenuItem>
            </NextLink>

            <MenuItem>Saved</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Change account</MenuItem>
            <MenuDivider />
            <MenuItem
              onClick={async () => {
                await logout();
                apolloClient.resetStore();
                apolloClient.clearStore();
              }}
            >
              {loadingLogout ? <Spinner /> : "Logout"}
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    );
  } else {
    body = (
      <NextLink href="/login">
        <Link>Login</Link>
      </NextLink>
    );
  }

  return (
    <Box
      bg="white"
      borderBottomWidth={1}
      borderBottomColor={"instagram.border"}
    >
      <Container maxW={"container.xl"}>
        <HStack py={6} as="nav" justify={"space-between"}>
          <NextLink href="/">
            <Heading _hover={{ cursor: "pointer" }}>Instagram</Heading>
          </NextLink>
          <Input maxW="600px" placeholder="Search" />
          {body}
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
