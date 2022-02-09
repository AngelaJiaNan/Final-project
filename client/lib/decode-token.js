export default function decodeToken(token) {
  try {
    // console.log(token);
    const [, encodedPayload] = token.split('.');
    const jsonPayload = atob(encodedPayload);
    // console.log('jsonPayload: ', jsonPayload);
    const payload = JSON.parse(jsonPayload);
    return payload;
  } catch (e) {
    // console.log('decodeToken err: ', e);
  }
}
