
const db = require('./db/index.js')
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
  WHERE LOWER(users.email) = LOWER($1);
  `
  const values = [email];
  return db.query(queryString, values)
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
  WHERE users.id = $1;
  `;
  const values = [id];
  return db.query(queryString, values)
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
return db.query(queryString, values)
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
  ORDER BY start_date
  LIMIT $2;
  `
  const values = [guest_id, limit];
  return db.query(queryString, values)
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
    const queryParams = [];
    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_id
    `;
    let whereAdded = false
    const addWhere = function(){
      if (!whereAdded) {
        queryString += `WHERE `
        whereAdded = true
      } else {
        queryString += ' AND '}
    }
    if (options.owner_id) {
      queryParams.push(`${options.owner_id}`);
      queryString += `WHERE owner_id = $${queryParams.length}`;
    }
    if (options.city) {
      addWhere()
      queryParams.push(`%${options.city}%`);
      queryString += `city LIKE $${queryParams.length}`;
      whereAdded += 1

    }
    if (options.minimum_price_per_night) {
      addWhere()
      queryParams.push(`${options.minimum_price_per_night}`);
      queryString += `cost_per_night >= $${queryParams.length}`;
    }
    if (options.maximum_price_per_night) {
      addWhere()
      queryParams.push(`${options.maximum_price_per_night}`);
      queryString += `cost_per_night <= $${queryParams.length}`;
    }
    queryString += `
    GROUP BY properties.id
    `;
    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
    }
    queryParams.push(limit);
    queryString += 
    `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
    return db.query(queryString, queryParams)
    .then(res => res.rows);
  }

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString = 
  `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, 
    cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms,
    number_of_bedrooms, country, street, city, province, post_code) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code];

  return db.query(queryString, values)
  .then(res => res.rows[0]);
};

exports.addProperty = addProperty;



