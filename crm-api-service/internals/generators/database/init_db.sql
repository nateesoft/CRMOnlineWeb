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
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(5) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `code_no` varchar(100) DEFAULT NULL,
  `postfix` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`code`)
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
  `add_money2` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
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
  `cart_no` varchar(100) NOT NULL,
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
  `distance` double(5,2) DEFAULT NULL,
  PRIMARY KEY (`cart_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `carts_detail` WRITE;
/*!40000 ALTER TABLE `carts_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(100) NOT NULL,
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
  `img_path` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
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
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('Y','admin@webdaily.io','UEBzc3cwcmQ='),('Y','employee@webdaily.io','UEBzc3cwcmQ='),('Y','member@webdaily.io','UEBzc3cwcmQ='),('Y','super@webdaily.io','UEBzc3cwcmQ=');
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
  `member_code_ref` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('MB00000','000','M','S','super@webdaily.io','1980-09-08','2030-09-23',55.00,'0800000001','2030-09-23',10,'Y','super','user','2020-09-23 21:28:46','2020-10-21 05:42:48','@super','คุณ','ff3a447d-d10f-45a4-978b-bde5fa052123','super','N',NULL,NULL),('MB00001','000','M','S','member@webdaily.io','1986-09-18','2032-05-28',120.00,'0800000002','2032-05-28',20,'Y','member','user','2022-05-28 22:47:08','2022-05-28 22:47:08','@member','คุณ','b31bdc5b-7515-4de2-87c0-312d691f7d3e','member','N',NULL,NULL),('MB00002','000','M','S','employee@webdaily.io','1984-06-06','2032-05-28',0.00,'0800000003','2032-05-28',0,'Y','employee','user','2022-05-28 22:49:59','2022-05-28 22:49:59','@employee','คุณ','9fe73b56-6f89-416a-835d-cc68dfe1e5dc','employee','N',NULL,NULL),('MB00003','000','M','S','admin@webdaily.io','1991-11-11','2032-05-28',0.00,'0800000004','2032-05-28',0,'Y','admin','user','2022-05-28 22:54:10','2022-05-28 22:54:10','@admin','คุณ','298e5d8f-d5e0-435a-87d4-ee769affa50f','admin','N',NULL,NULL);
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
  `member_prefix` varchar(100) DEFAULT NULL,
  `branch_shipping` varchar(10) DEFAULT NULL
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
  `order_no` varchar(100) NOT NULL,
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
  `total_transport_amt` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`order_no`)
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
  `code` varchar(20) NOT NULL,
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
  `qty_over_stock` varchar(1) DEFAULT 'N',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
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
  `code` varchar(5) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`code`)
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
  `redeem_code` varchar(30) NOT NULL COMMENT 'รหัส qr code',
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
  `data_sync` char(1) DEFAULT 'N' COMMENT 'ดึงข้อมูลไป local',
  PRIMARY KEY (`redeem_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redeem`
--

LOCK TABLES `redeem` WRITE;
/*!40000 ALTER TABLE `redeem` DISABLE KEYS */;
/*!40000 ALTER TABLE `redeem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `desc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('37175ceb-220b-4dc1-9284-d220a792f395','admin','Admin','Administrator'),('80bb217f-dd9e-4773-8023-eb13022507ae','employee','Employee','Employee to manage branch'),('d628fcbd-717a-4a0d-a842-537fe5b334a6','member','Member','Member register to branch'),('c8b12dc4-28ad-4cfb-81eb-6317a140c949','super','Super Admin','Super Adminitrator');
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
INSERT INTO `roles_mapping` VALUES ('super','/home/dashboard'),('admin','/home/dashboard'),('admin','/home/profile'),('admin','/home/tracking'),('admin','/home/check_carts'),('admin','/home/members'),('admin','/home/use_promotion'),('admin','/home/ms_company'),('admin','/home/ms_branch'),('admin','/home/ms_product'),('admin','/home/ms_stock'),('admin','/home/ms_promotion'),('member','/home/dashboard'),('member','/home/profile'),('member','/home/shopping'),('member','/home/tracking'),('employee','/home/dashboard'),('employee','/home/profile'),('employee','/home/check_carts'),('member','/home/check_carts'),('super','/home/profile'),('super','/home/shopping'),('super','/home/tracking'),('super','/home/check_carts'),('super','/home/members'),('super','/home/use_promotion'),('super','/home/ms_role'),('super','/home/database_config'),('super','/home/ms_company'),('super','/home/ms_branch'),('super','/home/ms_product'),('super','/home/ms_stock'),('super','/home/ms_promotion'),('member','/home/profile-change-pwd'),('member','/home/profile-edit'),('member','/home/profile-shipping'),('member','/order_confirm'),('employee','/home/profile-change-pwd'),('admin','/home/profile-change-pwd'),('super','/home/profile-change-pwd'),('employee','/home/profile-edit'),('admin','/home/profile-edit'),('super','/home/profile-edit'),('employee','/home/profile-shipping'),('admin','/home/profile-shipping'),('super','/home/profile-shipping'),('employee','/home/checkout-orders'),('admin','/home/checkout-orders'),('super','/home/checkout-orders'),('employee','/home/order_confirm'),('admin','/home/order_confirm'),('super','/order_confirm'),('super','/home/ms_group'),('admin','/home/shopping');
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
  `code` varchar(5) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`code`)
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
INSERT INTO `ui_menu_list` VALUES ('Overview','Account','CardGiftcardIcon','/home/dashboard','Y'),('Profile','Account','RecentActorsIcon','/home/profile','Y'),('Shopping','Orders','LocalMallIcon','/home/shopping','Y'),('TrackOrder','Orders','LocalMallIcon','/home/tracking','Y'),('CheckCartList','RequestOrder','LocalMallIcon','/home/check_carts','Y'),('MemberList','Members','PeopleIcon','/home/members','Y'),('UsePromotion','Members','PeopleIcon','/home/use_promotion','Y'),('Roles','Settings','LockIcon','/home/ms_role','Y'),('Database','Settings','DnsRoundedIcon','/home/database_config','Y'),('Company','Master','DnsRoundedIcon','/home/ms_company','Y'),('Branch','Master','DnsRoundedIcon','/home/ms_branch','Y'),('Product','Master','DnsRoundedIcon','/home/ms_product','Y'),('Stock','Master','DnsRoundedIcon','/home/ms_stock','Y'),('Promotion','Master','DnsRoundedIcon','/home/ms_promotion','Y'),('ProductGroup','Master','DnsRoundedIcon','/home/ms_group','Y');
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

-- Dump completed on 2022-06-13  9:12:44
