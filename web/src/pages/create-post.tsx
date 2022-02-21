import { Button, Container, InputRightElement, Stack } from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import { useCreatePostMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const CreatePost: React.FC<{}> = ({}) => {
  const [createPost] = useCreatePostMutation();
  const router = useRouter();

  return (
    <Container maxW="container.md">
      <Navbar />
      <Formik
        initialValues={{ description: "", images: [{ url: "" }] }}
        onSubmit={async (values) => {
          const response = await createPost({
            variables: { values: values },
            update: (cache) => {
              cache.evict({ fieldName: "posts" });
            },
          });

          if (response.data?.createPost) {
            router.push("/");
          }
        }}
      >
        {({ values, isSubmitting, dirty }) => (
          <Stack as={Form}>
            <FieldArray name="images">
              {({ push, remove }) => (
                <>
                  {values.images.map((image, index) => (
                    <InputField
                      pr="4.5rem"
                      key={index}
                      name={`images[${index}].url`}
                      value={image.url}
                      placeholder="image"
                    >
                      <InputRightElement width="4.5rem" h="full">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          x
                        </Button>
                      </InputRightElement>
                    </InputField>
                  ))}
                  <Button
                    variant="secondary"
                    onClick={() => {
                      push({ url: "" });
                    }}
                  >
                    add image
                  </Button>
                </>
              )}
            </FieldArray>
            <InputField textArea name="description" />
            <Button
              isLoading={isSubmitting}
              disabled={!dirty}
              loadingText="creating post..."
              py={8}
              type="submit"
              variant="primary"
            >
              create post
            </Button>
          </Stack>
        )}
      </Formik>
    </Container>
  );
};

export default withApollo()(CreatePost);
