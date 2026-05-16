import React, { useState, useEffect, useRef } from 'react';

// Soft romantic aesthetic styles injected dynamically
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Poppins:wght@300;400;600&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #fce4ec 0%, #f3e5f5 50%, #fff0f5 100%);
    color: #4a4a4a;
    overflow-x: hidden;
  }

  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    position: relative;
  }

  /* Floating Hearts Background */
  .floating-hearts-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .heart-bg {
    position: absolute;
    color: rgba(255, 105, 180, 0.4);
    animation: floatUp linear infinite;
    bottom: -10vh;
  }

  @keyframes floatUp {
    0% { transform: translateY(0) scale(0.8) rotate(0deg); opacity: 1; }
    100% { transform: translateY(-110vh) scale(1.2) rotate(360deg); opacity: 0; }
  }

  h1, h2, h3 {
    font-family: 'Dancing Script', cursive;
    color: #e91e63;
    text-shadow: 2px 2px 4px rgba(233, 30, 99, 0.2);
  }

  .landing {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 1;
    animation: fadeIn 2s ease-in;
  }

  .landing h1 {
    font-size: 4.5rem;
    margin-bottom: 10px;
    animation: pulse 2s infinite;
  }

  .landing p {
    font-size: 1.5rem;
    color: #ab47bc;
    margin-bottom: 30px;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .music-btn {
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid #ff80ab;
    color: #e91e63;
    padding: 12px 25px;
    border-radius: 30px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(255, 128, 171, 0.3);
  }

  .music-btn:hover {
    background: #ff80ab;
    color: white;
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 128, 171, 0.5);
  }

  /* Interactive Sections */
  .sections {
    width: 100%;
    max-width: 800px;
    z-index: 1;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .section-btn {
    width: 100%;
    background: rgba(255, 255, 255, 0.85);
    border: 2px solid transparent;
    padding: 20px;
    border-radius: 20px;
    font-size: 1.8rem;
    font-family: 'Dancing Script', cursive;
    color: #e91e63;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(233, 30, 99, 0.15);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .section-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(233, 30, 99, 0.25);
    background: white;
    border-color: #ffb1c1;
  }

  .section-content {
    background: rgba(255, 255, 255, 0.95);
    padding: 25px;
    border-radius: 20px;
    animation: slideDown 0.4s ease-out;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    border: 1px solid rgba(255, 192, 203, 0.3);
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Reasons Cards */
  .reasons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .reason-card {
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(255, 128, 171, 0.15);
    border-top: 4px solid #ff80ab;
    transition: all 0.3s;
    font-weight: 400;
  }

  .reason-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 20px rgba(255, 128, 171, 0.3);
  }

  /* Memory Gallery */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
  }

  .gallery-img-placeholder {
    background: linear-gradient(135deg, #f8bbd0, #e1bee7);
    height: 180px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 3rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: all 0.4s;
    cursor: pointer;
  }

  .gallery-img-placeholder:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }

  /* Countdown */
  .countdown {
    text-align: center;
    margin-bottom: 20px;
  }

  .countdown-time {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 15px;
  }

  .time-box {
    background: #ffe4ef;
    padding: 10px 15px;
    border-radius: 10px;
    min-width: 70px;
    box-shadow: 0 2px 10px rgba(233, 30, 99, 0.1);
  }

  .time-value {
    font-size: 2rem;
    font-weight: bold;
    color: #e91e63;
    display: block;
  }

  .time-label {
    font-size: 0.8rem;
    color: #ab47bc;
    text-transform: uppercase;
  }

  /* Modal/Popup */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }

  .modal-content {
    background: white;
    padding: 40px;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 15px 40px rgba(233, 30, 99, 0.2);
    position: relative;
    border: 2px solid #fce4ec;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 2rem;
    cursor: pointer;
    color: #ccc;
    background: none;
    border: none;
    transition: color 0.3s;
  }

  .close-btn:hover {
    color: #e91e63;
  }

  .letter-text {
    font-family: 'Dancing Script', cursive;
    font-size: 1.8rem;
    line-height: 1.6;
    color: #6a1b9a;
    margin-top: 20px;
  }

  /* Final Surprise */
  .final-surprise {
    text-align: center;
    margin-top: 30px;
    padding: 40px;
    z-index: 1;
    animation: fadeIn 2s ease-in;
  }

  .glowing-heart {
    font-size: 6rem;
    color: #ff4081;
    animation: glowPulse 2s infinite;
    margin-bottom: 20px;
    display: inline-block;
  }

  @keyframes glowPulse {
    0% { text-shadow: 0 0 10px #ff4081; transform: scale(1); }
    50% { text-shadow: 0 0 30px #ff4081, 0 0 60px #e91e63; transform: scale(1.15); }
    100% { text-shadow: 0 0 10px #ff4081; transform: scale(1); }
  }

  .final-msg {
    font-size: 1.8rem;
    font-family: 'Dancing Script', cursive;
    color: #e91e63;
    font-weight: bold;
    letter-spacing: 1px;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  /* Responsive */
  @media (max-width: 600px) {
    .landing h1 { font-size: 3.5rem; }
    .countdown-time { flex-wrap: wrap; }
    .time-box { min-width: 60px; }
    .section-btn { font-size: 1.4rem; padding: 15px; }
  }
`;

export default function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [timeSince, setTimeSince] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const audioRef = useRef(null);

  // Set the date when you got together (Update this to your actual anniversary date!)
  const startDate = new Date('2024-07-07T12:46:00');

  useEffect(() => {
    // Inject CSS into the document head
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Audio setup (using a royalty-free romantic piano track)
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/16/audio_18c5e648f5.mp3?filename=romantic-piano-111059.mp3');
    audioRef.current.loop = true;

    // Countdown logic
    const timer = setInterval(() => {
      const now = new Date();
      const difference = now - startDate;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeSince({ days, hours, minutes, seconds });
    }, 1000);

    return () => {
      document.head.removeChild(styleSheet);
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Generate background floating hearts
  const bgHearts = Array.from({ length: 25 }).map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 5 + Math.random() * 10;
    const size = 1 + Math.random() * 1.5;
    return (
      <div
        key={i}
        className="heart-bg"
        style={{
          left: \`\${left}%\`,
          animationDelay: \`\${delay}s\`,
          animationDuration: \`\${duration}s\`,
          fontSize: \`\${size}rem\`
        }}
      >
        ❤️
      </div>
    );
  });

  return (
    <div className="app-container">
      <div className="floating-hearts-container">
        {bgHearts}
      </div>

      <header className="landing">
        <h1>Happy Birthday My Love ❤️</h1>
        <p>Welcome to your special day...</p>
        <button className="music-btn" onClick={toggleMusic}>
          {isPlaying ? '⏸ Pause Music' : '▶️ Play Romantic Music'}
        </button>
      </header>

      <main className="sections">
        {/* First Surprise */}
        <button className="section-btn" onClick={() => toggleSection('first')}>
          Open First Surprise 💌
        </button>
        {activeSection === 'first' && (
          <div className="section-content">
            <div className="countdown">
              <h3>Time since you became my favorite person ❤️</h3>
              <div className="countdown-time">
                <div className="time-box">
                  <span className="time-value">{timeSince.days}</span>
                  <span className="time-label">Days</span>
                </div>
                <div className="time-box">
                  <span className="time-value">{timeSince.hours}</span>
                  <span className="time-label">Hours</span>
                </div>
                <div className="time-box">
                  <span className="time-value">{timeSince.minutes}</span>
                  <span className="time-label">Mins</span>
                </div>
                <div className="time-box">
                  <span className="time-value">{timeSince.seconds}</span>
                  <span className="time-label">Secs</span>
                </div>
              </div>
            </div>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
              <button 
                className="music-btn" 
                style={{background: '#e91e63', color: 'white', border: 'none'}}
                onClick={() => setShowLetter(true)}
              >
                Read Love Letter 📖
              </button>
            </div>
          </div>
        )}

        {/* Reasons I Love You */}
        <button className="section-btn" onClick={() => toggleSection('reasons')}>
          Reasons I Love You ❤️
        </button>
        {activeSection === 'reasons' && (
          <div className="section-content">
            <div className="reasons-grid">
              <div className="reason-card">The way your eyes light up when you smile ✨</div>
              <div className="reason-card">How you always know how to make me laugh 😊</div>
              <div className="reason-card">Your warm and comforting hugs 🫂</div>
              <div className="reason-card">The way you support my dreams 🌟</div>
              <div className="reason-card">Because you are simply you ❤️</div>
            </div>
          </div>
        )}

        {/* Our Memories */}
        <button className="section-btn" onClick={() => toggleSection('memories')}>
          Our Memories 📸
        </button>
        {activeSection === 'memories' && (
          <div className="section-content">
            <p style={{textAlign: 'center', marginBottom: '15px', color: '#ab47bc'}}>
              Add our beautiful moments here...
            </p>
            <div className="gallery-grid">
              <div className="gallery-img-placeholder">📸</div>
              <div className="gallery-img-placeholder">❤️</div>
              <div className="gallery-img-placeholder">✨</div>
              <div className="gallery-img-placeholder">🥰</div>
            </div>
          </div>
        )}

        {/* Future With You */}
        <button className="section-btn" onClick={() => toggleSection('future')}>
          Future With You ✨
        </button>
        {activeSection === 'future' && (
          <div className="section-content" style={{textAlign: 'center'}}>
            <h3 style={{fontSize: '2.5rem', marginBottom: '15px'}}>To Many More...</h3>
            <p style={{fontSize: '1.2rem', lineHeight: '1.6'}}>
              Adventures, movie nights, late night talks, and birthdays together. 
              I can't wait for everything our future holds.
            </p>
          </div>
        )}

        {/* Secret Message */}
        <button className="section-btn" onClick={() => toggleSection('secret')}>
          Secret Message 🔒
        </button>
        {activeSection === 'secret' && (
          <div className="section-content" style={{textAlign: 'center', padding: '40px'}}>
            <h2>I love you more than words can say! 💖</h2>
          </div>
        )}
      </main>

      <div className="final-surprise">
        <div className="glowing-heart">💖</div>
        <p className="final-msg">You will always be my favorite notification ❤️</p>
      </div>

      {/* Love Letter Modal */}
      {showLetter && (
        <div className="modal-overlay" onClick={() => setShowLetter(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowLetter(false)}>×</button>
            <h2>My Dearest,</h2>
            <div className="letter-text">
              Happy Birthday! 🎉<br/><br/>
              Every day with you feels like a dream. Thank you for bringing so much joy, light, and love into my life. 
              I am so incredibly lucky to have you. Today is all about celebrating you and the amazing person you are.<br/><br/>
              Forever Yours, ❤️
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
