import { useEffect, useState } from "react";
import axios from "../api/axios";
import { SideButton } from "../components/mainComponents/SideButton";
import { SongCard } from "../components/mainComponents/SongCard";
import { SongListHeader } from "../components/mainComponents/SongListHeader";

export function Home() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("/songs");
        setSongs(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSongs();
  }, []);

  return (
    <div className="bg-gradient-to-b from-sky-950 via-slate-900 to-slate-900 h-[575px] rounded-md">
      <div
        className="px-4 py-4 space-x-2"
        style={{ display: "flex", flexDirection: "row", overflowX: "auto" }}
      >
        <SideButton label="Todo" active={false} />
        <SideButton label="Música" active={false} />
        <SideButton label="Pódcast" active={false} />
      </div>

      <SongListHeader />
      <div>
        {songs.map((song, index) => (
          <SongCard key={song.id} song={song} index={index} />
        ))}
      </div>
    </div>
  );
}
