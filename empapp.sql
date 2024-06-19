-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 19, 2024 at 02:47 PM
-- Server version: 5.7.36
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `empapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `e_name` varchar(40) NOT NULL,
  `e_vanue` varchar(150) NOT NULL,
  `e_startdate` datetime NOT NULL,
  `e_enddate` datetime NOT NULL,
  `u_id` int(11) NOT NULL,
  `e_capacity` int(11) NOT NULL,
  `is_active` enum('1','0') NOT NULL,
  PRIMARY KEY (`e_id`),
  KEY `u_id` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`e_id`, `e_name`, `e_vanue`, `e_startdate`, `e_enddate`, `u_id`, `e_capacity`, `is_active`) VALUES
(8, 'sdfdsf', 'sdfs', '2024-06-04 18:30:00', '2024-06-05 18:30:00', 1, 20, '1'),
(9, 'Testing Events', 'Ahmedabad', '2024-06-22 19:00:00', '2024-06-24 00:00:00', 1, 14, '1'),
(10, 'Testingggggggggg', 'Gandhinagar', '2024-06-19 14:20:00', '2024-06-19 15:00:00', 1, 25, '1'),
(11, 'sdfdsf', 'Ahmedabad', '2024-06-04 18:30:00', '2024-06-06 18:30:00', 1, 15, '1'),
(12, 'Tesing My All Events', 'Ahmedabad', '2024-06-18 05:22:00', '2024-06-19 05:22:00', 1, 17, '1'),
(13, 'Testing My Events On Same Date', 'Ahmedabad', '2024-06-17 18:30:00', '2024-06-18 18:30:00', 1, 85, '1'),
(14, 'Testing as per client', 'Ahmedabad , Gandhinagar , Rajkot', '2024-06-16 20:30:00', '2024-06-21 22:30:00', 1, 150, '1');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `r_id` int(11) NOT NULL AUTO_INCREMENT,
  `r_type` varchar(50) NOT NULL,
  PRIMARY KEY (`r_id`),
  KEY `r_type` (`r_type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`r_id`, `r_type`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(50) NOT NULL,
  `u_email` varchar(100) NOT NULL,
  `u_password` varchar(100) NOT NULL,
  `r_type` varchar(50) DEFAULT NULL,
  `is_active` enum('1','0') NOT NULL,
  PRIMARY KEY (`u_id`),
  KEY `r_type` (`r_type`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`u_id`, `u_name`, `u_email`, `u_password`, `r_type`, `is_active`) VALUES
(1, 'Keval Dave', 'kevalsdave@gmail.com', 'Keval@123', 'admin', '1'),
(2, 'Harsh Sevak', 'Harsh@gmail.com', 'Harsh@123', 'user', '0'),
(3, 'DKeval', 'kevalsdave9898@gmail.com', '$2b$10$vXbt0u2dGBtjnOgchqV3u.Zh4t5kZgwzQZGN.FKcsz7FcKheRbFuG', 'user', '1'),
(8, 'KN', 'kdave.netclues@gmail.com', '$2b$10$vmvjks9FO6Ht9vvqzmQEyOfXzcs5xoMiRJXZgH9VmlZVsBd8HM97C', 'user', '1');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`r_type`) REFERENCES `role` (`r_type`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
