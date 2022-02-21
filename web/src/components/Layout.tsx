import { Container } from "@chakra-ui/react";
import Navbar from "./Navbar";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container maxW="container.md">
      <Navbar />
      {children}
    </Container>
  );
};

export default Layout;
