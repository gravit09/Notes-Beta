import { Client, Account, Databases, Storage, Query, ID } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.REACT_APP_APPWRITE_ID);

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);

export { Query, ID };
