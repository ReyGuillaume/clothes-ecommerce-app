INSERT INTO `category` (`name`) VALUES 
("Vêtements"),
("Chaussures"),
("Accessoires");

INSERT INTO `subcategory` (`name`, `id_category`) VALUES 
("T-Shirt", 1),
("Pull", 1),
("Veste", 1),
("Pantalon", 1),
("Sneakers", 2),
("Bottes", 2),
("Bijoux", 3);

INSERT INTO `brand` (`name`) VALUES 
("Nike"),
("Zara"),
("Adidas"),
("Rolex"),
("Guess");

INSERT INTO `gender` (`name`) VALUES 
("Homme"),
("Femme"),
("Mixte");

INSERT INTO `article` (`name`, `id_subcategory`, `id_gender`, `id_brand`, `price`, `description`, `image`) VALUES
("T-Shirt noir", 1, 3, 1, 20, "T-Shirt noir, basique et efficace", "https://t.ly/h9df"),

("Pull rouge", 2, 3, 2, 20, "Pull rouge, basique et efficace", "https://t.ly/pOd3"),

("T-shirt vert", 1, 1, 1, 15, "T-shirt vert, basique et efficace", "https://t.ly/QayO"),

("Pull gris", 2, 1, 2, 30, "Pull gris, parfait pour l'hiver", "https://t.ly/ct-k"),

("Veste beige", 3, 2, 5, 50, "Veste beige", "https://t.ly/ZkvA"),

("Stan smith blanche", 5, 3, 3, 60, "Stan Smith adidas, chaussure de ville", "https://cutt.ly/J1l015E"),

("Rolex Oyster Perpetual", 7, 1, 4, 10000, "Rolex Oyster Perpetual, montre haute horlogerie United Kingdom", "https://cutt.ly/M1l2rnq");

INSERT INTO `order_status` (`id`, `status`) VALUES 
(NULL, 'En cours de préparation'), 
(NULL, 'En cours de livraison'), 
(NULL, 'Livrée'), 
(NULL, 'Annulée');

INSERT INTO `size` (`id`, `name`) VALUES 
(NULL, 'XS'), 
(NULL, 'S'),
(NULL, 'M'), 
(NULL, 'L'), 
(NULL, 'XL');

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(NULL, 'admin', 'admin');

INSERT INTO `user` (`id`, `firstname`, `lastname`, `mail`, `phone_number`, `password`) VALUES
(NULL, 'Eric', 'DUPONT', 'ericdupont@gmail.com', '0666783421', 'edupont');

INSERT INTO `address` (`id`, `number`, `street`, `city`, `country`, `id_user`) VALUES
(1, '126', 'Rue de la Raclette', 'Chambéry', 'France', 1);
