import { forwardRef, Stack, StackProps } from "@chakra-ui/react";

const Box = forwardRef<StackProps, "div">((props, ref) => (
  <Stack
    borderWidth={1}
    borderColor={"instagram.border"}
    bg={"white"}
    rounded={"sm"}
    ref={ref}
    {...props}
  />
));

export default Box;
