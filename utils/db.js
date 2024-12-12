import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

/**
 * Mongo service operation
 */
class DBClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (!err) {
        this.db = client.db(DB_DATABASE);
        this.usersCollection = this.db.collection('users');
        this.filesCollection = this.db.collection('files');
      } else {
        console.log(err.message);
        this.db = false;
      }
    });
  }

  /**
   * observes if redis connection is aline
   * @return {boolean} true if connection is alinve else false
   */
  isAlive() {
    return Boolean(this.db);
  }

  /**
   * number of documents
   * @return {number} num of users
   */
  async nbUsers() {
    const numberOfUsers = this.usersCollection.countDocuments();
    return numberOfUsers;
  }

  /**
   * Number of files to be returened
   * @return {number} number of files
   */
  async nbFiles() {
    const numberOfFiles = this.filesCollection.countDocuments();
    return numberOfFiles;
  }
}

const dbClient = new DBClient();

export default dbClient;
