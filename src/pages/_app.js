import React from "react";
import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/react";
import { StyledEngineProvider, useTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import json2mq from "json2mq";
import {Provider} from 'react-redux';
import "../styles/globals.css";
import createEmotionCache from "../theme/createEmotionCache";
import ThemeProvider from "../theme";
import MainLayout from "@/layout";
import {store} from "../redux/store";
import { setToken } from "@/redux/reducers/setToken";

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  const location = useRouter();
  const theme = useTheme();
  const isMobileTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(
    json2mq({
      minWidth: 1400,
    }),
    {
      noSsr: true,
    }
  );
  React.useEffect(()=>{
    const token = window?.localStorage?.getItem("token");
    if(token){
      store.dispatch(setToken(token));
    }
  },[]);
  return (
    <>
      <Head>
        <title>Web Assignments</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider>
          <CssBaseline />
          <MainLayout isMobileTablet={isMobileTablet}>
            <Component
              {...pageProps}
              isMobileTablet={isMobileTablet}
              isLargeScreen={isLargeScreen}
            />
          </MainLayout>
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
      </Provider>
    </>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};