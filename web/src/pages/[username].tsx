import { useRouter } from "next/dist/client/router";
import Layout from "../components/Layout";
import UserProfile from "../components/UserProfile";
import { useUserQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Profile: React.FC<{}> = ({}) => {
  const router = useRouter();

  const { username } = router.query;

  const { data, loading } = useUserQuery({
    variables: {
      username: username as string,
    },
  });

  return (
    <Layout>
      {data && !loading ? <UserProfile user={data.user} /> : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Profile);
