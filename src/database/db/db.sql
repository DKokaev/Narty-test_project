-- MySQL Script generated by MySQL Workbench
-- Tue Nov 22 19:08:23 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT(255) NULL,
  `passhash` TEXT(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Pages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `PageNumber` VARCHAR(45) NULL,
  `Lang` VARCHAR(45) NULL,
  `imageUrl` TEXT(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;




-- -----------------------------------------------------
-- Table `mydb`.`Rel_Table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Rel_Table` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `comics_id` INT NULL,
  `page_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Rel_Table_Pages1_idx` (`page_id` ASC),
  CONSTRAINT `fk_Rel_Table_Pages1`
    FOREIGN KEY (`page_id`)
    REFERENCES `mydb`.`Pages` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Comics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Comics` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ComicsName` TEXT(255),
  `lang` VARCHAR(45) ,
  `description` TEXT(255),
  `ico` TEXT(255),
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Languages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Languages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Languages_Pages_idx` (`name` ASC)
  )
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
CREATE TABLE IF NOT EXISTS `mydb`.`Comics` (   `id` INT NOT NULL AUTO_INCREMENT,   `ComicsName` TEXT(255) NULL,   `lang` VARCHAR(45) NULL,   `description` TEXT(255) NULL,   `ico` TEXT(255) NULL,   PRIMARY KEY (`id`),   CONSTRAINT `fk_Comics_Rel_Table1`     FOREIGN KEY (`id`)     REFERENCES `mydb`.`Rel_Table` (`comics_id`)     ON DELETE NO ACTION     ON UPDATE NO ACTION) ENGINE = InnoDB
