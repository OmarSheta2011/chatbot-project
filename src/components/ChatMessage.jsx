import robotProfileImage from "../assets/robot.png";
import userProfileImage from "../assets/user.png";

import "./ChatMessage.css";
// ------------------

export default function ChatMessage({ message, sender, time }) {
  return (
    <div
      className={`message ${sender === "robot" ? "robot-message" : "user-message"}`}
    >
      {sender === "robot" && (
        <img src={robotProfileImage} className="profileimg" />
      )}
      <div>
        <p>{message}</p>
        <span className="message-time">{time}</span>
      </div>

      {sender === "user" && (
        <img src={userProfileImage} className="profileimg" />
      )}
    </div>
  );
}
