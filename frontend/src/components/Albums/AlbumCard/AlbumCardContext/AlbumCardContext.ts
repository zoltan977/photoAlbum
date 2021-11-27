import React from "react";
import { photoType } from "../../Albums";

export type albumCardContextType = {
    selectedPhoto: photoType | null;
    setSelectedPhoto: React.Dispatch<React.SetStateAction<photoType | null>>
    filteredPhotos: photoType[];
    albumTitle: string;
}

const albumCardContext = React.createContext({} as albumCardContextType);

export default albumCardContext;
