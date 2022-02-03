import { Container } from "@chakra-ui/react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxW={"container.xl"} w={"full"}>
        {children}
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
