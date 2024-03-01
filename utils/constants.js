export  const  API_URL= "http://ec2-16-16-212-115.eu-north-1.compute.amazonaws.com:8080/api/v1"
export const WEB_SOCKET_URL = 'http://ec2-16-16-212-115.eu-north-1.compute.amazonaws.com:8085/api/v2/ws-connection?access_token'
export const API_BASE_URL = 'http://ec2-16-16-212-115.eu-north-1.compute.amazonaws.com:8085/api/v2';
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;