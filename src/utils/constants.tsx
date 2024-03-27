import {decode as atob, encode as btoa} from 'base-64';

export const Api_path =
  'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/influencer/';

export const base64UrlDecode = base64Url => {
  const padding = '='.repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
  const decoded = atob(base64);
  return atob(base64);
};

export const decodeJWT = jwtToken => {
  const [header, payload, signature] = jwtToken.split('.');
  const decodedHeader = JSON.parse(base64UrlDecode(header));
  const decodedPayload = JSON.parse(base64UrlDecode(payload));
  return decodedPayload;
};

export const capitalize = s => {
  return s && s[0].toUpperCase() + s.slice(1);
};

export const replaceCommaWithAnd = str => {
  if (typeof str !== 'undefined') {
    return str.replace(/,/g, ' & ');
  } else {
    return ''; // Return an empty string if the input is undefined
  }
};

export const splitStringAtFirstSpace = str => {
  const firstSpaceIndex = str.indexOf(' ');
  if (firstSpaceIndex !== -1) {
    const part1 = str.substring(0, firstSpaceIndex);
    const part2 = str.substring(firstSpaceIndex + 1);
    return part2;
  } else {
    // If no space found, return the whole string as the first part and an empty string as the second part
    return [str, ''];
  }
};
