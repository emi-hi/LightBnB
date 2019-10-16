/*
All My Reservations
When a user is logged in, they will have an option to view all of their reservations. This page will show details about a reservation and details about the property associated with the reservation.

Show all reservations for a user.

Select all columns from the reservations table, all columns from the properties table, and the average rating of the property.
Order the results from most recent start_date to least recent start_date.
These will end up being filtered by either "Upcoming Reservations" or "Past Reservations", so only get reservations where the end_date is in the past.
Use now()::date to get today's date.
This will only be for a single user, so use 1 for the user_id.
Limit the results to 10.
*/

SELECT distinct(reservations.*), properties.*, avg(property_reviews.rating) as average_rating
FROM reservations
JOIN property_reviews on reservations.property_id = property_reviews.property_id 
JOIN properties on properties.id = reservations.property_id
WHERE reservations.guest_id = 1
GROUP BY properties.id, reservations.id
HAVING end_date <  now()::date
ORDER BY start_date DESC
LIMIT 10;

/*
 \i 1_queries/5_allmyreservations.sql
*/