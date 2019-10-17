const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 * Accepts an email address and will return a promise.
 * The promise should resolve with the user that has that email address, or null if that user does not exist
 */
const getUserWithEmail = function(email) {
  const queryString = `
  SELECT * FROM users
  WHERE users.email = $1
  `;
  const values = [email];
  return pool.query(queryString, values)
  .then(res => res.rows[0]);
};

exports.getUserWithEmail = getUserWithEmail;



/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

 const getUserWithId = function(id) {
  const queryString = `
  SELECT * FROM users
  WHERE users.id = $1
  `;
  const values = [id];
  return pool.query(queryString, values)
  .then(res => res.rows[0]);
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 * Accepts a user object that will have a name, email, and hashed password property.
 * This function should insert the new user into the database.
 * It will return a promise that resolves with the new user object. This object should contain the user's id after it's been added to the database.
 * Add RETURNING *; to the end of an INSERT query to return the objects that were inserted. This is handy when you need the auto generated id of an object  * you've just added to the database.
 */
const addUser = function(user){
const queryString = 
` INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *;`
const values = [user.name, user.password, user.email];
return pool.query(queryString, values)
.then(res => res.rows[0]);
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  return pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
