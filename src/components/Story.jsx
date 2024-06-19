import { useEffect } from 'react';
import './Story.css';
import music from '../assets/audio.mp3';

const Story = ({ skipStory }) => {
  const story = [
    "In a galaxy far away, after React 19 has been released...",
    "a hero was needed.",
    "",
    "The world of frontend development was in chaos.",
    "Errors and bugs plagued the codebases.",
    "Developers were losing hope.",
    "",
    "But then, a hero emerged.",
    "A developer with unmatched skill and determination.",
    "You are that hero.",
    "",
    "Your mission is to collect all the React 19 concepts",
    "and use their powers to defeat the bugs.",
    "Beware of the errors that will try to stop you.",
    "",
    "Good luck, hero.",
    "May the source be with you."
  ];

  useEffect(() => {
    const audio = new Audio(music);
    audio.play();

    const timer = setTimeout(() => {
      skipStory();
    }, 30000); // Automatically skip after 30 seconds

    return () => {
      audio.pause();
      audio.currentTime = 0;
      clearTimeout(timer);
    };
  }, [skipStory]);

  return (
    <div className="story-container">
      <div className="story-content">
        {story.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <button className="skip-button" onClick={skipStory}>Skip</button>
    </div>
  );
};

export default Story;
