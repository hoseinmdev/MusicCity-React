import { FC } from "react";
import Slider from "./Slider";
import ArtistAvatar from "./common/ArtistAvatar";
import mohsenYeganeh from "../assets/Artists/Yas.jpg";
const Main: FC = () => {
  return (
    <div className="h-screen w-full overflow-auto bg-neutral-900">
      <Slider />
      <ArtistAvatar
        title="Mohsen Yeganeh"
        followers={32}
        imageUrl={mohsenYeganeh}
      />
    </div>
  );
};

export default Main;
