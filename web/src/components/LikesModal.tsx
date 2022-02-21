import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserItem from "./UserItem";

type Like = {
  id: string;
  user: {
    id: string;
    displayName: string;
    followed: boolean;
    isMe: boolean;
  };
};

type LikesModalProps = {
  count: number;
  likes: Like[];
  isComment: boolean;
};

const LikesModal: React.FC<LikesModalProps> = ({ count, likes, isComment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    onClose();
  }, [router.asPath]);

  return (
    <>
      <Text
        as="b"
        fontSize={isComment ? "smaller" : "md"}
        color={isComment ? "secondary" : "black"}
        cursor={likes.length > 0 ? "pointer" : "default"}
        onClick={() => {
          if (likes?.length > 0) {
            onOpen();
          }
        }}
      >
        {isComment
          ? `${count} ${count === 1 ? "like" : "likes"}`
          : `liked by ${count} ${count === 1 ? "person" : "people"}`}
      </Text>

      <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>liked by</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack pb={4} spacing={6}>
              {likes &&
                likes.map((like) => (
                  <UserItem key={like.id} user={like.user} />
                ))}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LikesModal;
