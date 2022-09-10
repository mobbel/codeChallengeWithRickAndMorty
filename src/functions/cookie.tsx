import cookie from "cookie";

export const setFavoriteCookie = (cookieContent: string[]) => {
  document.cookie = cookie.serialize('favorites', cookieContent.join(":"));
};

export const getFavoriteCookie = () => {
  const cookieObject = typeof document != "undefined" ? cookie.parse(document.cookie): {};

  return cookieObject.favorites?.split(":");
}