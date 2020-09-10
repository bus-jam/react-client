'use strict';
const React = require('react');
const { useEffect, useState } = React;
const {Static, Text} = require('ink');
const socketIOClient = require("socket.io-client");
const { v4: uuidv4 } = require('uuid');
const importJsx = require('import-jsx');

const ChatHistory = importJsx('./ChatHistory');
const ChatInput = importJsx('./ChatInput');
const SignIn = importJsx('./SignIn');
const Header = importJsx('./Header');
const Focuser = importJsx('./Focuser');

const App = ({name = 'me'}) => {

	const [socket, setSocket] = useState(null);

	const [messages, setMessages] = useState([]);

	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {

		const socketObj = socketIOClient('http://localhost:3002');

		setSocket(socketObj);

		socketObj.on('message', data => {
			data.id = uuidv4();
			setMessages(prevMessages => [...prevMessages, data]);
		});

	}, []);


	const sendChat = txt => {

		const message = {username:name, cmd:txt, id:uuidv4()};

		socket.emit('message', message);

		setMessages(prevMessages => [...prevMessages, message]);
	}

	const signInHandler = user => {
		setSignedIn(true);
	};

	return (
		<>
			<Header />

			<ChatHistory messages={messages} />

			{signedIn ?
				<ChatInput sendChat={sendChat} />
				:
				<SignIn signInHandler={signInHandler} />
			}

			{/* <Focuser /> */}
		</>
	);
};

module.exports = App;
