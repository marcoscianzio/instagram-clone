import { Button } from "@chakra-ui/react";
import { useFollowMutation } from "../generated/graphql";

const FollowButton: React.FC<{
  username?: string;
  followed?: boolean;
  follower?: boolean;
}> = ({ username, followed, follower }) => {
  const [follow, { loading }] = useFollowMutation();

  let text;

  if (follower && !followed) {
    text = "Follow too";
  } else if (followed) {
    text = "Followed";
  } else {
    text = "Follow";
  }

  return (
    <Button
      variant={followed ? "secondary" : "primary"}
      onClick={async () => {
        return follow({
          variables: { username },
          update: (cache) => {
            cache.evict({ fieldName: "user" });
          },
        });
      }}
      isLoading={loading}
    >
      {text}
    </Button>
  );
};

export default FollowButton;
