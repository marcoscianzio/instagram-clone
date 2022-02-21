import {
  Avatar,
  Collapse,
  HStack,
  Link,
  Spinner,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import {
  RegularCommentFragment,
  useCommentRepliesLazyQuery,
} from "../generated/graphql";
import LikeButton from "./LikeButton";
import LikesModal from "./LikesModal";
import ReplyModal from "./ReplyModal";

type CommentProps = StackProps & {
  comment: RegularCommentFragment;
  isReply?: boolean;
};

const Comment: React.FC<CommentProps> = ({ comment, isReply, ...props }) => {
  const [loadReplies, { loading, data }] = useCommentRepliesLazyQuery();
  const [toggleReplies, setToggleReplies] = useState(false);

  return (
    <Stack {...props}>
      <Stack direction="row" spacing={4}>
        <Avatar bg="border" size="sm" />
        <HStack w="full" justify="space-between">
          <Text wordBreak="break-word">
            <Text as="b" fontSize="sm">
              {comment.user.displayName}
            </Text>{" "}
            {comment.repliedUserId ? (
              <NextLink href={`/profile/${comment.repliedUser?.id}`}>
                <Link color="primary">@{comment.repliedUser?.displayName}</Link>
              </NextLink>
            ) : null}{" "}
            {comment.content}
          </Text>
          <LikeButton
            liked={comment.liked}
            targetId={comment.id}
            type="comment"
          />
        </HStack>
      </Stack>
      <HStack spacing={4}>
        <Text fontSize="smaller" color="secondary">
          {new Date(comment.createdAt).toString()}
        </Text>
        <LikesModal isComment likes={comment.likes} count={comment.likeCount} />
        {isReply ? null : (
          <Text fontSize="smaller" as="b" color="secondary">
            {comment.childrenCount} replies
          </Text>
        )}
        <ReplyModal parentComment={comment} />
      </HStack>
      {isReply || comment.childrenCount < 1 ? null : (
        <Text
          cursor="pointer"
          onClick={async () => {
            setToggleReplies((currState) => !currState);
            await loadReplies({
              variables: {
                parentCommentId: comment.id as string,
                postId: comment.postId,
              },
            });
          }}
          pt={2}
          color="secondary"
          as="b"
          fontSize="smaller"
        >
          {toggleReplies ? "close replies" : "see replies"} (
          {comment.childrenCount}){" "}
          {loading ? (
            <Spinner size="sm" thickness="2px" color="secondary" />
          ) : null}
        </Text>
      )}
      <Collapse
        in={(data?.commentReplies || []) && toggleReplies}
        animateOpacity
      >
        <Stack pt={2} spacing={6} pl={8}>
          {data?.commentReplies?.map((comment) => (
            <Comment key={comment.id} isReply={true} comment={comment} />
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default Comment;
