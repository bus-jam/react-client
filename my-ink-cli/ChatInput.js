'use strict';
const React = require('react');
const {Text, Box, useInput} = require('ink');
const { useState } = React;

module.exports = ({sendChat}) => {

	const [userInput, setUserInput] = useState('');

	useInput((input, key) => {

		setUserInput(prevInput => prevInput + input);

		if (key.return) {

			setUserInput('');

			sendChat(userInput);

		} else if (key.delete) {

			setUserInput(prevInput => prevInput.slice(0,-1));

		}
	});

	return (
		<Box marginTop={1}>
			<Text>-> {userInput}</Text>
		</Box>
	);
}
