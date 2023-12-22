-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)

CREATE DATABASE  `thankstip`;

USE `thankstip`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_` varchar(255) NOT NULL,
  `profil_informations` text,
  `wallet_tip1` decimal(10,2) DEFAULT '0.00',
  `wallet_tip2` decimal(10,2) DEFAULT '0.00',
  `thanks` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `dio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom_dio` varchar(255) NOT NULL,
  `id_projects` int DEFAULT NULL,
  `dio_description` text,
  `id_members` int DEFAULT NULL,
  `id_ceo` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_members` (`id_members`),
  KEY `id_ceo` (`id_ceo`),
  CONSTRAINT `dio_ibfk_1` FOREIGN KEY (`id_members`) REFERENCES `users` (`id`),
  CONSTRAINT `dio_ibfk_2` FOREIGN KEY (`id_ceo`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `dio` WRITE;

INSERT INTO `dio` VALUES (1,'thankstip CDLAB',1,'Mon test DIO',1,1);

UNLOCK TABLES;


CREATE TABLE `users_dio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `id_dio` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_dio` (`id_dio`),
  CONSTRAINT `users_dio_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`),
  CONSTRAINT `users_dio_ibfk_2` FOREIGN KEY (`id_dio`) REFERENCES `dio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `projects_dio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_dio` int DEFAULT NULL,
  `project_name` varchar(255) NOT NULL,
  `project_description` text,
  `id_contributors` int DEFAULT '0',
  `investissements` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `id_dio` (`id_dio`),
  KEY `id_contributors` (`id_contributors`),
  CONSTRAINT `projects_dio_ibfk_1` FOREIGN KEY (`id_dio`) REFERENCES `dio` (`id`),
  CONSTRAINT `projects_dio_ibfk_2` FOREIGN KEY (`id_contributors`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `execution` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_dio` int DEFAULT NULL,
  `exec_description` varchar(255) DEFAULT NULL,
  `exec_content` text,
  `id_talent` int DEFAULT NULL,
  `id_ceo` int DEFAULT NULL,
  `candidate_description` text,
  `deadline` timestamp NULL DEFAULT NULL,
  `score_tips` int DEFAULT '0',
  `score_thanks` int DEFAULT '0',
  `status_` varchar(25) DEFAULT NULL,
  `ceo_validated` tinyint(1) DEFAULT NULL,
  `archived` tinyint(1) DEFAULT '0',
  `remaining_time` int DEFAULT NULL,
  `ceo_feedback_notYet` varchar(255) DEFAULT NULL,
  `ceo_feedback_rejected`  VARCHAR(255) DEFAULT NULL,
  `link` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_talent` (`id_talent`),
  KEY `id_ceo` (`id_ceo`),
  KEY `id_dio` (`id_dio`),
  CONSTRAINT `execution_ibfk_1` FOREIGN KEY (`id_talent`) REFERENCES `users` (`id`),
  CONSTRAINT `execution_ibfk_2` FOREIGN KEY (`id_ceo`) REFERENCES `users` (`id`),
  CONSTRAINT `execution_ibfk_3` FOREIGN KEY (`id_dio`) REFERENCES `dio` (`id`),
  CONSTRAINT `CK_Status` CHECK ((`status_` in (_utf8mb4'Not assigned',_utf8mb4'In progress',_utf8mb4'In review',_utf8mb4'Done',_utf8mb4'Proposal',_utf8mb4'Open',_utf8mb4'On going',_utf8mb4'Achieved',_utf8mb4'Rejected')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `review` (
  `id_review` int NOT NULL AUTO_INCREMENT,
  `id_execution` int DEFAULT NULL,
  `id_issuer` int DEFAULT NULL,
  `comments_` text,
  `difficulty` int DEFAULT NULL,
  `reactivity` int DEFAULT NULL,
  PRIMARY KEY (`id_review`),
  KEY `id_issuer` (`id_issuer`),
  KEY `id_execution` (`id_execution`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`id_issuer`) REFERENCES `users` (`id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`id_execution`) REFERENCES `execution` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `peer_review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_execution` int DEFAULT NULL,
  `id_issuer` int DEFAULT NULL,
  `comments` text,
  `expectations` int DEFAULT NULL,
  `reactivity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_issuer` (`id_issuer`),
  KEY `id_execution` (`id_execution`),
  CONSTRAINT `peer_review_ibfk_1` FOREIGN KEY (`id_issuer`) REFERENCES `users` (`id`),
  CONSTRAINT `peer_review_ibfk_2` FOREIGN KEY (`id_execution`) REFERENCES `execution` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




CREATE TABLE `ceo_review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_execution` int DEFAULT NULL,
  `id_issuer` int DEFAULT NULL,
  `comments` text,
  `expectations` int DEFAULT NULL,
  `reactivity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_issuer` (`id_issuer`),
  KEY `id_execution` (`id_execution`),
  CONSTRAINT `ceo_review_ibfk_1` FOREIGN KEY (`id_issuer`) REFERENCES `users` (`id`),
  CONSTRAINT `ceo_review_ibfk_2` FOREIGN KEY (`id_execution`) REFERENCES `execution` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE `dailythanks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dio_id` int DEFAULT NULL,
  `ceo_id` int DEFAULT NULL,
  `thanks_count` int DEFAULT '0',
  `count` int DEFAULT NULL,
  `daily_average` double DEFAULT '0',
  `day` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_dio_ceo_day` (`dio_id`,`ceo_id`,`day`),
  KEY `fk_dailythanks_ceo` (`ceo_id`),
  CONSTRAINT `fk_dailythanks_ceo` FOREIGN KEY (`ceo_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_dailythanks_dio` FOREIGN KEY (`dio_id`) REFERENCES `dio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;