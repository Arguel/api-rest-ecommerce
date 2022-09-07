import { useState, useEffect } from 'react';
import { socket } from '../../services/Socket';
import moment from 'moment';

const { data: dataUser } = {
  data: {
    email: 'elduro@gmail.com',
  },
};

const ChatChannel = () => {
  // const [savingMessage, setSavingMessage] = useState(false);
  // const { data: messages, status } = useAppSelector((state) => state.messages);
  //
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('idle');

  const [formValues, setFormValues] = useState({
    email: dataUser ? dataUser.email : '',
    text: '',
  });
  const { email, text } = formValues;

  useEffect(() => {
    // if (dataUser && status === 'idle') {
    socket.emit('get messages', dataUser.email);
    socket.on('messages', (data) => {
      // dispatch(setMessages({ data }));
      setMessages(data);
    });
    socket.on('messages error', (data) => {
      // toast.warning(data.message);
    });
    // }
  }, []);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('new message', formValues);

    setFormValues({
      ...formValues,
      text: '',
    });

    socket.on('new message saved', (data) => {
      setMessages(data);
    });
  };

  return (
    <div className="m-5 p-5 bg-light-2">
      <h1 className="text-primary pt-3 mb-3">Message center</h1>
      <div className="w-50 mb-3">
        <label className="form-label" htmlFor="email">
          Your email
        </label>
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="user@gmail.com"
          value={email}
          onChange={handleChange}
        />
      </div>
      <hr />
      <ul className="list-unstyled my-4">
        {messages.length === 0 ? (
          <li className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </li>
        ) : (
          messages.map((msg) => (
            <li key={msg.id}>
              <span className="text-primary fw-bold">{msg.user.email}</span>
              <small className="text-danger">
                {moment(msg.createdAt).format('DD/MM/YYYY hh:mm:ss')}
              </small>
              <span className="text-success">{msg.text}</span>
            </li>
          ))
        )}
      </ul>
      <hr />
      <form className="row align-items-end w-50" onSubmit={handleSubmit}>
        <div className="col-9">
          <label className="form-label" htmlFor="text">
            Your message
          </label>
          <input
            className="form-control"
            type="text"
            name="text"
            placeholder="Enter a message"
            value={text}
            onChange={handleChange}
          />
        </div>
        <div className="col-3">
          <button className="btn btn-success w-100" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatChannel;
