INSERT INTO users (name, email, password) VALUES ('Teddy H', 'Teddy.Gram@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('McChroi Crane', 'ItsMcChroi@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Maya Henkelman', 'Maya_H@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' );
INSERT INTO users (name, email, password) VALUES ('Dodo Abhar', 'Dodo_01@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' );
INSERT INTO users (name, email, password) VALUES ('Sly Dog', 'SlyTheDog@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, 
cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms,
 number_of_bedrooms, country, street, city, province, post_code) 
 VALUES 
 ( 1, 'City Loft', 'Urban living',
 'https://images.adsttc.com/media/images/5d70/7dcc/284d/d102/9500/06ed/newsletter/feature_-_CMCa_Loft_Holesovice_BoysPlayNice_04.jpg', 
 'https://images.adsttc.com/media/images/5d70/7dcc/284d/d102/9500/06ed/newsletter/feature_-_CMCa_Loft_Holesovice_BoysPlayNice_04.jpg',  
 150.00, 1, 2, 2, 'Canada', 'Douglas Street', 'Victoria', 'BC', 'V9A 1E8'),
( 2, 'Tiny House', 'Live simply.',
  'https://www.tumbleweedhouses.com/wp-content/uploads/elm-cedar-black-1000x667.jpg?_t=1519431711', 
  'https://media.treehugger.com/assets/images/2018/08/clover-tiny-house-modern-tiny-living-9C.jpg.860x0_q70_crop-scale.jpg', 
  100.00, 1, 1, 1, 'Canada', 'Oak Bay Ave', 'Victoria', 'BC', 'V9A 1E8'),
( 3, 'Studio', 'All you need within reach!',
'https://wp.zillowstatic.com/streeteasy/2/studio_tips-321ecc-1024x612.png', 
'https://odis.homeaway.com/odis/listing/21e790fe-7f8a-4090-8893-8b6ee080119a.c10.jpg' , 
 60.00, 0, 1, 0, 'Canada', 'Fisgard Street', 'Victoria', 'BC', 'V9A 1E8'),
( 1, 'Giant Mansion', 'Its luxurious!',
 'https://i.pinimg.com/originals/d6/04/74/d60474ef7e867fb55e46fdc9904ec842.jpg', 
 'https://i.pinimg.com/originals/67/a7/29/67a7297113bd66aba8b1a97789274010.jpg', 
 1000.00, 4, 4, 6, 'Canada', 'Uplands Drive' , 'Victoria', 'BC', 'V9A 1E8'),
( 2, 'Rural Cottage', 'Theres horses in the front yard!',
 'http://smallhouseswoon.com/wp-content/uploads/2014/07/rural-cottage-1.jpg', 
 'http://smallhouseswoon.com/wp-content/uploads/2014/07/rural-cottage-2.jpg', 
 300.00, 2, 2, 3, 'Canada', 'West Saanich Road', 'Victoria', 'BC', 'V9A 1E8');


INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2019-11-10', '2019-11-15', 1, 3);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2019-12-11', '2019-12-25', 2, 1);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2019-11-01', '2019-11-05', 4, 5);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2019-10-27', '2019-11-01', 5, 1);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2019-11-15', '2019-11-20', 3, 3);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2019-11-08', '2019-11-12', 2, 2);



INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (3, 1, 0, 5, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (1, 2, 1, 4, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (5, 4, 2, 2, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (1, 5, 3, 5, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (3, 3, 4, 1, 'message');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (2, 2, 5, 3, 'message');