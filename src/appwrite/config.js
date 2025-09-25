import { Client, Account, TablesDB } from "node-appwrite";

const createAdminClient = async () => {

    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT)
        .setProject(process.env.APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    return {
        get account() {
            return new Account(client);
        },

        get tablesDB() {
            return new TablesDB(client);
        },
    };

};

const createSessionClient = async (session) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID);

  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },

    get tablesDB() {
      return new TablesDB(client);
    },
  };
};

export { createAdminClient, createSessionClient };
