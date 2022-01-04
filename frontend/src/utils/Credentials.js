// TODO: Figure out why .env file isn't connecting with the app
const Credentials = {
  clientId: process.env.CLIENT_ID || "a4d359510d674b32af2ac4ff821e067d",
  clientSecret: process.env.CLIENT_SECRET || "",
};

export default Credentials;
