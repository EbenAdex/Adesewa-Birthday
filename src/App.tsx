import { useState, useRef , useEffect} from "react";
import "./index.css";
import gallery1 from "./assets/gallery1.jpg";
import gallery2 from "./assets/gallery2.jpg";
import gallery5 from "./assets/gallery5.jpg";
import gallery6 from "./assets/gallery6.mp4";
import gallery4 from "./assets/gallery4.mp4";
import gallery8 from "./assets/gallery8.jpg";
import gallery9 from "./assets/gallery9.jpg"
import gallery00 from "./assets/gallery00.jpg";
import gallery11 from "./assets/gallery11.mp4";
import gallery0 from "./assets/gallery0.mp4";
import wedding from "./assets/Wedding.mp4";
import song from "./assets/song.mp3";

function App() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);
 
  const [showSecondPage, setShowSecondPage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

    const landingItems: { type: "img" | "video"; src: string; alt?: string }[] = [
    { type: "img", src: gallery1, alt: "her1" },
    { type: "img", src: gallery2, alt: "her2" },
    { type: "img", src: gallery5, alt: "her5" },
    {type: "img", src: gallery9, alt: "her9" },
    {type: "img", src: gallery00, alt: "her00" },
    {type: "video", src: gallery11 },
    { type: "video", src: gallery0 },
    { type: "video", src: gallery6 },
    { type: "video", src: gallery4 },
    { type: "img", src: gallery8, alt: "her8" },
  ];

 const handleScroll = () => {
    setShowSecondPage(true);
  };

 useEffect(() => {
    if (!showSecondPage) return;
   // play after the second page mounts; guard for null and handle play promise
   const audio = audioRef.current;
    if (!audio) return;
   const p = audio.play();
   if (p && typeof p.then === "function") {
      p.then(() => setPlaying(true)).catch((e) => {
        console.warn("Audio play failed:", e);
        setPlaying(false);
      });
    } else {
      // if play() is synchronous or already playing
      setPlaying(!audio.paused);
    }
  }, [showSecondPage]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch (e) {
        console.warn("Unable to play audio:", e);
        setPlaying(false);
      }
    }
  };

  return (
    <div className="app">
      {!showSecondPage ? (
        <section className="landing">
           <div className="balloon-bg" aria-hidden="true">
            <div className="balloon b1" />
            <div className="balloon b2" />
            <div className="balloon b3" />
            <div className="balloon b4" />
            <div className="balloon b5" />
            <div className="balloon b6" />
            <div className="pop-balloon">21</div>
          </div>
          <h1 className="birthday-text">Happy Birthday Ewami💜</h1>

          <div className="carousel-grid">
            {landingItems.map((item, i) => (
             <div className="media-item" key={i}>
                {item.type === "img" ? (
                  <img src={item.src} alt={item.alt ?? `gallery-${i}`} />
                ) : (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="scroll-down" onClick={handleScroll}>
            <span>Check for your present 🎁</span>
            <div className="arrow">↓</div>
          </div>
        </section>
      ) : (
         <section
         className="message-section"
          style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
        >
          <video
            className="background-video"
            autoPlay
            playsInline
            loop
            muted
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          >
           <source src={wedding} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>


        <audio ref={audioRef} src={song} loop />

          <div className="message-content" style={{ position: "relative", zIndex: 1 }}>
           <div style={{ marginBottom: 12 }}>
              <button onClick={toggleMusic} aria-pressed={playing}>
                {playing ? "Pause Music" : "Play Music"}
              </button>
            </div>
            <h2>To the Love of My Life 💜</h2>
            <p>
              From the first moment I saw you, I knew you were special. You light up every
              space you walk into, and your heart is pure magic. You’ve taught me what
              patience, love, and care truly mean.
            </p>
            <p>
              Even from miles away, I feel your warmth every day. You make me want to be
              better — not because you ask me to, but because your love inspires me to grow.
              You are my calm, my spark, my safe space.
            </p>
            <p>
              So on your special day, I just want you to remember: you are loved, deeply,
              completely, and endlessly. And no matter where I am, my heart is right there
              with you.
            </p>
            <p className="signature">Forever yours, <br />Ayomiposi 💌</p>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
