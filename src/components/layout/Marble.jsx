import { useState } from "react";
import "./Marble.css";

function Marble() {
  const [heroes] = useState([
    {
      id: 1,
      name: "Iron Man",
      imageUrl:
        "https://playcontestofchampions.com/wp-content/uploads/2021/11/champion-iron-man-infinity-war-720x720.jpg",
    },
    {
      id: 2,
      name: "Spider Man",
      imageUrl:
        "https://variety.com/wp-content/uploads/2015/02/spider-mannew.jpeg?w=1000&h=563&crop=1",
    },
    {
      id: 3,
      name: "Hulk",
      imageUrl:
        "https://img.freepik.com/premium-photo/incredible-hulk-wallpapers-hd-wallpapers_900370-25314.jpg",
    },
    {
      id: 4,
      name: "Thor",
      imageUrl: "https://ichef.bbci.co.uk/images/ic/640x360/p09t1hg0.jpg",
    },
    {
      id: 5,
      name: "Captain America",
      imageUrl:
        "https://i.pinimg.com/550x/97/bf/27/97bf27becd0df4ff387b882572925416.jpg",
    },
    {
      id: 6,
      name: "Dr Strange",
      imageUrl:
        "https://static.onecms.io/wp-content/uploads/sites/6/2016/10/dr-strange.jpg",
    },
    {
      id: 7,
      name: "Scarlet Witch",
      imageUrl:
        "https://w0.peakpx.com/wallpaper/696/71/HD-wallpaper-scarlet-witch-comics-marvel-mcu-scarlet-witch-the-hex-wandavision-westview-thumbnail.jpg",
    },
    {
      id: 8,
      name: "Black Panther",
      imageUrl:
        "https://cdn.britannica.com/26/182826-050-0FEF618D/publicity-poster-Black-Panther-character-Tchalla-Black-Ryan-2017.jpg",
    },
    {
      id: 9,
      name: "Batman",
      imageUrl:
        "https://cdn.pixabay.com/photo/2023/03/14/22/20/relationship-7853278_640.jpg",
    },
  ]);

  return (
    <div className="app">
      <header className="header">
        <h1>The World Of Marvel Superheroes</h1>
      </header>

      <div className="gallery-container">
        {heroes.map((hero) => (
          <div key={hero.id} className="gallery">
            <a href={hero.imageUrl} target="_blank" rel="noopener noreferrer">
              <img src={hero.imageUrl} alt={hero.name} className="hero-image" />
            </a>
            <div className="desc">{hero.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marble;
