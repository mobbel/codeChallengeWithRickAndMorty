import { GetStaticProps } from "next";
import EpisodeList from "../../ui/episodes/episodeList";

interface IEpisodesPageProperties {
  episodes: {
    id: string;
    name: string;
  }[];
  pages: string;
  addFavorite: (index: string) => void;
  removeFavorite: (index: string) => void;
}

const Episodes = (properties: IEpisodesPageProperties) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900">Episodes overview Page</h2>
      </div>
      
      <EpisodeList
        episodes={properties.episodes}
      />
      <div>Pages: {properties.pages}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const episodesRes = await fetch(
    "https://rickandmortyapi.com/graphql",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            episodes {
              info {
                pages
              }
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
  .then((result) => {return result.data.episodes});

  const episodes = episodesRes.results;
  const pages = episodesRes.info.pages

  return {
    props: {
      episodes,
      pages
    },
    revalidate: 10,
  }
}
export default Episodes;