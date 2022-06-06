-- MySQL dump 10.13  Distrib 5.7.37, for Linux (x86_64)
--
-- Host: localhost    Database: webdaily_001
-- ------------------------------------------------------
-- Server version	5.7.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `code` varchar(36) NOT NULL DEFAULT '',
  `company_code` varchar(10) NOT NULL DEFAULT '000',
  `gender` varchar(20) NOT NULL DEFAULT 'M',
  `status` varchar(20) NOT NULL DEFAULT 'S',
  `email` varchar(50) DEFAULT NULL,
  `birthday` date NOT NULL,
  `expired_date` date NOT NULL,
  `total_purchase` float(10,2) NOT NULL DEFAULT '0.00',
  `mobile` varchar(20) DEFAULT NULL,
  `point_expired_date` date NOT NULL,
  `total_score` float(14,0) NOT NULL DEFAULT '0',
  `active` char(1) NOT NULL DEFAULT 'Y',
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(150) DEFAULT NULL,
  `system_created` datetime DEFAULT NULL,
  `system_updated` datetime DEFAULT NULL,
  `line_id` varchar(50) DEFAULT NULL,
  `prefix` varchar(100) DEFAULT NULL,
  `uuid_index` varchar(100) NOT NULL,
  `member_role` varchar(10) DEFAULT NULL,
  `data_sync` char(1) DEFAULT 'N' COMMENT 'ดึงข้อมูลไป local',
  `line_user_id` varchar(100) DEFAULT NULL,
  `member_code_ref` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('MB00000','000','M','S','softpos@gmail.com','1980-09-08','2030-09-23',0.00,'0814108403','2030-09-23',100,'Y','Admin','ผู้ดูแลระบบ','2020-09-23 21:28:46','2020-10-21 05:42:48','softpos','คุณ','ff3a447d-d10f-45a4-978b-bde5fa052123','super','N',NULL,NULL),('MB28005','000','M','S','natee.live@gmail.com','1986-09-18','2032-05-28',10.00,'0864108403','2032-05-28',20,'Y','นที','ภูวงษ','2022-05-28 22:47:08','2022-05-28 22:47:08','@nathee','นาย','b31bdc5b-7515-4de2-87c0-312d691f7d3e','member','N',NULL,NULL),('MB28006','000','M','S','employee@gmail.com','1984-06-06','2032-05-28',0.00,'0811234567','2032-05-28',10,'Y','ประยุทธ','จันทร์อาโช','2022-05-28 22:49:59','2022-05-28 22:49:59',NULL,'คุณ','9fe73b56-6f89-416a-835d-cc68dfe1e5dc','employee','N',NULL,NULL),('MB28007','000','M','S','hathaipat@gmail.com','1991-11-11','2032-05-28',0.00,'0970562656','2032-05-28',10,'Y','หทัยภัทร','สายแวว','2022-05-28 22:54:10','2022-05-28 22:54:10',NULL,'คุณ','298e5d8f-d5e0-435a-87d4-ee769affa50f','admin','N',NULL,NULL),('MB28008','000','M','S','prawit@gmail.com','1986-11-11','2032-05-29',0.00,'0821234567','2032-05-29',10,'Y','ประวิตร','ชิดลม','2022-05-29 08:38:26','2022-05-29 08:38:26','@prawit','คุณ','4a96fdb4-957a-48ec-a294-87dd4ddb784a','member','N',NULL,NULL),('MB28009','000','M','S','prawit1@gmail.com','1986-11-11','2032-05-29',0.00,'0831234567','2032-05-29',10,'Y','ประวิตร1','ชิดลม1','2022-05-29 08:40:40','2022-05-29 08:40:40','@prawit1','คุณ','cdfe1d91-8173-45bb-9146-465e1e4ae4dd','member','N',NULL,NULL),('MB28010','000','M','S','prawit2@gmail.com','1986-11-11','2032-05-29',0.00,'0810000002','2032-05-29',10,'Y','ประวิตร2','ชิดลม2','2022-05-29 08:42:31','2022-05-29 08:42:31','@prawit2','คุณ','3a5a59fd-9f44-44a3-b4a8-c6e7862f1c7f','member','N',NULL,NULL),('MB28011','000','M','S','prawit3@gmail.com','1986-11-11','2032-05-29',0.00,'0810000003','2032-05-29',10,'Y','ประวิตร3','ชิดลม3','2022-05-29 08:50:51','2022-05-29 08:50:51','@prawit3','คุณ','116d9946-3faf-4978-9c5b-22601b3f5fc5','member','N',NULL,NULL),('MB28012','000','M','S','prawit4@gmail.com','1986-11-11','2032-05-29',0.00,'0810000004','2032-05-29',10,'Y','ประวิตร3','ชิดลม3','2022-05-29 08:52:03','2022-05-29 08:52:03','@prawit4','คุณ','f4757532-ba51-4df4-b361-5f511d35c902','member','N',NULL,NULL),('MB28013','000','M','S','prawit5@gmail.com','1986-11-11','2032-05-29',0.00,'0810000005','2032-05-29',10,'Y','ประวิตร3','ชิดลม3','2022-05-29 08:53:48','2022-05-29 08:53:48','@prawit5','คุณ','3a720e9f-5e27-47aa-8f5f-b8e415357a25','member','N',NULL,NULL),('MB28014','000','M','S','prawit6@gmail.com','1986-11-11','2032-05-29',0.00,'0810000006','2032-05-29',10,'Y','ประวิตร3','ชิดลม3','2022-05-29 08:55:32','2022-05-29 08:55:32','@prawit6','คุณ','b234cff4-7469-4094-ab8b-c457fc85f963','member','N',NULL,NULL),('MB28015','000','M','S','prawit7@gmail.com','1986-11-11','2032-05-29',0.00,'0810000007','2032-05-29',10,'Y','ประวิตร3','ชิดลม3','2022-05-29 08:57:06','2022-05-29 08:57:06','@prawit7','คุณ','96e4ae28-8ce2-44b9-87ed-532cd90844c3','member','N',NULL,NULL),('MB28016','000','M','S','prawit8@gmail.com','1986-11-11','2032-05-29',0.00,'0810000008','2032-05-29',10,'Y','ประวิตร3','ชิดลม3','2022-05-29 08:58:30','2022-05-29 08:58:30','@prawit8','คุณ','f8c45bcc-6d9f-4b41-a678-b494e88a73e6','member','N',NULL,NULL),('MB28017','000','M','S','prawit9@gmail.com','1986-11-11','2032-05-29',0.00,'0810000009','2032-05-29',10,'Y','ประวิตร3','ชิดลม3','2022-05-29 09:02:25','2022-05-29 09:02:25','@prawit9','คุณ','e480c359-8699-4273-a688-27a32722de5a','member','N',NULL,NULL),('MB28018','000','M','S','prawit10@gmail.com','1986-11-11','2032-05-29',0.00,'0810000010','2032-05-29',10,'Y','ประวิตร3','ชิดลม3','2022-05-29 09:09:37','2022-05-29 09:09:37','@prawit10','คุณ','b62dcc91-4d80-4d7e-bdb7-5ea0b626b95e','member','N',NULL,NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redeem`
--

DROP TABLE IF EXISTS `redeem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `redeem` (
  `uuid_index` varchar(36) NOT NULL,
  `redeem_code` varchar(30) DEFAULT NULL COMMENT 'รหัส qr code',
  `product_code` varchar(20) DEFAULT NULL COMMENT 'รหัสสินค้า',
  `point_to_redeem` int(10) DEFAULT NULL COMMENT 'แต้มที่ลด',
  `use_in_branch` varchar(30) DEFAULT NULL COMMENT 'สาขาที่ไปใช้',
  `emp_code_redeem` varchar(30) DEFAULT NULL COMMENT 'รหัสพนักงาน',
  `member_code_use` varchar(30) DEFAULT NULL COMMENT 'รหัสสมาชิก',
  `qty_in_use` int(3) DEFAULT NULL COMMENT 'จำนวนที่ใช้',
  `system_create` datetime DEFAULT NULL COMMENT 'วันที่สร้าง',
  `redeem_date` datetime DEFAULT NULL COMMENT 'วันที่นำไปใช้',
  `in_time` datetime DEFAULT NULL COMMENT 'ใช้ภายในระยะเวลา',
  `status_use` varchar(20) DEFAULT NULL COMMENT 'คำอธิบาย สถานะ',
  `active` varchar(1) DEFAULT NULL COMMENT 'flag  active',
  `redeem_name` varchar(250) DEFAULT NULL COMMENT 'ชื่อการใช้งาน',
  `bill_no` varchar(100) DEFAULT NULL COMMENT 'เลขที่เอกสาร',
  `discount_amt` float(10,2) DEFAULT NULL COMMENT 'จำนวนเงินที่ลด',
  `discount_percent` float(5,2) DEFAULT NULL COMMENT 'จำนวนเงินที่ลด เปอร์เซ็นต์',
  `redeem_or_free` char(1) DEFAULT NULL COMMENT 'ประเภท ลด(R) หรือแถม(F)',
  `data_sync` char(1) DEFAULT 'N' COMMENT 'ดึงข้อมูลไป local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redeem`
--

LOCK TABLES `redeem` WRITE;
/*!40000 ALTER TABLE `redeem` DISABLE KEYS */;
/*!40000 ALTER TABLE `redeem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-29 16:39:14
