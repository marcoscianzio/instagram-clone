import { Box, HStack, Image, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
//@ts-ignore
import ReactSlidy from "react-slidy";
import { RegularPostFragment } from "../generated/graphql";
import { CommentIcon } from "../icons/Comment";
import LikeButton from "./LikeButton";
import LikesModal from "./LikesModal";
import UserItem from "./UserItem";

interface PostProps {
  post: RegularPostFragment;
  children?: ReactNode;
}

const Post: React.FC<PostProps> = ({ children, post }) => {
  const router = useRouter();

  return (
    <Box borderWidth={1} borderColor="border" rounded="xl">
      <UserItem p={4} user={post.user} />
      {post.isArrayOfImages ? (
        <ReactSlidy itemsToPreload={post.images?.length}>
          {post.images?.map((image) => (
            <Image
              height="500px !important"
              objectFit="cover"
              key={image.id}
              src={image.url}
            />
          ))}
        </ReactSlidy>
      ) : post.images ? (
        <Image
          height="500px"
          objectFit="cover"
          w="full"
          src={post.images[0].url}
        />
      ) : null}
      <Stack p={4} spacing={4}>
        <HStack spacing={6}>
          <LikeButton liked={post.liked} targetId={post.id} type="post" />
          <CommentIcon cursor="pointer" />
        </HStack>

        <Stack spacing={1}>
          <LikesModal count={post.likeCount} likes={post.likes} />
          <Text>
            <Text as="b">{post.user.email}</Text> {post.description}
          </Text>
          {post.commentCount !== 0 && !router.asPath.includes("post") && (
            <NextLink href={`/post/${post.id}`}>
              <Link color="secondary">see {post.commentCount} comments</Link>
            </NextLink>
          )}
        </Stack>
        <Text color="secondary" fontSize="small">
          {new Date(post.createdAt).toString()}
        </Text>
      </Stack>
      {children}
    </Box>
  );
};

export default Post;
