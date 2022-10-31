import "../styles/globals.css";
import { ChakraProvider, extendTheme, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { appStore } from "@utils/store";

const theme = extendTheme({
  fonts: {
    body: `'Saira Extra Condensed', sans-serif`,
    heading: `'Saira Extra Condensed', sans-serif`,
  },
});

const Loader = () => (
  <div className="h-screen w-full grid place-content-center">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.600"
      size={"lg"}
    />
  </div>
);

const MyApp = ({ Component, pageProps }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { getProfile } = appStore();

  const fetchAuth = async () => {
    await getProfile();
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {isLoading ? <Loader /> : <Component {...pageProps} />}
    </ChakraProvider>
  );
};

export default MyApp;
