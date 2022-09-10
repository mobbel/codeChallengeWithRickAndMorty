import { useCallback } from "react";
import EpisodeList from "../../ui/episodes/episodeList";

interface IcharacterDetailsProps {
  characterDetail: {
    id: string;
    name: string;
    species: string;
    image: string;
    gender: string;
    location: {
      name: string;
    }
    episode: {
      id: string;
      name: string;
    }[];
  }
  addFavorite: (index: string) => void;
  removeFavorite: (index: string) => void;
  favoriteList: string[];
}

const characterDetails = (props: IcharacterDetailsProps) => {
  const toggleFavorite = useCallback((id: string) => () => {
    if(props.favoriteList?.indexOf(`${id}`) >= 0) {
      props.removeFavorite(id);
    } else {
      props.addFavorite(id);
    }
  }, [props.favoriteList]);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 clearfix">
        <div className="description">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              <span className="floatLeft">{props.characterDetail.name}&nbsp;&nbsp;</span>
              <img src={props.favoriteList?.indexOf(`${props.characterDetail.id}`) >= 0 ? "/static/herz_red.png" : "/static/herz.png"} onClick={toggleFavorite(props.characterDetail.id)} />
              </h2>
          </div>
          <div className="px-4 py-2 sm:px-6">
            Species: {props.characterDetail.species}
          </div>
          <div className="px-4 py-2 sm:px-6">
            Gender: {props.characterDetail.gender}
          </div>
          <div className="px-4 py-2 sm:px-6">
            Location: {props.characterDetail.location.name}
          </div>
        </div>
        <img className="sm:rounded-lg" src={props.characterDetail.image} />
      </div>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">List of episodes:</h3>
      </div>
      <EpisodeList
        episodes={props.characterDetail.episode}
      />
    </div>
  );
}

export const getStaticProps = async ({params}: any) => {
  const characterDetail = await fetch(
    "https://rickandmortyapi.com/graphql",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            character(id: ${params.characterId}) {
              id,
              name,
              species,
              image,
              gender,
              location {
                name
              },
              episode {
                id,
                name
              }
            }
          }
        `,
      }),
    }
  )
  .then(res => res.json())
  .then(result => { return result.data.character })
  
  return {
    props: {
      characterDetail
    },
    revalidate: 10,
  }
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}

export default characterDetails;