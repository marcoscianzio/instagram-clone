import { HStack, Text, VStack } from "@chakra-ui/react";

const Footer: React.FC<{}> = ({}) => {
  const options = [
    "Meta",
    "Información",
    "Blog",
    "Empleo",
    "Ayuda",
    "API",
    "Privacidad",
    "Condiciones",
    "Cuentas destacadas",
    "Hashtags",
    "Ubicaciones",
    "Instagram Lite",
    "Belleza",
    "Danza",
    "Actividad física",
    "Comida y bebida",
    "Hogar y jardinería",
    "Música",
    "Artes visuales",
  ];

  return (
    <HStack py={4} w="full" justify="center" flexWrap="wrap" spacing={6}>
      {options.map((option, i) => (
        <Text fontSize="12px" color="instagram.darkGray" align="center" key={i}>
          {option}
        </Text>
      ))}
    </HStack>
  );
};

export default Footer;
