import { Box, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ArrayImagesIcon } from "../icons/ArrayImages";

interface ProfilePostProps {
  post: any;
}

const ProfilePost: React.FC<ProfilePostProps> = ({ post }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  return (
    <Box
      key={post.id}
      position="relative"
      cursor="pointer"
      onClick={() => router.push(`/post/${post.id}`)}
    >
      {post.images ? (
        <>
          <Image
            height="500px"
            _hover={{
              filter: "brightness(0.5)",
            }}
            onMouseEnter={() => {
              setIsVisible(true);
            }}
            onMouseLeave={() => {
              setIsVisible(false);
            }}
            rounded="xl"
            objectFit="cover"
            w="full"
            src={post.images[0].url}
          />
          {post.isArrayOfImages ? (
            <ArrayImagesIcon position="absolute" top={8} right={8} />
          ) : null}
          <Box
            display={isVisible ? "block" : "none"}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
          >
            <Text mr={4} fontSize="md" as="b" color="white">
              {post.likeCount} likes
            </Text>
            <Text fontSize="md" as="b" color="white">
              {post.commentCount} comments
            </Text>
          </Box>
        </>
      ) : (
        post.description
      )}
    </Box>
  );
};

export default ProfilePost;
