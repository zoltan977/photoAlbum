import ContentEditable from "../../../../ContentEditable/ContentEditable";
import { photoType } from "../../../Albums";

type infoProps = {
  photo: photoType;
  setSelectedPhoto: React.Dispatch<React.SetStateAction<photoType | null>>;
  titleChange: (newTitle: string) => void;
  addCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  removeCategory: (category: string) => void;
  categories: {title: string}[];
}

export default function Info({
  photo,
  setSelectedPhoto,
  titleChange,
  addCategory,
  removeCategory,
  categories,
}: infoProps) {
  return (
    <div className="info">
      <ContentEditable onChange={titleChange}>
        <p className="title">{photo.title}</p>
      </ContentEditable>
      <div className="imageCategories">
        {photo.categories.length
          ? photo.categories.map((c: any, i: any) => (
              <img
                onClick={(e) => removeCategory(c)}
                key={i}
                src={`${c}.svg`}
                alt=""
              />
            ))
          : null}
      </div>
      <div className="select">
        <label htmlFor="category">Add category</label>
        <select
          name="category"
          onChange={(e) => {
            addCategory(e);
            e.target.value = "";
          }}
        >
          <option key={0} value="">
            none
          </option>
          {categories
            .filter((c: any) => !photo.categories.includes(c.title))
            .map((c: any, i: any) => (
              <option key={i + 1} value={c.title}>
                {c.title}
              </option>
            ))}
        </select>
      </div>
      <p className="date">{new Date(photo.date).toLocaleString()}</p>
      <img className="show" src="eye.svg" alt="" onClick={e => setSelectedPhoto(photo)} />
    </div>
  );
}
