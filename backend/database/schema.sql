-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema neo_muse
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema neo_muse
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `neo_muse` DEFAULT CHARACTER SET utf8 ;
USE `neo_muse` ;

-- -----------------------------------------------------
-- Table `neo_muse`.`artists`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `neo_muse`.`artists` (
  `artist_id` INT NOT NULL AUTO_INCREMENT,
  `artist_name` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `date_registration` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `thumbnail` TEXT NOT NULL,
  `biography` TEXT NOT NULL,
  PRIMARY KEY (`artist_id`));


-- -----------------------------------------------------
-- Table `neo_muse`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neo_muse`.`events` (
  `events_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `start_date` DATETIME NOT NULL,
  `localisation` VARCHAR(255) NOT NULL,
  `end_date` DATETIME NOT NULL,
  `thumbnail` TEXT NOT NULL,
  PRIMARY KEY (`events_id`));


-- -----------------------------------------------------
-- Table `neo_muse`.`sub_technique`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neo_muse`.`sub_technique` (
  `sub_technique_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`sub_technique_id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `neo_muse`.`artwork_technique`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neo_muse`.`artwork_technique` (
  `artwork_technique_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `sub_technique_id` INT NOT NULL,
  PRIMARY KEY (`artwork_technique_id`),
  INDEX `fk_artwork_technique_sub_technique1_idx` (`sub_technique_id` ASC) VISIBLE,
  CONSTRAINT `fk_artwork_technique_sub_technique1`
    FOREIGN KEY (`sub_technique_id`)
    REFERENCES `neo_muse`.`sub_technique` (`sub_technique_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `neo_muse`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neo_muse`.`users` (
  `users_id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(13) NULL,
  `adress` VARCHAR(255) NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM("user", "admin") NOT NULL DEFAULT 'user',
  PRIMARY KEY (`users_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `neo_muse`.`artworks`
-- -----------------------------------------------------
CREATE TABLE
    IF NOT EXISTS `neo_muse`.`artworks` (
        `artworks_id` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(255) NOT NULL,
        `description` TEXT NOT NULL,
        `art_theme` VARCHAR(255) NOT NULL,
        `date_creation` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `price` INT NOT NULL,
        `dimension_height` INT NOT NULL,
        `dimension_width` INT NOT NULL,
        `dimension_depth` INT NOT NULL,
        `price_on_demand` TINYINT NOT NULL DEFAULT 0,
        `thumbnail` TEXT NOT NULL,
        `artists_id` INT NOT NULL,
        `artwork_technique_id` INT NOT NULL,
        PRIMARY KEY (`artworks_id`),
        INDEX `fk_artworks_artists1_idx` (`artists_id` ASC) VISIBLE,
        INDEX `fk_artworks_artwork_technique1_idx` (`artwork_technique_id` ASC) VISIBLE,

        CONSTRAINT `fk_artworks_artists1` FOREIGN KEY (`artists_id`) REFERENCES `neo_muse`.`artists` (`artist_id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `fk_artworks_artwork_technique1` FOREIGN KEY (`artwork_technique_id`) REFERENCES `neo_muse`.`artwork_technique` (`artwork_technique_id`) ON DELETE CASCADE ON UPDATE CASCADE

    );

-- -----------------------------------------------------
-- Table `neo_muse`.`set_favorite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `neo_muse`.`set_favorite` (
  `users_id` INT NOT NULL,
  `artworks_id` INT NOT NULL,
  PRIMARY KEY (`users_id`, `artworks_id`),
  INDEX `fk_users_has_artworks_artworks1_idx` (`artworks_id` ASC) VISIBLE,
  INDEX `fk_users_has_artworks_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_artworks_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `neo_muse`.`users` (`users_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_artworks_artworks1`
    FOREIGN KEY (`artworks_id`)
    REFERENCES `neo_muse`.`artworks` (`artworks_id`)

    
    ON DELETE CASCADE
    ON UPDATE CASCADE);



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
