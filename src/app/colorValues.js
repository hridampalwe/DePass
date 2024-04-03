import { useColorModeValue } from "@chakra-ui/react";
function getColorValues() {
  return {
    bgGradientMainUI: useColorModeValue(
      "radial-gradient(328px at 2.9% 15%, rgb(191, 224, 251) 0%, rgb(232, 233, 251) 25.8%, rgb(252, 239, 250) 50.8%, rgb(234, 251, 251) 77.6%, rgb(240, 251, 244) 100.7%);",
      "radial-gradient(328px at 2.9% 15%, rgb(45, 47, 48) 0%, rgb(33, 34, 35) 25.8%, rgb(36, 16, 33) 50.8%, rgb(30, 50, 50) 77.6%, rgb(28, 44, 36) 100.7%)"
    ),
    gradientLoginUI: useColorModeValue(
      "linear-gradient(to left, #efefbb, #d4d3dd)",
      "radial-gradient(759px at 14% 22.3%, rgb(10, 64, 88) 0%, rgb(15, 164, 102) 90%);"
    ),
    normalButtonBg: useColorModeValue("teal.200", "whiteAlpha.50"),
    mainCardBg: useColorModeValue("whiteAlpha.700", "blackAlpha.700"),
    gray200: useColorModeValue("gray.200", "blackAlpha.400"),
    valueCardBg: useColorModeValue("white", "blackAlpha.300"),
    dividerColor: useColorModeValue("gray.300", "whiteAlpha.200"),
    black: useColorModeValue("gray.500", "gray.700"),
    dePass_logo: useColorModeValue(
      "DePass_Logo_Light.png",
      "DePass_Logo_Dark.png"
    ),
    popoverColor: useColorModeValue("white", "#14201A"),
    darkMode: useColorModeValue("Dark", "Light"),
  };
}

export default getColorValues;
