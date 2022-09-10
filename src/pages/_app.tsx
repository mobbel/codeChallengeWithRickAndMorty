import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import Layout from "../ui/layout";
import { useReducer } from "react";
import { appState, AppTypeKeys, initialAppState } from "../reducers/app";
import { getFavoriteCookie } from "../functions/cookie";

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const favoriteCookie = getFavoriteCookie();

  if(favoriteCookie) {
    initialAppState.favorites = favoriteCookie;
  }

  const [appComponentState, dispatch] = useReducer(appState, initialAppState);

  const addFavorite = (index: string) => {
    dispatch({
      type: AppTypeKeys.ADD_FAVORITE,
      data: index,
    });
  };

  const removeFavorite = (index: string) => {
    dispatch({
      type: AppTypeKeys.REMOVE_FAVORITE,
      data: index,
    });
  };

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component
          {...pageProps}
          {...appComponentState}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          favoriteList={appComponentState.favorites}
        />
      </Layout>
    </SessionProvider>
  );
};

export default MyApp;
