import {
  Avatar,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const Navbar: React.FC<{}> = ({}) => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  let component = null;

  if (loading) {
    component = <Spinner color="secondary" />;
  } else if (!data?.me) {
    component = (
      <ButtonGroup>
        <NextLink href="/login">
          <Button variant="primary">login</Button>
        </NextLink>
        <NextLink href="/register">
          <Button variant="secondary">register</Button>
        </NextLink>
      </ButtonGroup>
    );
  } else {
    component = (
      <HStack spacing={4}>
        <NextLink href="/create-post">
          <Button variant="primary">+</Button>
        </NextLink>
        <Avatar bg="border" />;{" "}
        <NextLink href={`/profile/${data.me.id}`}>
          <Text cursor="pointer">{data.me.displayName}</Text>
        </NextLink>
      </HStack>
    );
  }

  return (
    <HStack as="header" py={12} justify="space-between">
      <NextLink href="/">
        <Heading cursor="pointer">instagram-clone</Heading>
      </NextLink>

      {component}
    </HStack>
  );
};

export default Navbar;
