import { useEffect, useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import dayjs from "dayjs";

import "./App.css";
import { Chatbot } from "supersimpledev";
// -----------------------------------

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || [],
  );
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    Chatbot.addResponses({
      "what is the time now?": () => `it is ${dayjs().format("h:m")}`,
    });
  }, []);

  return (
    <div className="app-container">
      <ChatMessages
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;
