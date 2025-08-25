import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function getNewAccessToken() {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_secret', process.env.CLIENT_SECRET);
  params.append('client_id', process.env.CLIENT_ID);
  params.append('scope', process.env.SCOPE);

  console.log(params,"params")
  const response = await axios.post(
    'https://api.move.tatacommunications.com/api-connect/token',
    params.toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  return response.data.access_token;
}
