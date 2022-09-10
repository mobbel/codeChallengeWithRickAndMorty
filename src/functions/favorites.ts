export const saveFavoritesToDB = (favorites: string[]) => {
  fetch(
    "/api/favorites",
    {
      method:"PUT",
      body: JSON.stringify({
        favoriteList: favorites.join(":"),
      })
    }
  )

}