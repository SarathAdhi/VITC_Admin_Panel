import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: `'Saira Extra Condensed', sans-serif`,
    heading: `'Saira Extra Condensed', sans-serif`,
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
