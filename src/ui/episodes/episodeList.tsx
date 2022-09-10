import EpisodeLinkItem from "./episodeLinkItem";

interface EpisodeProperties {
  id: string;
  name: string;
}

interface EpisodeListProps {
  episodes: EpisodeProperties[]
}

const EpisodeList = (props: EpisodeListProps) => {
  const generateLinkList = (list: EpisodeProperties[]) => {
    const linkList = list.map(linkItem => {
      return (
        <EpisodeLinkItem
          id={linkItem.id}
          name={linkItem.name}
        />
      );
    });

    return linkList;
  }

  return (
    <>
      {generateLinkList(props.episodes)}
    </>
  )
};

export default EpisodeList;