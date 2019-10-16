/*
Most Visited Cities
Our product managers want a query to see a list of the most visited cities.

Get a list of the most visited cities.

Select the name of the city and the number of reservations for that city.
Order the results from highest number of reservations to lowest number of reservations.
*/

SELECT distinct(city), count(city) as total_reservations
FROM reservations
JOIN properties ON property_id = properties.id
GROUP BY city
ORDER BY count(city) DESC;


/*
 \i 1_queries/4_mostvisitedcities.sql
*/