interface DecodedToken {
  userId: string;
  name: string;
  iat: number;
  exp: number;
}

export const getUser = () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    // Split the token and get the payload part (second part)
    const payload = token.split('.')[1];
    // Decode the base64 string
    const decodedPayload = atob(payload);
    // Parse the JSON
    const parsedPayload: DecodedToken = JSON.parse(decodedPayload);

    return {
      name: parsedPayload.name,
      userId: parsedPayload.userId
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
