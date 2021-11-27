import "./AutoSearch.css";

type autoSearchProps = {
  filteredAlbumTitles: string[];
  formChange: (e: any) => void;
}

export default function AutoSearch({ filteredAlbumTitles, formChange }: autoSearchProps) {
  return (
    <div className="AutoSearch">
      {filteredAlbumTitles.map((f: any, i: number) => (
        <p
          key={i}
          onClick={(e) => {
            formChange({ target: { name: "title", value: f } });
          }}
        >
          {f}
        </p>
      ))}
    </div>
  );
}
