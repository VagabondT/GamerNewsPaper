/*
- Create variable instance mongodb
- purpose use connect database
*/
const { MongoClient } = require("mongodb");
// Import module flag
const Flash = require("./Utilities/flash");
// Create instance of class Flash;
const flash = new Flash();
// URI : Uniform resource identifier.
const uri =
  "mongodb+srv://Kajso:_12081995_@clusterkajso.ftqmjuk.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const Category = require("./models/category");

const db = client.db("GamerNewsPaper");


// Test
Category.create({_id:1, Name: "Game" });

/**********************************************************************************************/
/**
 * Create collection function with 2 params.
 * @param {*} db_name : your database name.
 * @param {*} coll_name :  collection's name you want set
 */
async function _create_coll(db_name, coll_name) {
  try {
    const format_collection = flash._trim(coll_name);
    const result = await client.db(db_name).createCollection(format_collection);
  } finally {
    await client.close();
  }
}
/**
 * Delete collection function
 * @param {*} db_name : your database name
 * @param {*} _coll_name: collection's name you want delete
 */
async function _delete_coll(db_name, coll_name) {
  try {
    const format_collection = flash._trim(coll_name).toLowerCase();
    const result = await client.db(db_name).collection(coll_name).drop();
    if (result.insertedCount > 0) {
      console.log(`${coll_name} collection has been removed.`);
    } else {
      console.log(`Delete failed.`);
    }
  } finally {
    client.close();
  }
}
/**********************************************************************************************/

/**
 * Read document function
 * @param {*} db_name
 * @param {*} coll_name
 * @param {*} query
 * @returns data
 */
async function _read(db_name, coll_name, query) {
  try {
    let data = client.db(db_name).collection(coll_name).find(query);
    return data;
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}

/**
 * Insert many document function
 * @param {*} db_name
 * @param {*} coll_name
 * @param {*} data
 */
async function _insert(db_name, coll_name, data) {
  try {
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await client
      .db(db_name)
      .collection(coll_name)
      .insertMany(data, options);
    if (result.insertedCount) {
      console.log(`${result.insertedCount} documents were inserted.`);
    } else {
      console.log("The process insert can be meet some problems.");
    }
  } finally {
    client.close();
  }
}

/**
 * Delete document function
 * @param {*} db_name
 * @param {*} coll_name
 * @param {*} query = {}
 * @returns
 */
async function _update(db_name, coll_name, query) {
  try {
    let result = client.db(db_name).collection(coll_name).replaceOne(query);
    if (result.insertedCount > 0) {
      console.log(`${result.insertedCount} has been updated.`);
    } else {
      console.log("Update failed.");
    }
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}

/**
 * Delete document function
 * @param {*} db_name
 * @param {*} coll_name
 * @param {*} query
 * @returns
 */
async function _delete(db_name, coll_name, query) {
  try {
    let data = client.db(db_name).collection(coll_name).deleteMany(query);
    return data;
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
}
