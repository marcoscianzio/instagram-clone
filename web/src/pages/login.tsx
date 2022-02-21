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
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { GithubIcon } from "../icons/Github";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";

const Login: React.FC<{}> = ({}) => {
  const [login] = useLoginMutation();
  const router = useRouter();

  return (
    <Container maxW="100vw" w="100vw" minH="100vh" h="100vh" p={0}>
      <HStack h="full">
        <VStack w="50%" h="full" justify="center">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                variables: {
                  values,
                },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      //@ts-ignore
                      me: data?.login.user,
                    },
                  });
                },
              });

              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else {
                router.push("/");
              }
            }}
          >
            {({ dirty, isSubmitting }) => (
              <Stack as={Form} w="50%" spacing={6}>
                <InputField name="email" />
                <InputField name="password" type="password" />
                <HStack justify="space-between">
                  <NextLink href="/register">
                    <Link color="secondary">register?</Link>
                  </NextLink>
                  <Button
                    disabled={!dirty}
                    isLoading={isSubmitting}
                    loadingText="logging"
                    type="submit"
                    py={8}
                    variant="primary"
                  >
                    login
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
        <Stack w="50%" h="full"></Stack>
      </HStack>
    </Container>
  );
};

export default withApollo()(Login);
