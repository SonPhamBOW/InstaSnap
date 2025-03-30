import { INewUser } from "../../types";
import { ID, Query } from "appwrite";
import { account, appWriteConfig, avatars, databases } from "./config";

export async function createUserAccount(userInfo: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      userInfo.email,
      userInfo.password,
      userInfo.name,
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(userInfo.name);

    const newUser = await saveUserToDB({
      name: newAccount.name,
      username: userInfo.username,
      accountId: newAccount.$id,
      email: newAccount.email,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.usersCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
