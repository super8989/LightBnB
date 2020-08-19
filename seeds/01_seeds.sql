INSERT INTO users (id, name, email, password) 
VALUES 
(1, 'Jenny Love', 'jenny@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Skyler Smith', 'skyler@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Sam Jones', 'sam@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, country, street, city, province, post_code)
VALUES 
('1', 'house1', 'description', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/584399/living-room-couch-interior-room-584399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 150, 'Canada', '100 Dundas Street', 'Ottawa', 'Ontario', 'A1A2B2'),
('2', 'house2', 'description', 'https://images.pexels.com/photos/428427/pexels-photo-428427.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260', 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 200, 'Canada', '40 Main Street', 'Toronto', 'Ontario', 'N8N3C3'),
('3', 'title3', 'description', 'https://images.pexels.com/photos/91216/pexels-photo-91216.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', 300, 'Canada', '4655 Avenue Gaspard', 'Montreal', 'Quebec', 'Q5Q9P9');

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES 
(1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES 
(1, 1, 1, 5, 'Best LightBnB ever!'),
(2, 2, 2, 3, 'Awesome stay!'),
(3, 3, 3, 4, 'Great location!');