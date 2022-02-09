import { Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Layout from "../components/Layout";
import UserProfile from "../components/UserProfile";
import { useUserQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Profile: React.FC<{}> = ({}) => {
  const router = useRouter();
  let component;

  const { username } = router.query;

  const { data, loading } = useUserQuery({
    variables: {
      username: username as string,
    },
  });

  if (loading) {
    component = null;
  } else if (data?.user) {
    component = <UserProfile user={data.user} />;
  } else {
    component = (
      <Stack align="center" p={8} spacing={6}>
        <Text as="b" fontSize="2xl">
          Esta página no está disponible.
        </Text>
        <Text fontSize="md">
          Es posible que el enlace que has seguido sea incorrecto o que se haya
          eliminado la página
        </Text>
      </Stack>
    );
  }

  return <Layout>{component}</Layout>;
};

export default withApollo({ ssr: true })(Profile);
