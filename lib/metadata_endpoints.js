'use strict';
const SmartConfig = require('./well-known/smart-well-known.js');
const UDAPConfig = require('./well-known/udap-well-known.js')
const TenantConfig = require('./tenant_config.js')
const axios = require('axios')

//These endpoints are essentially static endpoints that advertise key information about the SMART authorization server.
//They are dyanamic endpoints in this reference implementation purely for ease of deployment.
module.exports.smartConfigHandler = async (tenantId) => {
	return SmartConfig.getSMARTConfiguration(TenantConfig.getTenantConfig(tenantId));
}

module.exports.legacyMetadataHandler = async (tenantId) => {
	return SmartConfig.getLegacyConfiguration(TenantConfig.getTenantConfig(tenantId));
}

module.exports.udapConfigHandler = async (tenantId) => {
	return UDAPConfig.getUDAPConfiguration(TenantConfig.getTenantConfig(tenantId));
}

//Straight proxy just pass along to FHIR server /metadata endpoint
module.exports.fhirMetadataHandler = async (tenantId,path) => {
	const backendPath = path.replace(`/${tenantId}`, '')
	var request = {
		'url': `${process.env.BACKEND_FHIR_SERVICE_URL}${backendPath}`,
		'method': 'GET',
		'maxRedirects': 0,
		'validateStatus': function (status) {
			return true //We want to report on exactly what the FHIR server reports back, good or bad.
		}
	}
	console.log("Forwarding Request to FHIR Server:")
	console.log(request)
	var fhirResult = await axios.request(request)
	return fhirResult.data
}