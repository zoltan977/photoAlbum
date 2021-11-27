import React from "react";

export type albumContextType = {
  getAlbums: () => void;
  selectedCategory: string;
  categories: { title: string }[];
};

const albumContext = React.createContext({} as albumContextType);

export default albumContext;
