import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import "./ChatMessages.css";

function useAutoScroll(...dependencies) {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTo({
        top: containerElem.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [dependencies]);

  return containerRef;
}

export default function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);
  return chatMessages.length > 0 ? (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            time={chatMessage.time}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  ) : (
    <p className="welcoming-message">
      Welcome to the chatbot project! Send a message using the textbox bellow
    </p>
  );
}
