"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import axios from "axios";
import DotsForms from "../Loaders/DotsForm/DotsForms";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Chat({
  onFilterMovies,
}: {
  onFilterMovies: (filter: string) => void;
}) {
  const [message, setMessage] = useState<string>(""); // User message input
  const [chatLog, setChatLog] = useState<string[]>([]); // Store chat history
  const [loading, setLoading] = useState<boolean>(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const updatedChatLog = [...chatLog, `You: ${message}`];
      setChatLog(updatedChatLog); // Add user message to chat log
      setMessage(""); // Clear input field
      setLoading(true);

      try {
        const response = await axios.post("/api/chatbot", {
          userMessage: message,
        });
        const aiResponse = response.data.message;
        setChatLog((prevChatLog) => [...prevChatLog, `Flix AI: ${aiResponse}`]);
        onFilterMovies(aiResponse);
      } catch (error) {
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          `Flix AI: Sorry, something went wrong.`,
        ]);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chat__wrapper}>
        <div className={styles.chat__wrapper_messages}>
          {chatLog.map((msg, index) => (
            <div className={styles.chat__wrapper_messages__message} key={index}>
              {msg}
            </div>
          ))}
          {loading && (
            <div>
              <DotsForms />
            </div>
          )}
          <div ref={messagesRef} />
        </div>
        <form
          className={styles.chat__wrapper_inputContainer}
          onSubmit={handleSendMessage}
        >
          <TextField
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.input}
            slotProps={{
              input: {
                style: {
                  color: "lightgreen",
                  border: "1px solid white",
                  padding: "0",
                  borderBottomLeftRadius: "0.7rem",
                },
              },
            }}
            placeholder="From classics to blockbusters—ask me about any film!"
          />
          <Button
            className={styles.sendButton}
            type="submit"
            variant="contained"
            sx={{
              padding: "4px 10px 8px",
            }}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
