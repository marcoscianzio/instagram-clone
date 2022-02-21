import { Avatar, HStack, StackProps, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import ToggleFollowButton from "./ToggleFollowButton";

type UserItemProps = StackProps & {
  user: {
    displayName: string;
    id: string;
    isMe: boolean;
    followed: boolean;
  };
};

const UserItem: React.FC<UserItemProps> = ({ user, ...props }) => {
  return (
    <HStack {...props} w="full" justify="space-between">
      <HStack spacing={4}>
        <Avatar bg="border" />
        <NextLink href={`/profile/${user.id}`}>
          <Text cursor="pointer">{user.displayName}</Text>
        </NextLink>
      </HStack>
      {!user.isMe ? (
        <ToggleFollowButton userId={user.id} followed={user.followed} />
      ) : null}
    </HStack>
  );
};

export default UserItem;
