const auth = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

// let header = { 'Authorization': auth };

console.log(auth);
const base64Credentials = auth.split(' ')[1];
const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
//  const [username, password] = credentials.split(':');

console.log(credentials.split(':')[0]);


// var request = client.request('GET', '/', header);