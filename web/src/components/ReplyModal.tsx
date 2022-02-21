import { ApolloCache, gql } from "@apollo/client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import {
  CreateCommentMutation,
  RegularCommentFragment,
  useCreateCommentMutation,
} from "../generated/graphql";
import Comment from "./Comment";
import InputField from "./InputField";

interface ReplyModalProps {
  parentComment: RegularCommentFragment;
}

const updateAfterReply = (
  commentId: string,
  cache: ApolloCache<CreateCommentMutation>
) => {
  const data = cache.readFragment<{
    childrenCount: number;
  }>({
    id: "Comment:" + commentId,
    fragment: gql`
      fragment __4 on Comment {
        id
        childrenCount
      }
    `,
  });

  if (data) {
    const newChildrenCount = data.childrenCount + 1;

    cache.writeFragment({
      id: "Comment:" + commentId,
      fragment: gql`
        fragment __5 on Comment {
          id
          childrenCount
        }
      `,
      data: {
        childrenCount: newChildrenCount,
      },
    });
  }
};

const ReplyModal: React.FC<ReplyModalProps> = ({ parentComment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const realId = parentComment.parentCommentId
    ? parentComment.parentCommentId
    : parentComment.id;

  const [createComment] = useCreateCommentMutation();
  return (
    <>
      <Text
        cursor="pointer"
        onClick={onOpen}
        fontSize="smaller"
        as="b"
        color="secondary"
      >
        reply
      </Text>

      <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>reply</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={8}>
              <Comment isReply={true} comment={parentComment} />
              <Text as="b" color="secondary">
                answering @{parentComment.user.displayName}
              </Text>
              <Stack direction="row">
                <Avatar bg="border"></Avatar>
                <Formik
                  initialValues={{ content: "" }}
                  onSubmit={async ({ content }, { resetForm }) => {
                    return await createComment({
                      variables: {
                        values: {
                          content,
                          postId: parentComment.postId,
                          parentCommentId: realId,
                          repliedUserId: parentComment.parentCommentId
                            ? parentComment.user.id
                            : null,
                        },
                      },
                      update: (cache) => {
                        updateAfterReply(realId, cache);
                        cache.evict({ fieldName: "commentReplies" });
                        resetForm();
                        onClose();
                      },
                    });
                  }}
                >
                  {({ dirty, isSubmitting }) => (
                    <Stack
                      pb={4}
                      w="full"
                      as={Form}
                      id="reply-form"
                      spacing={4}
                    >
                      <InputField name="content" textArea />
                      <Button
                        type="submit"
                        disabled={!dirty}
                        isLoading={isSubmitting}
                        loadingText="replying"
                        w="auto"
                        variant="primary"
                      >
                        reply
                      </Button>
                    </Stack>
                  )}
                </Formik>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReplyModal;
