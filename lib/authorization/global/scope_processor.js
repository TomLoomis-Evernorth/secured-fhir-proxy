//This method will determine if the FHIR resource I've requested are authorized at a coarse level
//depending upon the scopes the authorization server has granted.
const activityMap = {
    GET: ['r','read', 's','rs','*'],
    SEARCH: ['read', 's','rs','*'],
    POST: ['c', 'write', '*', 's', 'read', 'r','rs'],
    PUT: ['u',' write', '*'],
    DELETE: ['d', 'write', '*']
}
module.exports.authorizeScopeForResourceAndMethod = (requestedResourceType, httpMethod, scopeArray) => {
    const foundMatchingScopes = scopeArray.filter(scopeValue => {
        const fhirScopePattern = /(user|system|patient)+\/(.+)\.(.+)/
        const fhirScopeMatch = scopeValue.match(fhirScopePattern)
        if(fhirScopeMatch) {
            const resourceTypeMatch = (fhirScopeMatch[2] == requestedResourceType)
            //this line does not appear to work with combined v2 scopes like 'rs'
            const httpMethodMatch = (activityMap[httpMethod].includes(fhirScopeMatch[3]))
            return resourceTypeMatch && httpMethodMatch
        } 
        else {
            return false
        }
    })
    return foundMatchingScopes && foundMatchingScopes.length > 0
}