-- MySQL dump 10.13  Distrib 5.7.37, for Linux (x86_64)
--
-- Host: localhost    Database: pankhamhom
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
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(5) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `code_no` varchar(100) DEFAULT NULL,
  `postfix` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank`
--

LOCK TABLES `bank` WRITE;
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `map_latitude` varchar(100) DEFAULT NULL,
  `map_longitude` varchar(100) DEFAULT NULL,
  `mapping_direction_length1` varchar(10) DEFAULT NULL,
  `mapping_direction_length2` varchar(10) DEFAULT NULL,
  `mapping_direction_length3` varchar(10) DEFAULT NULL,
  `mapping_type1` varchar(1) DEFAULT NULL,
  `mapping_type2` varchar(1) DEFAULT NULL,
  `mapping_type3` varchar(1) DEFAULT NULL,
  `mapping_baht1` int(3) DEFAULT NULL,
  `mapping_baht2` int(2) DEFAULT NULL,
  `mapping_baht3` int(3) DEFAULT NULL,
  `mapping_bill_amt1` varchar(20) DEFAULT NULL,
  `mapping_bill_amt2` varchar(20) DEFAULT NULL,
  `bill_type1` varchar(1) DEFAULT NULL,
  `bill_type2` varchar(1) DEFAULT NULL,
  `add_money1` double(10,2) DEFAULT NULL,
  `add_money2` double(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES ('3368a2dc-2f86-43ec-b7c5-c6ba0b40208c','001','ปั้นคำหอมสาขาบ้านโป่ง','13.816444517882292','99.87614035606384',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `uuid_index` varchar(36) NOT NULL,
  `cart_no` varchar(100) DEFAULT NULL,
  `cart_create_date` datetime DEFAULT NULL,
  `member_code` varchar(20) DEFAULT NULL,
  `total_item` int(5) DEFAULT NULL,
  `total_amount` float(10,2) DEFAULT NULL,
  `cart_active` char(1) DEFAULT NULL,
  `shopping_step` varchar(20) DEFAULT NULL,
  `total_point` int(5) DEFAULT NULL,
  `emp_code_update` varchar(30) DEFAULT NULL,
  `emp_reason` varchar(100) DEFAULT NULL,
  `account_from_name` varchar(150) DEFAULT NULL,
  `account_to_name` varchar(150) DEFAULT NULL,
  `from_account_no` varchar(30) DEFAULT NULL,
  `to_account_no` varchar(30) DEFAULT NULL,
  `transfer_date` varchar(20) DEFAULT NULL,
  `transfer_ref` varchar(10) DEFAULT NULL,
  `transfer_amount` float(10,2) DEFAULT NULL,
  `slip_path` varchar(100) DEFAULT NULL,
  `emp_update_date` datetime DEFAULT NULL,
  `branch_shipping` varchar(10) DEFAULT NULL,
  `total_transport_amt` double(10,2) DEFAULT NULL,
  `total_net_amt` double(10,2) DEFAULT NULL,
  `distance` double(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

-- LOCK TABLES `carts` WRITE;
-- /*!40000 ALTER TABLE `carts` DISABLE KEYS */;
-- INSERT INTO `carts` VALUES ('d367f65e-b0c8-41f3-b91e-c3356951aeb5','SP00001','2021-04-12 13:54:45','MB00002',4,0.00,'Y','wait_confirm',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
-- /*!40000 ALTER TABLE `carts` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `carts_detail`
--

DROP TABLE IF EXISTS `carts_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts_detail` (
  `uuid_index` varchar(36) NOT NULL,
  `cart_no` varchar(100) DEFAULT NULL,
  `product_code` varchar(20) DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `product_price` float DEFAULT NULL,
  `product_unit` varchar(100) DEFAULT NULL,
  `qty` int(3) DEFAULT NULL,
  `total_amount` float(10,2) DEFAULT NULL,
  `options` varchar(100) DEFAULT NULL,
  `special_text` varchar(100) DEFAULT NULL,
  `point` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts_detail`
--

-- LOCK TABLES `carts_detail` WRITE;
-- /*!40000 ALTER TABLE `carts_detail` DISABLE KEYS */;
-- INSERT INTO `carts_detail` VALUES ('139d4570-c530-4f42-95c8-092db4868746','SP00001','T001','สินค้าทดสอบ',0,'ชิ้น',4,0.00,'','ทดสอบ',0);
-- /*!40000 ALTER TABLE `carts_detail` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `line_official_id` varchar(100) DEFAULT NULL,
  `member_running` int(5) DEFAULT NULL,
  `prefix_running` varchar(3) DEFAULT NULL,
  `size_running` int(10) DEFAULT NULL,
  `order_running` int(5) DEFAULT NULL,
  `order_prefix` varchar(3) DEFAULT NULL,
  `order_size_running` int(10) DEFAULT NULL,
  `cart_running` int(5) DEFAULT NULL,
  `cart_prefix` varchar(3) DEFAULT NULL,
  `cart_size_running` int(10) DEFAULT NULL,
  `member_register_point` int(3) DEFAULT NULL,
  `img_path` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('3eeec383-0034-4213-bc93-e5e2ce608055','C001','PANKHAMHOM','@pankhamhom',28005,'MB',5,1,'OD',5,2,'SP',5,10,'/images/4ybVZRIL.jpg');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `member_active` char(1) NOT NULL DEFAULT 'Y',
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('Y','softpos@gmail.com','MTIzNDU2');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `member` VALUES ('MB00000','000','M','S','softpos@gmail.com','1980-09-08','2030-09-23',0.00,'0864108403','2030-09-23',100,'Y','Admin','ผู้ดูแลระบบ','2020-09-23 21:28:46','2020-10-21 05:42:48','softpos','คุณ','ff3a447d-d10f-45a4-978b-bde5fa052123','super','N',NULL,NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_shipping`
--

DROP TABLE IF EXISTS `member_shipping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_shipping` (
  `uuid_index` varchar(36) NOT NULL DEFAULT '',
  `map_latitude` varchar(50) DEFAULT NULL,
  `map_longitude` varchar(50) DEFAULT NULL,
  `member_code` varchar(20) DEFAULT NULL,
  `address_type` varchar(50) DEFAULT NULL,
  `member_name` varchar(100) DEFAULT NULL,
  `address1` varchar(200) DEFAULT NULL,
  `address2` varchar(200) DEFAULT NULL,
  `sub_district` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `postcode` varchar(100) DEFAULT NULL,
  `member_lastname` varchar(100) DEFAULT NULL,
  `member_prefix` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_shipping`
--

LOCK TABLES `member_shipping` WRITE;
/*!40000 ALTER TABLE `member_shipping` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_shipping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitor_app`
--

DROP TABLE IF EXISTS `monitor_app`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitor_app` (
  `branch_code` varchar(100) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `system_create` datetime DEFAULT NULL,
  `system_update` datetime DEFAULT NULL,
  `staus_open` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitor_app`
--

LOCK TABLES `monitor_app` WRITE;
/*!40000 ALTER TABLE `monitor_app` DISABLE KEYS */;
/*!40000 ALTER TABLE `monitor_app` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `uuid_index` varchar(36) NOT NULL,
  `order_no` varchar(100) DEFAULT NULL,
  `cart_no` varchar(100) DEFAULT NULL,
  `cart_create_date` datetime DEFAULT NULL,
  `member_code` varchar(20) DEFAULT NULL,
  `total_item` int(5) DEFAULT NULL,
  `total_amount` float(10,2) DEFAULT NULL,
  `cart_active` char(1) DEFAULT NULL,
  `shopping_step` varchar(20) DEFAULT NULL,
  `total_point` int(5) DEFAULT NULL,
  `emp_code_update` varchar(30) DEFAULT NULL,
  `emp_reason` varchar(100) DEFAULT NULL,
  `account_from_name` varchar(150) DEFAULT NULL,
  `account_to_name` varchar(150) DEFAULT NULL,
  `from_account_no` varchar(30) DEFAULT NULL,
  `to_account_no` varchar(30) DEFAULT NULL,
  `transfer_date` varchar(20) DEFAULT NULL,
  `transfer_ref` varchar(10) DEFAULT NULL,
  `transfer_amount` float(10,2) DEFAULT NULL,
  `slip_path` varchar(100) DEFAULT NULL,
  `emp_update_date` datetime DEFAULT NULL,
  `member_code_update` varchar(30) DEFAULT NULL,
  `member_remark` varchar(100) DEFAULT NULL,
  `order_update_date` datetime DEFAULT NULL,
  `order_create_date` datetime DEFAULT NULL,
  `order_status` varchar(50) DEFAULT NULL,
  `signature` longtext,
  `member_mobile` varchar(10) DEFAULT NULL,
  `branch_shipping` varchar(10) DEFAULT NULL,
  `total_net_amt` double(10,2) DEFAULT NULL,
  `distance` double(5,2) DEFAULT NULL,
  `total_transport_amt` double(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_detail`
--

DROP TABLE IF EXISTS `orders_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_detail` (
  `uuid_index` varchar(36) NOT NULL,
  `order_no` varchar(100) DEFAULT NULL,
  `product_code` varchar(20) DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `product_price` float DEFAULT NULL,
  `product_unit` varchar(100) DEFAULT NULL,
  `qty` int(3) DEFAULT NULL,
  `total_amount` float(10,2) DEFAULT NULL,
  `options` varchar(100) DEFAULT NULL,
  `special_text` varchar(100) DEFAULT NULL,
  `point` int(5) DEFAULT NULL,
  `cart_no` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_detail`
--

LOCK TABLES `orders_detail` WRITE;
/*!40000 ALTER TABLE `orders_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `unit_code_sale` varchar(10) DEFAULT NULL,
  `product_group_code` varchar(10) DEFAULT NULL,
  `img_path` varchar(250) DEFAULT NULL,
  `point` int(5) DEFAULT NULL,
  `stock_code` varchar(10) DEFAULT NULL,
  `price_e` float(10,2) DEFAULT NULL,
  `price_t` float(10,2) DEFAULT NULL,
  `price_d` float(10,2) DEFAULT NULL,
  `max_stock` int(5) DEFAULT NULL,
  `min_stock` int(5) DEFAULT NULL,
  `unit_code_stock` varchar(10) DEFAULT NULL,
  `qty_over_stock` varchar(1) DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('851842fc-5890-4529-9cb8-cdb0a4b9c1a2','T001','สินค้าทดสอบ','ชิ้น','ทดสอบ','',0,'ทดสอบ',0.00,0.00,0.00,99,9,'ชิ้น','0');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_group`
--

DROP TABLE IF EXISTS `product_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_group` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(5) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_group`
--

LOCK TABLES `product_group` WRITE;
/*!40000 ALTER TABLE `product_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promotion` (
  `uuid_index` varchar(36) NOT NULL,
  `product_code` varchar(100) DEFAULT NULL,
  `redeem_name` varchar(100) DEFAULT NULL,
  `point_to_redeem` int(10) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `finish_time` datetime DEFAULT NULL,
  `qty_in_stock` int(10) DEFAULT NULL,
  `img_path` varchar(200) DEFAULT NULL,
  `redeem_or_free` char(1) DEFAULT NULL,
  `discount_amt` float(10,2) DEFAULT NULL,
  `discount_percent` float(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES ('08ef5c04-56a1-4c92-ba1b-9a2f256599a3','P001','Discount 10%',10,'2020-12-03 00:00:00','2020-12-12 00:00:00',10,'/images/001.jpg','R',0.00,10.00);
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
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

-- LOCK TABLES `redeem` WRITE;
-- /*!40000 ALTER TABLE `redeem` DISABLE KEYS */;
-- INSERT INTO `redeem` VALUES ('8a3b2747-7d42-4514-b10c-4c7d71f8cdc7','06HF-217L-XC4K','P001',10,'','','MB00000',1,'2020-12-04 10:51:38',NULL,'2020-12-04 11:21:38','in_progress','Y','TestP001',NULL,10.00,0.00,'F','N'),('8d84c05c-3f52-44bf-87f2-7bf0626751b6','1WVJ-GT6X-YMPC','P001',10,'','','MB00000',1,'2020-12-04 10:55:59',NULL,'2020-12-04 11:25:59','in_progress','Y','TestP001',NULL,10.00,0.00,'F','N'),('e0e4f9e4-459c-45fe-8aab-7d0799122bf7','6BYU-17EV-URQ9','P001',10,'','','MB00000',1,'2020-12-04 10:58:17',NULL,'2020-12-04 11:28:17','in_progress','Y','TestP001',NULL,10.00,0.00,'F','N'),('0d51acbb-c71f-414e-9061-b91ca20ae3cb','0GKM-8109-XQ72','P001',10,'','','MB00006',1,'2020-12-04 11:50:47',NULL,'2020-12-04 12:20:47','in_progress','Y','TestP001',NULL,10.00,0.00,'F','N'),('e3f9e013-eeb7-4d8b-8008-c9b491937316','25BX-UQQD-MV4K','P001',10,'','','MB00006',1,'2020-12-04 11:52:13',NULL,'2020-12-04 12:22:13','in_progress','Y','TestP001',NULL,10.00,0.00,'F','N'),('8083ba01-39c9-44f7-a6d7-8d8d5121aa9c','73E2-9CJ8-HXDH','P001',10,'','','MB00082',1,'2020-12-04 20:53:56',NULL,'2020-12-04 21:23:56','in_progress','Y','TestP001',NULL,0.00,10.00,'F','N'),('39e83e29-4d8d-4fcd-a891-359ed143490b','WCCN-16LF-72K4','P001',10,'','','MB00188',1,'2020-12-05 20:15:31',NULL,'2020-12-05 20:45:31','in_progress','Y','TestP001',NULL,0.00,10.00,'F','N'),('e715f676-c344-4198-afaa-52f8b72c44c0','6P07-5KN3-91CJ','P001',10,'','','MB00193',1,'2020-12-06 11:05:25',NULL,'2020-12-06 11:35:25','in_progress','Y','TestP001',NULL,0.00,10.00,'F','N'),('fcfa1c9c-5b3b-4b8c-9b7c-5ec5dcb79a53','FHCP-30N5-VMC3','P001',10,'','','MB00197',1,'2020-12-06 12:37:25',NULL,'2020-12-06 13:07:25','in_progress','Y','TestP001',NULL,0.00,10.00,'F','N'),('ab7aada6-12af-431e-9f1d-fa7c32c60c34','PX7N-TUE9-8E3K','P001',10,'','','MB00197',1,'2020-12-06 12:43:20',NULL,'2020-12-06 13:13:20','in_progress','Y','TestP001',NULL,0.00,10.00,'F','N'),('df2ac65f-2fb5-418e-9008-64336b3091f9','9P49-Y280-91BH','P001',10,'','','MB00205',1,'2020-12-06 14:24:44',NULL,'2020-12-06 14:54:44','in_progress','Y','TestP001',NULL,0.00,10.00,'F','N'),('22c0e54e-cd82-4bda-aeeb-9a526433e873','P0GK-LLNC-LGH1','P001',10,'','','MB00211',1,'2020-12-06 15:13:54',NULL,'2020-12-06 15:43:54','in_progress','Y','TestP001',NULL,0.00,10.00,'F','N'),('4f77fb53-9943-4606-b90c-2285bb2a566a','W66T-RFRL-HY3T','P001',10,'','','MB00233',1,'2020-12-06 19:25:19',NULL,'2020-12-06 19:55:19','in_progress','Y','TestP001',NULL,0.00,10.00,'F','N'),('527aed58-3ec2-46f6-9316-12590939c331','4JYU-L6RV-P6U5','P001',10,'','','MB00124',1,'2020-12-07 05:36:46',NULL,'2020-12-07 06:06:46','in_progress','Y','TestP001',NULL,0.00,10.00,'F','N'),('6334b08b-2b62-450a-91be-f2f72ae239d4','3T9D-DJ64-BMQG','P001',10,'','','MB00124',1,'2020-12-07 05:37:16',NULL,'2020-12-07 06:07:16','in_progress','Y','TestP001',NULL,0.00,10.00,'F','N'),('00977405-ad49-4fc5-a7a6-3d343eb957a9','NHJE-RR54-5FGN','P001',10,'','','MB00000',1,'2020-12-07 15:01:44',NULL,'2020-12-07 15:31:44','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('7a2d103f-a3c9-4469-9a09-86f947f8a860','6H3L-UGD5-VVHH','P001',10,'','','MB00000',1,'2020-12-07 15:02:28',NULL,'2020-12-07 15:32:28','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('98f4f393-99e4-4151-8cff-3e90cb2fc111','DLRN-UY53-A2P6','P001',10,'','','MB00000',1,'2020-12-07 15:02:33',NULL,'2020-12-07 15:32:33','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('3ac66931-3357-46ab-a9f4-01246bdc413d','K6PW-FBJG-RVEG','P001',10,'','','MB00000',1,'2020-12-07 15:25:43',NULL,'2020-12-07 15:55:43','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('646f90cf-0c6b-4136-9865-1e61a152c399','UT6R-BAJA-AMEH','P001',10,'','','MB00024',1,'2020-12-07 15:37:17',NULL,'2020-12-07 16:07:17','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('afa3c49c-2cde-4967-86f8-3f66b72f0087','WM2V-7TYX-W4KH','P001',10,'','','MB00292',1,'2020-12-07 17:50:08',NULL,'2020-12-07 18:20:08','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('764a0cd3-6703-4034-a937-8799fe981192','K1W2-12P4-K31V','P001',10,'','','MB00294',1,'2020-12-07 17:56:41',NULL,'2020-12-07 18:26:41','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('ad38d116-4c9d-4191-bc36-1fd3666cf600','UK6G-TUWQ-K8QN','P001',10,'','','MB00294',1,'2020-12-07 17:57:03',NULL,'2020-12-07 18:27:03','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('0b7de6bb-98ee-4a6d-9387-9d699901a750','3Y6C-AYQP-KPCG','P001',10,'','','MB00298',1,'2020-12-07 18:56:27',NULL,'2020-12-07 19:26:27','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('221c1013-7487-4eed-88f9-f88d7c1a3dcd','2UY3-V2NG-2R8L','P001',10,'','','MB00304',1,'2020-12-07 19:28:24',NULL,'2020-12-07 19:58:24','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('30eaca22-7028-4081-b887-2fb34a575cbc','9PMT-XEAQ-GRT8','P001',10,'','','MB00307',1,'2020-12-07 19:41:42',NULL,'2020-12-07 20:11:42','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('7a7dbd25-117e-418f-be65-e28713a0a722','M5C8-JL8L-CDK3','P001',10,'','','MB00317',1,'2020-12-08 13:24:34',NULL,'2020-12-08 13:54:34','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('53a72cf6-08e0-454d-8abc-d31e00064cd7','GXED-3CQJ-WB5C','P001',10,'','','MB00321',1,'2020-12-08 14:18:42',NULL,'2020-12-08 14:48:42','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('b5f816ba-5cca-4454-b00f-f52d2852adcf','5FXL-Y0K4-XPMV','P001',10,'','','MB00327',1,'2020-12-08 15:38:58',NULL,'2020-12-08 16:08:58','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('09a12396-4b17-4b09-9e67-4e8a5f9b2f60','0BLL-0FE5-1RE6','P001',10,'','','MB00327',1,'2020-12-08 15:39:08',NULL,'2020-12-08 16:09:08','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('b5e443c9-3b13-4983-b635-b5f7945541eb','9WRL-CFR8-YBP8','P001',10,'','','MB00334',1,'2020-12-08 17:49:05',NULL,'2020-12-08 18:19:05','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('e629c8a0-7a0b-4abc-862f-21a65b51cc57','NXMG-VL94-FR0Q','P001',10,'','','MB00334',1,'2020-12-08 17:49:08',NULL,'2020-12-08 18:19:08','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('a113b78c-6e3b-4909-b47b-fb3ac5d855a3','8TM1-6Y3F-TYWF','P001',10,'','','MB00024',1,'2020-12-09 10:27:47',NULL,'2020-12-09 10:57:47','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('b11a107a-8767-4dea-9d79-7aa09be78a15','KLTK-1EA2-5GE8','P001',10,'','','MB00350',1,'2020-12-09 18:35:30',NULL,'2020-12-09 19:05:30','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('2ff9f9cf-1b53-45e1-ad6f-2793c1c7102f','49T6-QGKD-REP7','P001',10,'','','MB00351',1,'2020-12-09 18:38:34',NULL,'2020-12-09 19:08:34','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('4cefe966-344e-42d8-90ee-b07a71a53596','DXPQ-XGC2-4CB2','P001',10,'','','MB00352',1,'2020-12-09 19:02:14',NULL,'2020-12-09 19:32:14','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('7b9ac9a1-f586-4ab5-b412-4a93781ed3a7','FFV1-GQH3-TT2H','P001',10,'','','MB00353',1,'2020-12-09 19:13:40',NULL,'2020-12-09 19:43:40','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('c9ce055d-2389-4837-86df-a6b060623d65','RFXH-TGFJ-32LJ','P001',10,'','','MB00354',1,'2020-12-09 19:15:23',NULL,'2020-12-09 19:45:23','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('244a4cfa-ed5a-418a-8976-424c2885990b','0E72-MKPE-VLDG','P001',10,'','','MB00355',1,'2020-12-09 19:20:25',NULL,'2020-12-09 19:50:25','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('79c30adc-de3e-4485-9635-0fe36c423b3d','7WQA-DHW8-V6J3','P001',10,'','','MB00356',1,'2020-12-09 19:29:12',NULL,'2020-12-09 19:59:12','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('3b90d634-18bd-4166-88b8-25a95b1af2fd','R2L8-LRC4-YE8K','P001',10,'','','MB00357',1,'2020-12-09 19:30:33',NULL,'2020-12-09 20:00:33','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('e51b3175-3cdd-46f1-a72d-80e649ec2498','A5LD-9Q78-NNN5','P001',10,'','','MB00358',1,'2020-12-09 20:20:20',NULL,'2020-12-09 20:50:20','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('57c1fc62-ea75-46da-b02a-beb6e0ee1ef7','2M1E-KF87-UP4D','P001',10,'','','MB00359',1,'2020-12-09 21:21:44',NULL,'2020-12-09 21:51:44','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('cbfc1aa8-7f2a-406e-8d7f-96595f5825ab','PDDF-LWY6-AQEC','P001',10,'','','MB00360',1,'2020-12-09 21:25:07',NULL,'2020-12-09 21:55:07','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('38db5f68-4078-4e6c-a6ad-d9494619dc49','KKLR-3135-0ATP','P001',10,'','','MB00364',1,'2020-12-10 12:47:11',NULL,'2020-12-10 13:17:11','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('c5a84df5-6703-4a29-beb5-012bcf151df4','JD3W-B72X-EVLK','P001',10,'','','MB00366',1,'2020-12-10 13:39:42',NULL,'2020-12-10 14:09:42','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('abf99c95-71d2-433c-9423-ebb223b8d93c','LVGT-CM26-MU40','P001',10,'','','MB00374',1,'2020-12-10 16:20:34',NULL,'2020-12-10 16:50:34','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('052b5951-09ff-423f-9a1f-aa65be999828','QMH5-Q3XR-G6YQ','P001',10,'','','MB00375',1,'2020-12-10 16:48:33',NULL,'2020-12-10 17:18:33','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('699d2feb-5746-496f-885a-fadba907335d','BUA7-DF36-LF84','P001',10,'','','MB00388',1,'2020-12-10 21:13:39',NULL,'2020-12-10 21:43:39','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('68a6d3f3-2caf-47b1-b4fd-f4401e5b479f','PGTP-7ADJ-N8NJ','P001',10,'','','MB00000',1,'2020-12-11 11:22:08',NULL,'2020-12-11 11:52:08','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('decc7f3e-7d21-4829-a185-e162a68aa3db','WU5M-FACN-2PDJ','P001',10,'','','MB00000',1,'2020-12-11 11:22:31',NULL,'2020-12-11 11:52:31','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('3dca32f8-b37c-4ff2-a57a-c2193605afc0','5L7X-5254-K9J4','P001',10,'','','MB00015',1,'2020-12-11 11:59:35',NULL,'2020-12-11 12:29:35','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('71717a52-77c5-46f1-a7b8-74f34b736387','XKV5-L5H1-UQRN','P001',10,'','','MB00012',1,'2020-12-11 12:32:51',NULL,'2020-12-11 13:02:51','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('c4179374-7835-4aa8-9320-2442da0f7982','3DBG-DG7W-59CV','P001',10,'','','MB00012',1,'2020-12-11 12:33:52',NULL,'2020-12-11 13:03:52','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('3dc098b3-d3c5-43c2-b82b-bdaa762f2300','8P5M-QBG8-3YRG','P001',10,'','','MB00012',1,'2020-12-11 12:38:07',NULL,'2020-12-11 13:08:07','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('75b7b69a-0dc2-4567-a6ce-cd97724166e4','7222-QY11-K886','P001',10,'','','MB00012',1,'2020-12-11 12:40:50',NULL,'2020-12-11 13:10:50','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('fd6be227-f7b9-4156-bd60-3808b9470779','TV06-0G2C-GQRK','P001',10,'','','MB00091',1,'2020-12-11 19:59:37',NULL,'2020-12-11 20:29:37','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('ea6f2725-a4f4-4b08-a6f1-81cf8048879e','0XMA-MEMA-XQLF','P001',10,'','','MB00091',1,'2020-12-11 20:02:04',NULL,'2020-12-11 20:32:04','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('5da588f9-95db-47b0-92d1-bb08ae9293bf','2EFK-5MRD-BKEX','P001',10,'','','MB00416',1,'2020-12-12 13:25:24',NULL,'2020-12-12 13:55:24','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('bc5b73a6-f203-407f-b24b-448c7791e16e','4QUD-TEHD-DDQV','P001',10,'','','MB00262',1,'2020-12-12 15:33:11',NULL,'2020-12-12 16:03:11','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N'),('977df2b1-83ed-4bea-97e1-ac75be5b7abf','V9XR-5DND-JQ03','P001',10,'','','MB00262',1,'2020-12-12 15:36:20',NULL,'2020-12-12 16:06:20','in_progress','Y','Discount 10%',NULL,0.00,10.00,'F','N');
-- /*!40000 ALTER TABLE `redeem` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `desc` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('37175ceb-220b-4dc1-9284-d220a792f395','admin','Admin','Administrator'),('d628fcbd-717a-4a0d-a842-537fe5b334a6','member','Member','Member register to branch'),('80bb217f-dd9e-4773-8023-eb13022507ae','employee','Employee','Employee to manage branch'),('c8b12dc4-28ad-4cfb-81eb-6317a140c949','super','Super Admin','Super Adminitrator');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_mapping`
--

DROP TABLE IF EXISTS `roles_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles_mapping` (
  `role_code` varchar(100) DEFAULT NULL,
  `app_path` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_mapping`
--

LOCK TABLES `roles_mapping` WRITE;
/*!40000 ALTER TABLE `roles_mapping` DISABLE KEYS */;
INSERT INTO `roles_mapping` VALUES ('super','/dashboard'),('admin','/dashboard'),('admin','/profile'),('admin','/tracking'),('admin','/check_carts'),('admin','/members'),('admin','/use_promotion'),('admin','/ms_company'),('admin','/ms_branch'),('admin','/ms_product'),('admin','/ms_stock'),('admin','/ms_promotion'),('member','/dashboard'),('member','/profile'),('member','/shopping'),('member','/tracking'),('employee','/dashboard'),('employee','/profile'),('employee','/check_carts'),('member','/check_carts'),('super','/profile'),('super','/shopping'),('super','/tracking'),('super','/check_carts'),('super','/members'),('super','/use_promotion'),('super','/ms_role'),('super','/database_config'),('super','/ms_company'),('super','/ms_branch'),('super','/ms_product'),('super','/ms_stock'),('super','/ms_promotion'),('member','/profile-change-pwd'),('member','/profile-edit'),('member','/profile-shipping'),('member','/checkout-orders'),('member','/order_confirm'),('employee','/profile-change-pwd'),('admin','/profile-change-pwd'),('super','/profile-change-pwd'),('employee','/profile-edit'),('admin','/profile-edit'),('super','/profile-edit'),('employee','/profile-shipping'),('admin','/profile-shipping'),('super','/profile-shipping'),('employee','/checkout-orders'),('admin','/checkout-orders'),('super','/checkout-orders'),('employee','/order_confirm'),('admin','/order_confirm'),('super','/order_confirm'),('super','/ms_group');
/*!40000 ALTER TABLE `roles_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(5) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_product`
--

DROP TABLE IF EXISTS `stock_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_product` (
  `uuid_index` varchar(36) NOT NULL,
  `stock_code` varchar(5) DEFAULT NULL,
  `product_code` varchar(20) DEFAULT NULL,
  `in_stock` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_product`
--

LOCK TABLES `stock_product` WRITE;
/*!40000 ALTER TABLE `stock_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sytem_config`
--

DROP TABLE IF EXISTS `sytem_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sytem_config` (
  `index_uuid` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sytem_config`
--

LOCK TABLES `sytem_config` WRITE;
/*!40000 ALTER TABLE `sytem_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `sytem_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table_crud`
--

DROP TABLE IF EXISTS `table_crud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `table_crud` (
  `uuid_index` varchar(36) NOT NULL,
  `col1` varchar(100) DEFAULT NULL,
  `col2` varchar(100) DEFAULT NULL,
  `col3` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table_crud`
--

LOCK TABLES `table_crud` WRITE;
/*!40000 ALTER TABLE `table_crud` DISABLE KEYS */;
/*!40000 ALTER TABLE `table_crud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ui_menu`
--

DROP TABLE IF EXISTS `ui_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ui_menu` (
  `id` varchar(50) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT '',
  `priority` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ui_menu`
--

LOCK TABLES `ui_menu` WRITE;
/*!40000 ALTER TABLE `ui_menu` DISABLE KEYS */;
INSERT INTO `ui_menu` VALUES ('Account','super|admin|member|employee',1),('Orders','super|admin|member',2),('RequestOrder','super|admin|employee',3),('Members','super|admin',4),('Settings','super',5),('Master','super|admin',6);
/*!40000 ALTER TABLE `ui_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ui_menu_list`
--

DROP TABLE IF EXISTS `ui_menu_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ui_menu_list` (
  `id` varchar(30) DEFAULT NULL,
  `menu_id` varchar(30) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `to_path` varchar(100) DEFAULT NULL,
  `active` char(1) NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ui_menu_list`
--

LOCK TABLES `ui_menu_list` WRITE;
/*!40000 ALTER TABLE `ui_menu_list` DISABLE KEYS */;
INSERT INTO `ui_menu_list` VALUES ('Overview','Account','CardGiftcardIcon','/dashboard','Y'),('Profile','Account','RecentActorsIcon','/profile','N'),('Shopping','Orders','LocalMallIcon','/shopping','N'),('TrackOrder','Orders','LocalMallIcon','/tracking','N'),('CheckCartList','RequestOrder','LocalMallIcon','/check_carts','N'),('MemberList','Members','PeopleIcon','/members','N'),('UsePromotion','Members','PeopleIcon','/use_promotion','N'),('Roles','Settings','LockIcon','/ms_role','N'),('Database','Settings','DnsRoundedIcon','/database_config','N'),('Company','Master','DnsRoundedIcon','/ms_company','N'),('Branch','Master','DnsRoundedIcon','/ms_branch','N'),('Product','Master','DnsRoundedIcon','/ms_product','N'),('Stock','Master','DnsRoundedIcon','/ms_stock','N'),('Promotion','Master','DnsRoundedIcon','/ms_promotion','N'),('ProductGroup','Master','DnsRoundedIcon','/ms_group','N');
/*!40000 ALTER TABLE `ui_menu_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-26 22:45:58
