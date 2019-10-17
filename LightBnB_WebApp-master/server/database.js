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
  const queryString = 
  `
  SELECT * FROM users
  WHERE LOWER(users.email) = LOWER($1)
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
  const queryString = 
  `
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
 */
const addUser = function(user){
const queryString = 
`
INSERT INTO users (name, password, email) 
VALUES ($1, $2, $3) 
RETURNING *;
`
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
  const queryString =
  `
  SELECT distinct(reservations.*), properties.*, avg(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties on property_id = properties.id
  JOIN property_reviews on reservations.property_id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND start_date > now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY start_date;
  `
  const values = [guest_id];
  return pool.query(queryString, values)
  .then(res => res.rows);
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
  return pool.query(
  `
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
