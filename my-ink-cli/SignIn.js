'use strict';
const React = require('react');
const {Text, Box, useInput} = require('ink');
const { useState } = React;

module.exports = ({signInHandler}) => {

	const [userInput, setUserInput] = useState('');

	useInput((input, key) => {

		setUserInput(prevInput => prevInput + input);

		if (key.return) {

			setUserInput('');

			signInHandler({username:'Jane Doe', password:'pass'});

		}
	});

	return (
		<Box borderStyle="double">
			<Text>Sign In</Text>
		</Box>
	);
}
