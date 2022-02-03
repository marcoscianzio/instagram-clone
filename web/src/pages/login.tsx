import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Box from "../components/Box";
import Field from "../components/Field";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";

const Login: React.FC<{}> = ({}) => {
  const [login] = useLoginMutation();
  const router = useRouter();

  return (
    <Container maxW={"container.xl"} minH={"100vh"} w={"full"} pt={12}>
      <HStack justify="center">
        <Image
          src="https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png"
          alt="mobile"
        />
        <Stack spacing={4} w="350px">
          <Box align="center" py={8} spacing={4}>
            <Heading>Instagram</Heading>
            <Formik
              onSubmit={async (values, { setErrors }) => {
                const response = await login({
                  variables: {
                    ...values,
                  },
                  update: (cache, { data }) => {
                    if (!data.login.errors) {
                      cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                          __typename: "Query",
                          Me: {
                            __typename: "User",
                            ...data.login.user,
                          },
                        },
                      });
                    }
                  },
                });

                if (response.data?.login.errors) {
                  setErrors(toErrorMap(response.data.login.errors));
                } else {
                  router.replace("/");
                }
              }}
              initialValues={{ usernameOrNumberOrEmail: "", password: "" }}
            >
              {({ isSubmitting }) => (
                <Stack as={Form} w="full" px={8}>
                  <Field
                    name="usernameOrNumberOrEmail"
                    placeholder="Number, username or email"
                  />
                  <Field
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                  <Button
                    loadingText="Logging"
                    isLoading={isSubmitting}
                    variant="primary"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Link fontSize="13px" align="center">
                    Forgot you password?
                  </Link>
                </Stack>
              )}
            </Formik>
          </Box>
          <Box justify="center" direction="row" py={4}>
            <Text>Don't have an account?</Text>
            <Link>Register</Link>
          </Box>
          <Text align="center">Download the application</Text>
          <HStack justify={"center"}>
            <Image
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_castilian_spanish-es.png/bec9a7397c42.png"
              h="40px"
              alt="app store"
            />
            <Image
              src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_spanish-es.png/723534f78879.png"
              h="40px"
              alt="google play"
            />
          </HStack>
        </Stack>
      </HStack>
    </Container>
  );
};

export default withApollo()(Login);
