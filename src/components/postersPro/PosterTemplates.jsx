const posterTemplates = [
  {
    id: 300,
    name: "Saturday Night Florida",
    type: "florida-night",
    backgroundColor: "#0a1f3a",
    overlayColor: "rgba(10, 31, 58, 0.6)",
    textPosition: { 
      top: "50%", 
      left: "50%", 
      transform: "translate(-50%, -50%)", 
      textAlign: "center",
      width: "90%"
    },
    title: "SATURDAY NIGHT",
    titleColor: "#ffffff",
    titleFont: "'Bebas Neue', sans-serif",
    titleSize: "72px",
    titleStyle: "uppercase",
    description: "LIVE IN FLORIDA",
    descColor: "#f8c537",
    descFont: "'Montserrat', sans-serif",
    descSize: "36px",
    descStyle: "uppercase",
    footerLeft: "www.yourbusiness.com",
    footerRight: "© 2023 Your Business",
    footerColor: "#ffffff",
    footerSize: "14px",
    specialStyle: `
      .poster-title {
        text-shadow: 3px 3px 6px rgba(0,0,0,0.8);
        margin-bottom: 20px;
        line-height: 1;
      }
      .poster-description {
        text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
        font-weight: 600;
      }
    `,
    previewImage: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    locked: true
  },
  {
    id: 301,
    name: "Beach Party Vibes",
    type: "florida-beach",
    backgroundColor: "#0077b6",
    overlayColor: "rgba(0, 119, 182, 0.4)",
    textPosition: { 
      bottom: "100px", 
      left: "50px", 
      textAlign: "left",
      width: "80%"
    },
    title: "FLORIDA BEACH",
    titleColor: "#ffffff",
    titleFont: "'Bungee', cursive",
    titleSize: "64px",
    titleStyle: "uppercase",
    description: "SATURDAY SUNSET PARTY",
    descColor: "#ffd166",
    descFont: "'Open Sans', sans-serif",
    descSize: "28px",
    footerLeft: "www.beachparty.com",
    footerRight: "© 2023 Beach Vibes",
    footerColor: "#ffffff",
    footerSize: "14px",
    specialStyle: `
      .poster-title {
        margin-bottom: 15px;
        text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
      }
      .poster-description {
        letter-spacing: 3px;
        text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
      }
    `,
    previewImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    locked: true
  },
  {
    id: 302,
    name: "Miami Neon Nights",
    type: "florida-neon",
    backgroundColor: "#1a1a2e",
    overlayColor: "rgba(106, 13, 173, 0.5)",
    textPosition: { 
      top: "40%", 
      right: "50px", 
      textAlign: "right",
      width: "60%"
    },
    title: "MIAMI NIGHTS",
    titleColor: "#f72585",
    titleFont: "'Permanent Marker', cursive",
    titleSize: "68px",
    titleStyle: "uppercase",
    description: "SATURDAY ELECTRIC VIBES",
    descColor: "#4cc9f0",
    descFont: "'Rajdhani', sans-serif",
    descSize: "32px",
    footerLeft: "www.neonmiami.com",
    footerRight: "© 2023 Neon Nights",
    footerColor: "#ffffff",
    footerSize: "14px",
    specialStyle: `
      .poster-title {
        text-shadow: 0 0 10px rgba(247, 37, 133, 0.7);
        margin-bottom: 25px;
        line-height: 1;
      }
      .poster-description {
        text-shadow: 0 0 8px rgba(76, 201, 240, 0.7);
        font-weight: 700;
      }
    `,
    previewImage: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    locked: true
  },
  {
    id: 303,
    name: "Florida Retro Wave",
    type: "florida-retro",
    backgroundColor: "#ff9e00",
    overlayColor: "rgba(255, 158, 0, 0.3)",
    textPosition: { 
      top: "30%", 
      left: "50px", 
      textAlign: "left",
      width: "70%"
    },
    title: "RETRO FLORIDA",
    titleColor: "#540d6e",
    titleFont: "'Rubik Mono One', sans-serif",
    titleSize: "60px",
    titleStyle: "uppercase",
    description: "SATURDAY VIBES 80s STYLE",
    descColor: "#0a1f3a",
    descFont: "'Varela Round', sans-serif",
    descSize: "28px",
    footerLeft: "www.retrowave.com",
    footerRight: "© 2023 Retro Wave",
    footerColor: "#0a1f3a",
    footerSize: "14px",
    specialStyle: `
      .poster-title {
        margin-bottom: 15px;
        -webkit-text-stroke: 1px #ffffff;
      }
      .poster-description {
        letter-spacing: 3px;
        font-weight: 600;
      }
    `,
    previewImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    locked: true
  },
  {
    id: 400,
    name: "Star Wars Parallax",
    type: "parallax",
    backgroundColor: "#fff2d7",
    textPosition: { 
      top: "50px", 
      left: "50%", 
      transform: "translateX(-50%)", 
      textAlign: "center",
      width: "80%"
    },
    title: "STAR WARS",
    titleColor: "#000000",
    titleFont: "'Star Jedi', sans-serif",
    titleSize: "60px",
    titleStyle: "uppercase",
    description: "A NEW HOPE",
    descColor: "#000000",
    descFont: "'Montserrat', sans-serif",
    descSize: "24px",
    descStyle: "uppercase",
    footerLeft: "www.starwars.com",
    footerRight: "© 2023 Lucasfilm",
    footerColor: "#000000",
    footerSize: "14px",
    specialStyle: `
      .poster-title {
        margin-bottom: 20px;
        z-index: 100;
        position: relative;
      }
      .poster-description {
        font-weight: 600;
        z-index: 100;
        position: relative;
      }
      .parallax-container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .parallax-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        will-change: transform;
        transition: transform 0.1s linear;
      }
    `,
    layers: [
      { url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/c3po-profile_copy_copy.png", depth: 0 },
      { url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/c3po-eyes_copy.png", depth: 0.7 },
      { url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/c3po-foreground-test.png", depth: 0.5 },
      { url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/c3po-base-2_copy.png", depth: 0.4 },
      { url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/c3po--base-1_copy.png", depth: 0.3 },
      { url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/c3po-base-test.png", depth: 0.2 }
    ],
    previewImage: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/c3po-profile_copy_copy.png",
    locked: true
  }
];

export default posterTemplates;