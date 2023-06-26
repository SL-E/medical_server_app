SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `account` char(16) NOT NULL,
  `password` char(16) NULL DEFAULT NULL,
  `name` char(16) NULL DEFAULT NULL,
  PRIMARY KEY (`account`) USING BTREE
) ENGINE = InnoDB ;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('admin', 'admin', 'Administrator');

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply`  (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `did` int(11) NULL DEFAULT NULL COMMENT 'Doctor id',
  `dname` char(16) NULL DEFAULT NULL,
  `wid` int(11) NULL DEFAULT NULL,
  `reason` char(32) NULL DEFAULT NULL COMMENT 'reason',
  `request` char(8) NULL DEFAULT NULL COMMENT 'Status: Request for working, Request for suspension',
  `state` char(8) NULL DEFAULT NULL COMMENT 'Status: Pending, Agreed, Rejected',
  PRIMARY KEY (`aid`) USING BTREE,
  INDEX `wid`(`wid`) USING BTREE,
  INDEX `did`(`did`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 ;

-- ----------------------------
-- Table structure for doctor
-- ----------------------------
DROP TABLE IF EXISTS `doctor`;
CREATE TABLE `doctor`  (
  `did` int(11) NOT NULL AUTO_INCREMENT,
  `account` char(16) NULL DEFAULT NULL,
  `password` char(16) NULL DEFAULT NULL,
  `dname` char(16) NULL DEFAULT NULL,
  `gender` char(2) NULL DEFAULT NULL,
  `age` tinyint(4) NULL DEFAULT NULL,
  `office` char(16) NULL DEFAULT NULL,
  `room` char(16) NULL DEFAULT NULL,
  `career` char(8) NULL DEFAULT NULL,
  `description` varchar(255) NULL DEFAULT NULL,
  `picpath` varchar(64) NULL DEFAULT NULL,
  PRIMARY KEY (`did`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 ;

-- ----------------------------
-- Table structure for integrity
-- ----------------------------
DROP TABLE IF EXISTS `integrity`;
CREATE TABLE `integrity`  (
  `integrityid` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NULL DEFAULT NULL COMMENT 'patient id',
  `dname` char(16) NULL DEFAULT NULL COMMENT 'Doctor Name',
  `time` datetime(0) NULL DEFAULT NULL COMMENT 'Good faith record time',
  `reason` char(32) NULL DEFAULT NULL COMMENT 'reason',
  `score` tinyint(4) NULL DEFAULT NULL COMMENT 'score',
  PRIMARY KEY (`integrityid`) USING BTREE,
  INDEX `pid`(`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 ;

-- ----------------------------
-- Table structure for Patient
-- ----------------------------
DROP TABLE IF EXISTS `patient`;
CREATE TABLE `patient`  (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `account` char(16) NULL DEFAULT NULL,
  `email` char(32) NULL DEFAULT NULL,
  `phone` char(32) NULL DEFAULT NULL,
  `password` char(32) NULL DEFAULT NULL,
  `gender` char(16) NULL DEFAULT NULL,
  `age` tinyint(4) NULL DEFAULT NULL,
  `firstname` char(16) NULL DEFAULT NULL,
  `lastname` char(16) NULL DEFAULT NULL,
  `integrity` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 ;

-- ----------------------------
-- Table structure for Hospital & Clinic
-- ----------------------------
DROP TABLE IF EXISTS `hospitalclinic`;
CREATE TABLE `hospitalclinic`  (
'hospitalID' INT(4) NOT NULL COMMENT 'HospitalID',
'hospitalName' CHAR(2) NOT NULL COMMENT 'Hospital Name',
'hospitalAddress' CHAR(2) NOT NULL COMMENT 'HospitalAddress',
'dean' CHAR(2) NOT NULL COMMENT 'Dean',
'phone' CHAR(4) COMMENT 'phone',
  PRIMARY KEY (`hospitalID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 ;

-- ----------------------------
-- Table structure for Pharmacy
-- ----------------------------
DROP TABLE IF EXISTS `pharmacy`;
CREATE TABLE `pharmacy`  (
'pharmacyID' INT(4) NOT NULL COMMENT 'pharmacyID',
'pharmacyName' CHAR(2) NOT NULL COMMENT 'pharmacyName',
'pharmacyAddress' CHAR(2) NOT NULL COMMENT 'pharmacyAddress',
'phone' CHAR(4) COMMENT 'phone',
PRIMARY KEY (`pharmacyID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 ;

-- ----------------------------
-- Table structure for medicines
-- ----------------------------
DROP TABLE IF EXISTS `medicineCategory`;
CREATE TABLE medicineCategory(
'typeID' INT(4) PRIMARY KEY COMMENT 'medicine type ID',
'typeName' CHAR(2) COMMENT 'type Name'
)ENGINE = InnoDB AUTO_INCREMENT = 10 ;

DROP TABLE IF EXISTS `medicine`;
CREATE TABLE `medicine`  (
'medicineID' INT(4) PRIMARY KEY COMMENT 'medicine ID',
'typeID' INT(4) NOT NULL COMMENT 'medicine type ID',
'medicineName' CHAR(2) NOT NULL COMMENT 'medicine Name',
'univalence' DOUBLE COMMENT 'univalence',
'specification' CHAR(2) COMMENT 'specification',
'inventory' FLOAT COMMENT 'inventory',
PRIMARY KEY (`medicineID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 ;

-- ----------------------------
-- Table structure for recode
-- ----------------------------
DROP TABLE IF EXISTS `recode`;
CREATE TABLE `recode`  (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NULL DEFAULT NULL COMMENT 'patient id',
  `wid` int(11) NULL DEFAULT NULL COMMENT 'workday id',
  `did` int(11) NULL DEFAULT NULL COMMENT 'doctor id',
  `visitdate` date NULL DEFAULT NULL COMMENT 'treatment date',
  `visitnoon` char(4) NULL DEFAULT NULL COMMENT 'Visit in the morning or afternoon',
  `visittime` time(0) NULL DEFAULT NULL COMMENT 'treatment time',
  `ordertime` datetime(0) NULL DEFAULT NULL COMMENT 'Time of appointment record',
  `state` char(8) NULL DEFAULT NULL COMMENT 'Appointment status: Successful, Cancelled, Completed, Break',
  PRIMARY KEY (`rid`) USING BTREE,
  INDEX `pid`(`pid`) USING BTREE,
  INDEX `did`(`did`) USING BTREE,
  INDEX `wid`(`wid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 ;

-- ----------------------------
-- Table structure for workday
-- ----------------------------
DROP TABLE IF EXISTS `workday`;
CREATE TABLE `workday`  (
  `wid` int(11) NOT NULL AUTO_INCREMENT,
  `did` int(11) NULL DEFAULT NULL COMMENT 'doctor id',
  `worktime` char(4) NULL DEFAULT NULL COMMENT 'Doctor's workday of the week',
  `ampm` char(4) NULL DEFAULT NULL COMMENT 'Doctor's workday morning or afternoon',
  `state` char(8) NULL DEFAULT NULL COMMENT 'Status: full, appointment, rest',
  PRIMARY KEY (`wid`) USING BTREE,
  INDEX `did`(`did`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 365 ;

-- ----------------------------
-- Procedure structure for agreeApply
-- ----------------------------
DROP PROCEDURE IF EXISTS `agreeApply`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `agreeApply`(in s int,in aid1 int)
BEGIN
      declare s1 char(32);
      declare wid1 int;
      set s1 = (select request from apply where aid=aid1);
      set wid1 = (select wid from apply where aid=aid1);
      if 'Request for working'=s1 then
        update workday set state='make an appointment',nsnum=s where wid=wid1;
      end if;
      if 'Request for suspension'=s1 then
        update workday set state='suspend medical service',nsnum=0 where wid=wid1;
      end if;
      update apply set state='agree' where aid=aid1;
    END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for orderList
-- ----------------------------
DROP PROCEDURE IF EXISTS `orderList`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `orderList`(in pid int)
BEGIN
      select recode.rid,recode.pid,recode.wid,recode.did,recode.serialnumber,recode.visitdate,recode.visitnoon,recode.visittime,recode.ordertime,recode.state,
      doctor.dname,doctor.office,doctor.room,doctor.picpath,doctor.fee
      from recode,doctor
      where recode.pid=pid  and doctor.did=recode.did
      order by recode.ordertime desc;
    END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;