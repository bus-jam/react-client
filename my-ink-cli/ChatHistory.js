'use strict';
const React = require('react');
const {Text, Box} = require('ink');

const ChatHistory = ({messages}) => {
	return (
		<>
			{messages.map(msg => {
				return (<Box key={msg.id}>
					<Text color="green">✔ [{msg.username}]:{msg.cmd}</Text>
				</Box>)
			})}
		</>
	);
};

module.exports = ChatHistory;
