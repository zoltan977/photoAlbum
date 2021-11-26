import React from "react";
import ContentEditable from "../../../../ContentEditable/ContentEditable";

export default function Info({
  titleChange,
  title,
  photoCategories,
  addCategory,
  removeCategory,
  categories,
  date,
}) {
  return (
    <div className="info">
      <ContentEditable onChange={titleChange}>
        <p className="title">{title}</p>
      </ContentEditable>
      <div className="categories">
        {photoCategories.length
          ? photoCategories.map((c, i) => (
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
        <select name="category" onChange={addCategory}>
          <option key={0} value="">
            none
          </option>
          {categories.map((c, i) => (
            <option key={i + 1} value={c.title}>
              {c.title}
            </option>
          ))}
        </select>
      </div>
      <p className="date">{new Date(date).toLocaleString()}</p>
    </div>
  );
}
