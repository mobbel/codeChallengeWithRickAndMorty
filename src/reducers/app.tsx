import { setFavoriteCookie } from "../functions/cookie";

export interface IAppState {
  favorites?: string[];
}

export enum AppTypeKeys {
  ADD_FAVORITE = "app/ADD_FAVORITE",
  REMOVE_FAVORITE = "app/REMOVE_FAVORITE"
}

export interface IAddFavorite {
  type: AppTypeKeys.ADD_FAVORITE,
  data: string;
}

export interface IRemoveFavorite {
  type: AppTypeKeys.REMOVE_FAVORITE,
  data: string;
}

export type AppActionType =
  | IAddFavorite
  | IRemoveFavorite;

export const initialAppState: IAppState = {};

export const appState = (state: IAppState = initialAppState, action: AppActionType) => {
  switch (action.type) {
    case AppTypeKeys.ADD_FAVORITE:
      let newFavList: string[] = [];
      if(state.favorites) {
        newFavList = state.favorites;
      }
      if(newFavList.indexOf(action.data) < 0) {
        newFavList.push(action.data)
        setFavoriteCookie(newFavList);
      }
      return {...state, favorites: newFavList };
    case AppTypeKeys.REMOVE_FAVORITE:
      let newRedFavList: string[] = state.favorites ? state.favorites : [];
      if(state.favorites && state.favorites.length > 1) {
        newRedFavList?.splice(state.favorites?.indexOf(action.data), 1)
      } else if(state.favorites && state.favorites.length == 1 && state.favorites[0] == action.data) {
        newRedFavList = [];
      }
      setFavoriteCookie(newRedFavList);
      return {...state, favorites: newRedFavList};
    default:
      return state;
  }
}