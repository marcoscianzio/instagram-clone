import {
  Button,
  Container,
  Divider,
  HStack,
  Link,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import InputField from "../components/InputField";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { GithubIcon } from "../icons/Github";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";

const Register: React.FC<{}> = ({}) => {
  const [register] = useRegisterMutation();
  const router = useRouter();

  return (
    <Container maxW="100vw" w="100vw" minH="100vh" h="100vh" p={0}>
      <HStack h="full">
        <Stack w="50%" h="full"></Stack>
        <VStack w="50%" h="full" justify="center">
          <Formik
            initialValues={{ email: "", displayName: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: {
                  values,
                },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      //@ts-ignore
                      me: data?.register.user,
                    },
                  });
                },
              });

              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else {
                router.push("/");
              }
            }}
          >
            {({ dirty, isSubmitting }) => (
              <Stack as={Form} w="50%" spacing={6}>
                <InputField name="email" />
                <InputField name="displayName" />
                <InputField name="password" type="password" />
                <HStack justify="space-between">
                  <NextLink href="/login">
                    <Link color="secondary">login?</Link>
                  </NextLink>
                  <Button
                    disabled={!dirty}
                    isLoading={isSubmitting}
                    loadingText="registering"
                    type="submit"
                    py={8}
                    variant="primary"
                  >
                    register
                  </Button>
                </HStack>
                <Divider borderColor="border" />

                <Button
                  as="a"
                  href="http://localhost:4000/auth/github"
                  variant="secondary"
                  py={6}
                  leftIcon={<GithubIcon />}
                >
                  login with github
                </Button>
              </Stack>
            )}
          </Formik>
        </VStack>
      </HStack>
    </Container>
  );
};

export default withApollo()(Register);
