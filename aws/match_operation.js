'use strict';
const matchLib = require('../lib/match_operation')

//Patient $match handler
module.exports.matchHandler = async (event, context) => {
	var handlerResponse = await matchLib.matchHandler(event.body, event.pathParameters.tenantId, event.path,event.headers)

	return {
		statusCode: handlerResponse.statusCode,
		body: JSON.stringify(handlerResponse.body),
		headers: handlerResponse.headers
	}
}

//Patient $member-match handler
module.exports.memberMatchHandler = async (event, context) => {
	var handlerResponse = await matchLib.memberMatchHandler(event.body, event.pathParameters.tenantId, event.path,event.headers)

	return {
		statusCode: handlerResponse.statusCode,
		body: JSON.stringify(handlerResponse.body),
		headers: handlerResponse.headers
	}
}
