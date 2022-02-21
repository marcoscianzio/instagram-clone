import { ApolloCache, gql } from "@apollo/client";
import { Button, ButtonProps } from "@chakra-ui/react";
import { FollowMutation, useFollowMutation } from "../generated/graphql";

type ToggleFollowButtonProps = ButtonProps & {
  followed: boolean | null | undefined;
  userId: string | null | undefined;
};

const updateAfterToggle = (
  userId: string | null | undefined,
  cache: ApolloCache<FollowMutation>
) => {
  const data = cache.readFragment<{
    id: string;
    followersCount: number;
    followed: boolean;
  }>({
    id: "User:" + userId,
    fragment: gql`
      fragment sdskjsdfjkfdjk on User {
        id
        followersCount
        followed
      }
    `,
  });

  if (data) {
    const newFollowed = data.followed ? false : true;
    const newFollowerCount = newFollowed
      ? data.followersCount + 1
      : data.followersCount - 1;

    cache.writeFragment({
      id: "User:" + userId,
      fragment: gql`
        fragment _updateAfterToggleWrite on User {
          followersCount
          followed
        }
      `,
      data: {
        followersCount: newFollowerCount,
        followed: newFollowed,
      },
    });
  } else {
    cache.evict({ fieldName: "posts" });
  }
};

const ToggleFollowButton: React.FC<ToggleFollowButtonProps> = ({
  followed,
  userId,
  ...props
}) => {
  const [toggleFollow, { loading }] = useFollowMutation();

  return (
    <>
      <Button
        {...props}
        isLoading={loading}
        loadingText={followed ? "unfollowing..." : "following..."}
        variant={followed ? "secondary" : "primary"}
        onClick={async () => {
          return await toggleFollow({
            variables: {
              userId: userId!,
            },
            update: (cache) => {
              updateAfterToggle(userId, cache);
            },
          });
        }}
      >
        {followed ? "followed" : "follow"}
      </Button>
    </>
  );
};

export default ToggleFollowButton;
