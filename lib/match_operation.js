'use strict';
const axios = require('axios')

module.exports.matchHandler = async (requestBody, tenantId, path,headers) => {
	const backendPath = path.replace(`/${tenantId}`, '')
	console.log("patient $match tenantId: " + tenantId)
	console.log('patient $match backendPath: ' +`${process.env.BACKEND_FHIR_PATIENT_MATCH_URL}${backendPath}`)
	var request = {
		'url': `${process.env.BACKEND_FHIR_PATIENT_MATCH_URL}${backendPath}`,
		'method': 'POST',
		'headers': { 'Authorization': headers.Authorization,
					'Content-Type': 'application/json'
		 },
    	'data': requestBody,
		'validateStatus': () => true,
	}
	console.log("Forwarding Request to FHIR Server:")
	console.log(request)
	var fhirResult = await axios.request(request)
	console.log("fhir $match Result: ", JSON.stringify(fhirResult.data))
	return { 
    statusCode: fhirResult.status,
		headers: fhirResult.headers,
		body: fhirResult.data
	}
}

module.exports.memberMatchHandler = async (requestBody, tenantId, path,headers) => {
	const backendPath = path.replace(`/${tenantId}`, '')
	console.log("patient $member-match tenantId: " + tenantId)
	console.log('patient $member-match backendPath: ' +  `${process.env.BACKEND_FHIR_MEMBER_MATCH_URL}${backendPath}`)
	var request = {
		'url': `${process.env.BACKEND_FHIR_PATIENT_MATCH_URL}${backendPath}`,
		'method': 'POST',
		'headers': { 'Authorization': headers.Authorization,
					'Content-Type': 'application/json'
		 },
    	'data': requestBody,
		'validateStatus': () => true,
	}
	console.log("Forwarding Request to FHIR Server:")
	console.log(request)
	var fhirResult = await axios.request(request)
	console.log("fhir $member-match Result: ", JSON.stringify(fhirResult.data))
	return { 
    statusCode: fhirResult.status,
		headers: fhirResult.headers,
		body: fhirResult.data
	}
}