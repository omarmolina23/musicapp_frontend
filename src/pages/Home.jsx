import { useEffect, useState } from "react";
import axios from "../api/axios";
import { SideButton } from "../components/mainComponents/SideButton";
import { SongCard } from "../components/mainComponents/SongCard";
import { SongListHeader } from "../components/mainComponents/SongListHeader";
import { SongCardSkeleton } from "../components/mainComponents/SongCardSkeleton";

export function Home() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("/songs");
        setSongs(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  return (
    <div className="bg-gradient-to-b from-sky-950 via-slate-900 to-slate-900 h-[580px] rounded-md flex mr-1 flex-col scroll-container">
      {/* Contenedor de los botones - Mantenerlos fijos */}
      <div className="px-4 py-4 space-x-2 flex flex-row sticky top-0 z-20">
        <SideButton label="Todo" active={false} />
        <SideButton label="Música" active={false} />
        <SideButton label="Pódcast" active={false} />
      </div>

      <div className="sticky top-[60px] z-10">
        <SongListHeader />
      </div>

      <div className="overflow-hidden flex-1">
        {/* Contenedor de las canciones con scroll */}
        <div className=" overflow-y-auto h-full">
          {loading ? (
            <div></div>
          ) : (
            songs.map((song, index) => (
              <SongCard key={song.id} song={song} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
