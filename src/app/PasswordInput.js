import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

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

// export default { PasswordInput, PasswordInputDrawer };
