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

export const initialAppState = {};

export const appState = (state: IAppState = initialAppState, action: AppActionType) => {
  switch (action.type) {
    case AppTypeKeys.ADD_FAVORITE:
      let newFavList: string[] = [];
      if(state.favorites) {
        newFavList = state.favorites;
      }
      if(newFavList.indexOf(action.data) < 0) {
        newFavList.push(action.data)
      }
      return {...state, favorites: newFavList };
    case AppTypeKeys.REMOVE_FAVORITE:
      let newRedFavList: string[] | undefined = state.favorites;
      console.log("FavList1: ", newRedFavList);
      if(state.favorites && state.favorites.length > 1) {
        newRedFavList?.slice(state.favorites?.indexOf(action.data), 1)
      } else if(state.favorites && state.favorites.length == 1 && state.favorites[0] == action.data) {
        newRedFavList = [];
      }
      console.log("FavList2: ", newRedFavList);
      return {...state, favorites: newRedFavList};
    default:
      return state;
  }
}