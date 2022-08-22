-- bank definition

CREATE TABLE `bank` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(5) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `code_no` varchar(100) DEFAULT NULL,
  `postfix` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- branch definition

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


-- carts definition

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


-- carts_detail definition

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


-- company definition

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


-- login definition

CREATE TABLE `login` (
  `member_active` char(1) NOT NULL DEFAULT 'Y',
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- `member` definition

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


-- member_shipping definition

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


-- monitor_app definition

CREATE TABLE `monitor_app` (
  `branch_code` varchar(100) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `system_create` datetime DEFAULT NULL,
  `system_update` datetime DEFAULT NULL,
  `staus_open` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- orders definition

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


-- orders_detail definition

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


-- product definition

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


-- product_group definition

CREATE TABLE `product_group` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(5) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- promotion definition

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


-- redeem definition

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


-- roles definition

CREATE TABLE `roles` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `desc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- roles_mapping definition

CREATE TABLE `roles_mapping` (
  `role_code` varchar(100) DEFAULT NULL,
  `app_path` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- stock definition

CREATE TABLE `stock` (
  `uuid_index` varchar(36) NOT NULL,
  `code` varchar(5) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- stock_product definition

CREATE TABLE `stock_product` (
  `uuid_index` varchar(36) NOT NULL,
  `stock_code` varchar(5) DEFAULT NULL,
  `product_code` varchar(20) DEFAULT NULL,
  `in_stock` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- sytem_config definition

CREATE TABLE `sytem_config` (
  `index_uuid` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ui_menu definition

CREATE TABLE `ui_menu` (
  `id` varchar(50) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT '',
  `priority` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ui_menu_list definition

CREATE TABLE `ui_menu_list` (
  `id` varchar(30) DEFAULT NULL,
  `menu_id` varchar(30) DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `to_path` varchar(100) DEFAULT NULL,
  `active` char(1) NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO login (member_active,username,password) VALUES
	 ('Y','super@webdaily.io','UEBzc3cwcmQ=');
INSERT into `member` (code,company_code,gender,status,email,birthday,expired_date,total_purchase,mobile,point_expired_date,total_score,active,first_name,last_name,system_created,system_updated,line_id,prefix,uuid_index,member_role,data_sync,line_user_id,member_code_ref) VALUES
	 ('MB99990','000','M','S','super@webdaily.io','1980-09-08','2030-09-23',5.0,'0800000001','2030-09-23',100.0,'Y','Admin','ผู้ดูแลระบบ','2020-09-23 21:28:46.0','2022-07-08 14:21:17.0','@super','คุณ','ff3a447d-d10f-45a4-978b-bde5fa052123','super','N',NULL,NULL);
INSERT into roles (uuid_index,code,name,`desc`) VALUES
	 ('37175ceb-220b-4dc1-9284-d220a792f395','admin','Admin','Administrator'),
	 ('80bb217f-dd9e-4773-8023-eb13022507ae','employee','Employee','Employee to manage branch'),
	 ('d628fcbd-717a-4a0d-a842-537fe5b334a6','member','Member','Member register to branch'),
	 ('c8b12dc4-28ad-4cfb-81eb-6317a140c949','super','Super Admin','Super Adminitrator');
INSERT INTO roles_mapping (role_code,app_path) VALUES
	 ('super','/home/dashboard'),
	 ('admin','/home/dashboard'),
	 ('admin','/home/profile'),
	 ('admin','/home/tracking'),
	 ('admin','/home/check_carts'),
	 ('admin','/home/members'),
	 ('admin','/home/use_promotion'),
	 ('admin','/home/ms_company'),
	 ('admin','/home/ms_branch'),
	 ('admin','/home/ms_product');
INSERT INTO roles_mapping (role_code,app_path) VALUES
	 ('admin','/home/ms_stock'),
	 ('admin','/home/ms_promotion'),
	 ('member','/home/dashboard'),
	 ('member','/home/profile'),
	 ('member','/home/shopping'),
	 ('member','/home/tracking'),
	 ('employee','/home/dashboard'),
	 ('employee','/home/check_carts'),
	 ('member','/home/check_carts'),
	 ('super','/home/profile');
INSERT INTO roles_mapping (role_code,app_path) VALUES
	 ('super','/home/shopping'),
	 ('super','/home/tracking'),
	 ('super','/home/check_carts'),
	 ('super','/home/members'),
	 ('super','/home/use_promotion'),
	 ('super','/home/ms_role'),
	 ('super','/home/database_config'),
	 ('super','/home/ms_company'),
	 ('super','/home/ms_branch'),
	 ('super','/home/ms_product');
INSERT INTO roles_mapping (role_code,app_path) VALUES
	 ('super','/home/ms_stock'),
	 ('super','/home/ms_promotion'),
	 ('member','/home/profile-change-pwd'),
	 ('member','/home/profile-edit'),
	 ('member','/home/profile-shipping'),
	 ('member','/order_confirm'),
	 ('employee','/home/profile-change-pwd'),
	 ('admin','/home/profile-change-pwd'),
	 ('super','/home/profile-change-pwd'),
	 ('employee','/home/profile-edit');
INSERT INTO roles_mapping (role_code,app_path) VALUES
	 ('admin','/home/profile-edit'),
	 ('super','/home/profile-edit'),
	 ('employee','/home/profile-shipping'),
	 ('admin','/home/profile-shipping'),
	 ('super','/home/profile-shipping'),
	 ('employee','/home/checkout-orders'),
	 ('admin','/home/checkout-orders'),
	 ('super','/home/checkout-orders'),
	 ('employee','/home/order_confirm'),
	 ('admin','/home/order_confirm');
INSERT INTO roles_mapping (role_code,app_path) VALUES
	 ('super','/order_confirm'),
	 ('super','/home/ms_group'),
	 ('admin','/home/shopping'),
	 ('member','/home/checkout-orders'),
	 ('employee','/home/dashboard');
INSERT INTO ui_menu (id,`role`,priority) VALUES
	 ('Account','super|admin|member|employee',1),
	 ('Orders','super|admin|member',2),
	 ('RequestOrder','super|admin|employee',3),
	 ('Members','super|admin',4),
	 ('Settings','super',5),
	 ('Master','super|admin',6);
INSERT INTO ui_menu_list (id,menu_id,icon,to_path,active) VALUES
	 ('Overview','Account','CardGiftcardIcon','/home/dashboard','Y'),
	 ('Profile','Account','RecentActorsIcon','/home/profile','Y'),
	 ('Shopping','Orders','LocalMallIcon','/home/shopping','Y'),
	 ('TrackOrder','Orders','LocalMallIcon','/home/tracking','Y'),
	 ('CheckCartList','RequestOrder','LocalMallIcon','/home/check_carts','Y'),
	 ('MemberList','Members','PeopleIcon','/home/members','Y'),
	 ('UsePromotion','Members','PeopleIcon','/home/use_promotion','Y'),
	 ('Roles','Settings','LockIcon','/home/ms_role','Y'),
	 ('Database','Settings','DnsRoundedIcon','/home/database_config','Y'),
	 ('Company','Master','DnsRoundedIcon','/home/ms_company','Y');
INSERT INTO ui_menu_list (id,menu_id,icon,to_path,active) VALUES
	 ('Branch','Master','DnsRoundedIcon','/home/ms_branch','Y'),
	 ('Product','Master','DnsRoundedIcon','/home/ms_product','Y'),
	 ('Stock','Master','DnsRoundedIcon','/home/ms_stock','Y'),
	 ('Promotion','Master','DnsRoundedIcon','/home/ms_promotion','Y'),
	 ('ProductGroup','Master','DnsRoundedIcon','/home/ms_group','Y');
