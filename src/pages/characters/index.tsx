import { GetStaticProps } from "next";
import CharacterList from "../../ui/characters/characterList";

interface ICharacterPageProperties {
  characters: {
    id: string;
    name: string;
  }[];
  pages: string;
  addFavorite: (index: string) => void;
  removeFavorite: (index: string) => void;
  favoriteList: string[];
}

const Characters = (properties: ICharacterPageProperties) => {
  console.log("Properties: ", properties);
  

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900">Characters overview Page</h2>
      </div>
      <CharacterList
        characters={properties.characters}
        favoriteList={properties.favoriteList}
      />
      <div>Pages: {properties.pages}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const charactersRes = await fetch(
    "https://rickandmortyapi.com/graphql",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            characters {
              info {
                pages
              },
              results {
                id,
                name
              }
            }
          }
        `,
      }),
    }
  )
  .then((res) => res.json())
  .then((result) => {return result.data.characters});

  const characters = charactersRes.results;
  const pages = charactersRes.info.pages;

  return {
    props: {
      characters,
      pages
    },
    revalidate: 10,
  }
}

export default Characters;