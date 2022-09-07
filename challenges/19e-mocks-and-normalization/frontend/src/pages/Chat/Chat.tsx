import ChatChannel from '../../components/ChatChannel/ChatChannel';
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

const Chat = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <h1 className="text-center mt-5 pt-4">Centro de Mensajes</h1>
        <ChatChannel />
      </div>
    </React.Fragment>
  );
};

export default Chat;
