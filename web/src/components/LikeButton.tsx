import { ApolloCache, gql } from "@apollo/client";
import { LikeMutation, useLikeMutation } from "../generated/graphql";
import { LikeIcon } from "../icons/Like";

interface LikeButtonProps {
  targetId: string;
  liked: boolean;
  type: string;
}

const updateAfterLike = (
  targetId: string,
  type: string,
  cache: ApolloCache<LikeMutation>
) => {
  const Entity = type === "post" ? "Post" : "Comment";

  const data = cache.readFragment<{
    id: string;
    liked: boolean;
    likeCount: number;
  }>({
    id: `${Entity}:` + targetId,
    fragment: gql`
      fragment _ on ${Entity} {
        id
        liked
        likeCount
      }
    `,
  });

  console.log({ data, Entity });

  if (data) {
    const newLiked = !data.liked;
    const newCount = data.liked ? data.likeCount - 1 : data.likeCount + 1;

    cache.writeFragment({
      id: `${Entity}:` + targetId,
      fragment: gql`
        fragment __ on ${Entity} {
          liked
          likeCount
        }
      `,
      data: { liked: newLiked, likeCount: newCount },
    });
  }
};

const LikeButton: React.FC<LikeButtonProps> = ({ liked, targetId, type }) => {
  const [like] = useLikeMutation();
  return (
    <LikeIcon
      cursor="pointer"
      fill={liked ? "#ed4956" : "#262626"}
      onClick={async () => {
        return await like({
          variables: {
            targetId,
            type,
          },
          update: (cache) => {
            updateAfterLike(targetId, type, cache);
          },
        });
      }}
    />
  );
};

export default LikeButton;
