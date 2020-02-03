# MySQL Query
  CREATE TABLE `sns`.`new_table` (
  `id` VARCHAR(30) NOT NULL,
  `password` VARCHAR(100) NULL,
  `nickname` VARCHAR(10) NOT NULL,
  `token` VARCHAR(30) NOT NULL,
  `status` INT NOT NULL DEFAULT 0,
  `p_photo` VARCHAR(30) NULL,
  `gender` INT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT now(),
  `birthday` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) VISIBLE);
  
&nbsp;  

  CREATE TABLE `sns`.`follow` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `follower` VARCHAR(30) NOT NULL,
  `following` VARCHAR(30) NOT NULL,
  `like` INT NULL DEFAULT 0,
  `comment` INT NULL DEFAULT 0,
  `is_friend` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `follow_fk_idx` (`follower` ASC) VISIBLE,
  INDEX `following_fk_idx` (`following` ASC) VISIBLE,
  CONSTRAINT `follow_fk`
    FOREIGN KEY (`follower`)
    REFERENCES `sns`.`account` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `following_fk`
    FOREIGN KEY (`following`)
    REFERENCES `sns`.`account` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


&nbsp;
&nbsp;  

# ignore-list
  .env  
  node_modules/

&nbsp;
&nbsp;  

# salt 암호화
  <https://victorydntmd.tistory.com/33>

&nbsp;
&nbsp;

# TDD
 - mocha : <https://heropy.blog/2018/03/16/mocha/>
 - supertest(API test) : <https://velog.io/@wimes/node.js-REST-API-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B0-5.-TDD-5hk418e6xu>
