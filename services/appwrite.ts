  import { Client, Databases, ID, Query, Account } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);
// Add Account instance for authentication:
const account = new Account(client);



// --- AUTH FUNCTIONS ---

export const signUp = async (email: string, password: string, name: string) => {
  try {
    // Create user in Appwrite Auth
    const user = await account.create(ID.unique(), email, password, name);
    return user;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    // Create email session
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    throw error;
  }
};

// ...other imports and code...

  export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
      const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("searchTerm", query),
      ]);

      if (result.documents.length > 0) {
        const existingMovie = result.documents[0];
        await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id,
            {
              count: existingMovie.count + 1,
            }
        );
      } else {
        await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          searchTerm: query,
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        });
      }
    } catch (error) {
      console.error("Error updating search count:", error);
      throw error;
    }
  };

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return result.documents.map((doc: any) => ({
      searchTerm: doc.searchTerm,
      movie_id: doc.movie_id,
      title: doc.title,
      count: doc.count,
      poster_url: doc.poster_url,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// ...other exports like signUp, login, etc

export { database, account, DATABASE_ID, COLLECTION_ID };