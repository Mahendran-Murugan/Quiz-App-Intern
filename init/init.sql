CREATE TABLE `attempt` (
  `id` int(11) NOT NULL,
  `quizid` int(11) NOT NULL DEFAULT 0,
  `userid` int(11) NOT NULL DEFAULT 0,
  `attempt` int(11) NOT NULL DEFAULT 0
);

CREATE TABLE `question` (
  `id` int(100) NOT NULL,
  `quizid` int(100) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `image` varchar(1000) NOT NULL,
  `points` int(100) NOT NULL,
  `choices` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`choices`)),
  `isImage` tinyint(1) NOT NULL DEFAULT 0
) ;

CREATE TABLE `quizz` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `count` int(200) NOT NULL,
  `duration` int(200) DEFAULT NULL,
  `attempt` int(200) NOT NULL DEFAULT 0
);

CREATE TABLE `user` (
  `id` int(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `attended` int(50) NOT NULL DEFAULT 0,
  `correct` int(50) NOT NULL DEFAULT 0,
  `role` varchar(30) NOT NULL DEFAULT 'school_student',
  `phone_number` bigint(100) NOT NULL DEFAULT 0,
  `parents_number` bigint(100) NOT NULL DEFAULT 0,
  `address` varchar(100) NOT NULL DEFAULT '0',
  `father_name` varchar(50) NOT NULL DEFAULT '0',
  `mother_name` varchar(50) NOT NULL DEFAULT '0',
  `gender` varchar(20) NOT NULL DEFAULT '0',
  `institute_name` varchar(100) NOT NULL DEFAULT '0',
  `standard` varchar(50) NOT NULL,
  `verified` tinyint(1) NOT NULL
);

INSERT INTO `user` (`id`, `name`, `userid`, `password`, `attended`, `correct`, `role`, `phone_number`, `parents_number`, `address`, `father_name`, `mother_name`, `gender`, `institute_name`, `standard`, `verified`) VALUES
(1, 'daniel', 'admin@gmail.com', '1234567', 18, 8, 'admin', 0, 0, '0', '0', '0', 'Male', '0', '', 0);


ALTER TABLE `attempt` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT, add PRIMARY KEY (`id`); 
ALTER TABLE `question` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT, add PRIMARY KEY (`id`);
ALTER TABLE `quizz` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT, add PRIMARY KEY (`id`); 
ALTER TABLE `user` CHANGE `id` `id` INT(11) NOT NULL AUTO_INCREMENT, add PRIMARY KEY (`id`); 