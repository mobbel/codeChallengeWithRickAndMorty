import Link from "next/link";

interface ICharacterLinkItem {
  id: string;
  name: string;
  favoriteList: string[];
}

const CharacterLinkItem = (props: ICharacterLinkItem) => {
  return (
    <div className="px-4 py-1 sm:px6">
      <Link href={`/characters/${props.id}`}>
        <a>{props.name} <img src={props.favoriteList?.indexOf(`${props.id}`) >= 0 ? "/static/herz_red.png" : "/static/herz.png"} /></a>
      </Link>
    </div>
  );
};

export default CharacterLinkItem;