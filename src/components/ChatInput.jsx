import { useState } from "react";
import loadingSpinnerImage from "../assets/loading-spinner.gif";
import { Chatbot } from "supersimpledev";
import "./ChatInput.css";
import dayjs from "dayjs";

// --------------------
export default function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (!inputText) return;

    const newChatMessages = [
      ...chatMessages,
      {
        id: crypto.randomUUID(),
        message: inputText,
        sender: "user",
        time: dayjs(dayjs().valueOf()).format("h:mm a"),
      },
      {
        id: crypto.randomUUID(),
        message: <img className="loading-spinner" src={loadingSpinnerImage} />,
        sender: "robot",
      },
    ];
    setChatMessages(newChatMessages);
    setInputText("");

    const response = await Chatbot.getResponseAsync(inputText);
    newChatMessages.pop();
    setChatMessages([
      ...newChatMessages,
      {
        id: crypto.randomUUID(),
        message: response,
        sender: "robot",
        time: dayjs(dayjs().valueOf()).format("h:mm a"),
      },
    ]);
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          } else if (event.key === "Escape") {
            setInputText("");
          }
        }}
      />
      <button onClick={sendMessage} className="send-button button">
        Send
      </button>
      <button
        onClick={() => {
          setChatMessages([]);
        }}
        className="clear-button button"
      >
        Clear
      </button>
    </div>
  );
}
