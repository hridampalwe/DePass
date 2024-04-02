import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";

import getColorValues from "./colorValues";
import { useState } from "react";

export function PasswordInput({ value, copyToClipboard }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        value={value}
        readOnly
        pr="4.5rem"
        variant="filled"
        size="lg"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        onClick={(e) => {
          copyToClipboard(e);
        }}
      />
      <InputRightElement mt="3px" width="4.5rem">
        <Button h="90%" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
export function PasswordInputDrawer({
  value,
  handleInputChange,
  placeholder,
  keyVal,
}) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        value={value}
        pr="4.5rem"
        type={show ? "text" : "password"}
        size="lg"
        variant="outline"
        placeholder={placeholder}
        name={keyVal}
        onChange={(e) => handleInputChange(e)}
      />
      <InputRightElement mt="3px" width="4.5rem">
        <Button h="90%" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
export function UsePopover({
  onClickFunction,
  buttonSize,
  buttonText,
  buttonIcon,
}) {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const colorValues = getColorValues();
  return (
    <Popover placement="top" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          rightIcon={buttonIcon}
          size={buttonSize}
          colorScheme={"red"}
          variant="outline"
          onClick={onToggle}
        >
          {buttonText}
        </Button>
        {/* {buttonToTrigger()} */}
      </PopoverTrigger>
      <PopoverContent bg={colorValues.popoverColor} maxW="180px">
        <PopoverHeader fontSize="16px">Are you sure?</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <HStack>
            <Button size="sm" onClick={onClickFunction}>
              Yes
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              No
            </Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
