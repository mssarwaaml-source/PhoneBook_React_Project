-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2025 at 04:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phonebook`
--
CREATE DATABASE IF NOT EXISTS `phonebook` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `phonebook`;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`contact_id`, `user_id`, `name`, `email`, `phone`, `image`) VALUES
(1, 1, 'first', 'firasngr@gmail.com', '0525290988', 'image-1748808592073-799727966.png'),
(2, 1, 'tt', 'firasngr@gmail.com', '418525', 'image-1748808610073-366334062.png'),
(3, 1, 'firas najjar', 'firasngr@gmail.com', '052529098822', 'image-1748808626463-110862973.png'),
(4, 1, 'John Doe', 'john@example.com', '1234567890', ''),
(5, 1, 'Jane Smith', 'jane@example.com', '0987654321', ''),
(6, 1, 'Alice Johnson', 'alice@example.com', '1112223333', ''),
(7, 1, 'Bob Brown', 'bob@example.com', '2223334444', ''),
(8, 1, 'Charlie Davis', 'charlie@example.com', '3334445555', ''),
(9, 1, 'Diana Prince', 'diana@example.com', '4445556666', ''),
(10, 1, 'Evan Lee', 'evan@example.com', '5556667777', ''),
(11, 1, 'Fiona Clark', 'fiona@example.com', '6667778888', ''),
(12, 1, 'George King', 'george@example.com', '7778889999', ''),
(13, 1, 'Hannah Scott', 'hannah@example.com', '8889990000', ''),
(14, 1, 'Ivan Turner', 'ivan@example.com', '9990001111', ''),
(15, 1, 'Julia Adams', 'julia@example.com', '0001112222', ''),
(17, 1, 'Laura Green', 'laura@example.com', '2223334445', ''),
(18, 1, 'Mike Black', 'mike@example.com', '3334445556', ''),
(19, 2, 'test', 'firasngr@gmail.com', '0525290988', 'image-1748809581936-131314120.png'),
(20, 2, 'firas najjar', 'firasngr@gmail.com', '052529098800', 'image-1748809596819-426252126.png'),
(22, 1, 'firas najjar', 'firasngr@gmail.com', '052529098855', 'Screenshot 2024-03-29 183801-1748933068076-968984832.png');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) UNSIGNED NOT NULL,
  `group_name` varchar(150) NOT NULL,
  `group_image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `user_id`, `group_name`, `group_image`, `createdAt`, `updatedAt`) VALUES
(5, 1, 'fff', 'Screenshot 2024-03-16 222948-1748852066701-468463137.png', '2025-06-02 11:14:26', '2025-06-03 12:40:40'),
(8, 2, 'ff', 'nvidia-chat -1748852433534-427145124.png', '2025-06-02 11:20:33', '2025-06-02 11:21:06'),
(9, 1, 'ff', 'npm_start-1748946066968-112725939.png', '2025-06-03 13:21:06', '2025-06-03 13:21:06'),
(10, 1, 'jjkjk', 'Screenshot 2024-01-07 215039-1748946077162-470593754.png', '2025-06-03 13:21:17', '2025-06-03 13:21:17');

-- --------------------------------------------------------

--
-- Table structure for table `group_contact`
--

CREATE TABLE `group_contact` (
  `group_id` int(10) UNSIGNED NOT NULL,
  `contact_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `group_contact`
--

INSERT INTO `group_contact` (`group_id`, `contact_id`) VALUES
(5, 2),
(5, 3),
(5, 4),
(5, 5),
(8, 19),
(8, 20),
(9, 2),
(10, 2),
(10, 3),
(10, 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`) VALUES
(1, 'firas', 'firasngr@gmail.com', '$2b$10$sXqq73.pZYOFtAf3SJTJde4B.Qac1e3wXXE8jaSQoDYoZ/yvCVjXK'),
(2, 'test', 'test@gmail.com', '$2b$10$ddl1LaDfJ6SMM2H6m17LTulhbwMDpvJNgpH2rSerjVXEiioM0PocK'),
(3, 'test', 'test1@gmail.com', '$2b$10$8C8VJ5gJcjFDjjnnwBlBK.Zw/CHeo149PTd3B8vvWGKTQBYNdxGeG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`,`user_id`);

--
-- Indexes for table `group_contact`
--
ALTER TABLE `group_contact`
  ADD PRIMARY KEY (`group_id`,`contact_id`),
  ADD KEY `group_contact_ibfk_1` (`contact_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `group_contact`
--
ALTER TABLE `group_contact`
  ADD CONSTRAINT `group_contact_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`contact_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_contact_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
