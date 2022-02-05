import {
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import Box from "../components/Box";
import Field from "../components/Field";
import Footer from "../components/Footer";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

const Register: React.FC<{}> = ({}) => {
  const [register, { loading }] = useRegisterMutation();

  const router = useRouter();

  return (
    <Container maxW={"container.xl"} minH={"100vh"} w={"full"} pt={12}>
      <HStack justify="center">
        <Box p={8} align="center" w="350px" spacing={6}>
          <Heading fontSize="6xl">Instagram</Heading>
          <Text
            align="center"
            fontWeight="600"
            fontSize="md"
            color="instagram.darkGray"
          >
            Regístrate para ver fotos y vídeos de tus amigos.
          </Text>
          <Formik
            onSubmit={async (values, { setErrors }) => {
              const response = await register({
                variables: {
                  options: values,
                },
                update: (cache, { data }) => {
                  if (!data.register.errors) {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        Me: {
                          __typename: "User",
                          ...data.register.user,
                        },
                      },
                    });
                  }
                },
              });

              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else {
                router.replace("/");
              }
            }}
            initialValues={{
              email: "",
              number: "",
              name: "",
              username: "",
              password: "",
            }}
          >
            {({ dirty }) => (
              <Stack as={Form} w="full">
                <Field name="number" placeholder="Telephone number" />
                <Field name="email" placeholder="Email" />
                <Field name="name" placeholder="Your name" />
                <Field name="username" placeholder="Username" />
                <Field type="password" name="password" placeholder="Password" />
                <Button
                  isLoading={loading}
                  type="submit"
                  disabled={!dirty}
                  variant="primary"
                >
                  Register
                </Button>
              </Stack>
            )}
          </Formik>
          <Text align="center" color="instagram.darkGray" fontSize="xs">
            Al registrarte, aceptas nuestras Condiciones, la Política de datos y
            la Política de cookies.
          </Text>
        </Box>
      </HStack>
      <Footer />
    </Container>
  );
};

export default withApollo()(Register);
