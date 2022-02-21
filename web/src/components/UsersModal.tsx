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

type User = {
  id: string;
  displayName: string;
  followed: boolean;
  isMe: boolean;
};

type UsersModalProps = {
  count: number;
  users: User[];
  title: string;
};

const UsersModal: React.FC<UsersModalProps> = ({ count, users, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    onClose();
  }, [router.asPath]);

  return (
    <>
      <Text
        onClick={() => {
          if (users?.length > 0) {
            onOpen();
          }
        }}
        cursor={users?.length > 0 ? "pointer" : "default"}
      >
        <Text as="b">{count} </Text>
        {title}
      </Text>

      <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack pb={4} spacing={6}>
              {users &&
                users.map((user) => <UserItem key={user.id} user={user} />)}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UsersModal;
