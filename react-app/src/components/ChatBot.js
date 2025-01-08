import React, { useState } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import './ChatBot.css';
import { BsFillChatTextFill,  } from "react-icons/bs";
import { MdHorizontalRule } from "react-icons/md";

function ChatBox(){
    const [chatOpen, setChatOpen] = useState(false);
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am ChatGPT",
            sentTime: "just now",
            sender: "ChatGPT",
            direction: "incoming"
        }
    ]);

    const handleSend = async (message)=>{
        const newMessage = {
            message,
            sender: "user",
            direction: "outgoing"
        }
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setTyping(true);

        let apiMessages = newMessages.map((messageObj)=>{
            let role = "";
            if(messageObj.sender==="ChatGPT"){
                role="assistant"
            }else{
                role="user"
            }
            return {role, content: messageObj.message}
        })

        const requestedBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    role:"system",
                    content: "I'm a college graduate who just started to work"
                },
                ...apiMessages]
        }
        await fetch("https://api.openai.com/v1/chat/completions",{
            method:"POST",
            headers:{
                "Authorization": "Bearer " + process.env.REACT_APP_OPENAI_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestedBody)
        }).then((data)=>data.json())
        .then((data)=>{
            console.log(data);
            setMessages([...newMessages,{
                message: data.choices[0].message.content,
                sender: "ChatGPT",
                direction: "incoming"
            }])
        }).catch((e)=>{
            console.error("Error: " + e)
        })
        setTyping(false);
    }

    return<div className="chat-Bot-Container">
    {/* <i className="fa-regular fa-message" style={{height:"30px"}}></i> */}
        {!chatOpen && <BsFillChatTextFill className="chat-Bot-Button" onClick={()=>setChatOpen(true)}  />}
        {chatOpen && <div className="chat-Bot">
            <MdHorizontalRule onClick={()=>setChatOpen(false)} className="chat-Bot-Close" />
        <MainContainer>
            <ChatContainer>
                <MessageList
                scrollBehavior="smooth"
                typingIndicator={typing? <TypingIndicator content={"ChatGPT is typing"} /> : null}
                >
                {messages.map((message, idx)=>{
                    console.log(message.direction)
                    return <Message key={idx} model={message} />
                })}
                </MessageList>
                <MessageInput placeholder="Ask me anything..." onSend={handleSend}/>
            </ChatContainer>
        </MainContainer>
        </div>}
    </div>
}

export default ChatBox;
