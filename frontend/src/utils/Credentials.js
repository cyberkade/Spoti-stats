const Credentials = () => {
  return {
    ClientId: process.env.CLIENT_ID,
    ClientSecret: process.env.CLIENT_SECRET,
  };
};

export default Credentials;
