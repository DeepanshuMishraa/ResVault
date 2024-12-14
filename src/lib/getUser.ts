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
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
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
