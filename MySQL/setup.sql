DROP DATABASE  IF EXISTS `health_project`;

CREATE DATABASE  IF NOT EXISTS `health_project`;
USE `health_project`;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` char(80) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_role_idx` (`role_id`),
  
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) 
  REFERENCES `user` (`id`) 
  ON DELETE NO ACTION ON UPDATE NO ACTION,
  
  CONSTRAINT `fk_role` FOREIGN KEY (`role_id`) 
  REFERENCES `role` (`id`) 
  ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `supplement`;
CREATE TABLE `supplement`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(30) NOT NULL,
    `user_id` int(11) NOT NULL,
    `supplement_nutrient_id` int(11) NOT NULL,
    `supplement_product_id` int(11) NOT NULL,
    `supplement_personal_id` int(11) NOT NULL,
    PRIMARY KEY(`id`),
    
    CONSTRAINT `fk_supplement_user_id` FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
    
    CONSTRAINT `fk_supplement_supplement_nutrient_id` FOREIGN KEY (`supplement_nutrient_id`)
    REFERENCES `supplement_nutrient` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
    
    CONSTRAINT `fk_supplement_supplement_product_id` FOREIGN KEY (`supplement_product_id`)
    REFERENCES `supplement_product` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
    
    CONSTRAINT `fk_supplement_supplement_personal_id` FOREIGN KEY (`supplement_personal_id`)
    REFERENCES `supplement_personal` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
    
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `supplement_nutrient`;
CREATE TABLE `supplement_nutrient`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `type` varchar(20) DEFAULT NULL,
    `fat_soluble` tinyint(1) DEFAULT 0,
    `water_soluble` tinyint(1) DEFAULT 0,
    `time` varchar(20) DEFAULT NULL,
    `food` varchar(20) DEFAULT NULL,
    `unit_measurement` varchar(5) NOT NULL,
    `recommended_intake` int(4) DEFAULT NULL,
    `maximum_intake` int(4) DEFAULT NULL,
    `note` text DEFAULT NULL, 
    PRIMARY KEY(id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `supplement_product`;
CREATE TABLE `supplement_product`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `amount` int(4) NOT NULL,
    `nr_servings` int(3) DEFAULT NULL,
    `price` int(4) DEFAULT NULL,
    `price_currency` varchar(3) DEFAULT NULL,
    `company` varchar(30) DEFAULT NULL,
    `link` varchar(512) DEFAULT NULL,
    PRIMARY KEY(id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `supplement_personal`;
CREATE TABLE `supplement_personal`(
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `nr_servings` int(2) NOT NULL,
    `time` varchar(20) DEFAULT NULL,
    `start` date DEFAULT NULL,
    `refil` date DEFAULT NULL,
    PRIMARY KEY(id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;

--
-- Insert inital data
--

INSERT INTO `user` (username,password,first_name,last_name,email,active)
VALUES 
('admin','$2a$10$wq3.MucONlaGULiMI7XojORONU7CRU9/5qSziZV5hPUUOxxQsBVyK','Marcelo','Silva','ola1@gmail.com',1),
('support','$2a$10$8Rcm8OCktUFMLYXIiZFM1eThzP1rRJMEE1ISRKCOUFWahO5oVlk2K','Ana','Marques','ola2@gmail.com',1),
('user','$2a$10$AtN7JiCzqW5HvqWhNOhSL.nb/zCJUPakwU01h9oNJdZjn0C5XB6ae','Melissa','Pereira','ola3@gmail.com',1);

INSERT INTO `role` (name)
VALUES 
('ROLE_USER'),('ROLE_SUPPORT'),('ROLE_ADMIN');

INSERT INTO `users_roles` (user_id,role_id)
VALUES 
(1, 1),
(1, 3),
(2, 1),
(2, 2),
(3, 1)