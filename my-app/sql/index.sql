SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `account` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NULL DEFAULT NULL,
  PRIMARY KEY (`account`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `user` VALUES ('user1', '123456');
INSERT INTO `user` VALUES ('holifa', '123');

-- ----------------------------
-- Table structure for hospital
-- ----------------------------
DROP TABLE IF EXISTS `hospital`;
CREATE TABLE `hospital`  (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `category` VARCHAR(255) NOT NULL,
  `location`VARCHAR(255) NOT NULL,
  `contact`VARCHAR(255) NOT NULL,
  `brief`VARCHAR(2000) NOT NULL,
  `lat`VARCHAR(200) NOT NULL,
  `lng`VARCHAR(200) NOT NULL
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
-- ----------------------------
-- Records of hospital
-- ----------------------------
INSERT INTO `hospital` VALUES (1, 'Alice Springs Hospital', 'Wellington', 'General Hospital', '788 Main Street, Hamilton, New Zealand', ' +64 123 456 789', 'Alice Springs  General Hospital is a leading medical facility offering a wide range of healthcare services. Our dedicated team of doctors and specialists provide comprehensive care for various medical conditions, from routine check-ups to complex surgeries.', '-41.2777436', '173.2625582');
INSERT INTO `hospital` VALUES (2, 'Sen Health Clinic', 'Auckland', 'General Hospital', '799 Main Street, Hamilton, New Zealand', ' +64 123 456 789', 'Sen Health Clinic General Hospital is a leading medical facility offering a wide range of healthcare services. Our dedicated team of doctors and specialists provide comprehensive care for various medical conditions, from routine check-ups to complex surgeries.', '-43.7981123', '172.3118612');
INSERT INTO `hospital` VALUES (3, 'Enrich Living Sercives', 'Christchurch', 'General Hospital', '788 Main Street, Hamilton, New Zealand', ' +64 123 456 789', 'Enrich Living Sercives General Hospital is a leading medical facility offering a wide range of healthcare services. Our dedicated team of doctors and specialists provide comprehensive care for various medical conditions, from routine check-ups to complex surgeries.', '-36.8534977', '174.7671608');
INSERT INTO `hospital` (`id`, `name`, `city`, `category`, `location`, `contact`, `brief`, `lat`, `lng`) VALUES 
(4, 'Hamilton General Hospital', 'Hamilton', 'General Hospital', '123 Main Street, Hamilton, New Zealand', '+64 123 456 789', 'Hamilton General Hospital is a leading medical facility offering a wide range of healthcare services. Our dedicated team of doctors and specialists provide comprehensive care for various medical conditions, from routine check-ups to complex surgeries.', '-45.0313363', '168.6616506'),
(5, 'Riverside Medical Center', 'Hamilton', 'Specialized Hospital', '456 Park Avenue, Hamilton, New Zealand', '+64 987 654 321', 'Riverside Medical Center is a specialized hospital focused on providing exceptional care in orthopedics and sports medicine. Our experienced surgeons and rehabilitation team are dedicated to helping patients recover from injuries and regain optimal mobility.', '-39.0475934', '174.0768923'),
(6, 'Harmony Women\'s Hospital', 'Hamilton', 'Women\'s Hospital', '789 Elm Street, Hamilton, New Zealand', '+64 456 789 012', 'Harmony Women\'s Hospital is a premier healthcare facility catering to the unique needs of women. Our compassionate team of gynecologists and obstetricians offers comprehensive care for women\'s reproductive health, including prenatal and postnatal services.', '-41.2841', '174.7789'),
(7, 'Hamilton Children\'s Medical Center', 'Hamilton', 'Pediatric Hospital', '234 Oak Avenue, Hamilton, New Zealand', '+64 321 654 987', 'Hamilton Children\'s Medical Center is dedicated to providing specialized care for infants, children, and adolescents. Our team of pediatricians and nurses deliver high-quality healthcare services, addressing a wide range of pediatric conditions with expertise and compassion.', '-36.9304', '174.8615'),
(8, 'Hamilton Mental Health Institute', 'Hamilton', 'Mental Health Hospital', '567 Maple Road, Hamilton, New Zealand', '+64 789 012 345', 'Hamilton Mental Health Institute is a leading facility specializing in mental health and psychiatric services. Our multidisciplinary team of psychiatrists, psychologists, and therapists offers personalized treatment for individuals facing mental health challenges.', '-43.5311', '172.6375'),
(9, 'Hamilton Cancer Treatment Center', 'Hamilton', 'Cancer Hospital', '890 Pine Lane, Hamilton, New Zealand', '+64 210 987 654', 'Hamilton Cancer Treatment Center is a state-of-the-art facility providing comprehensive care for cancer patients. Our team of oncologists and support staff are committed to delivering cutting-edge treatments and compassionate care, supporting patients throughout their cancer journey.', '-36.7784', '174.7162');


-- ----------------------------
-- Table structure for doctor
-- ----------------------------
DROP TABLE IF EXISTS `doctor`;
CREATE TABLE `doctor`  (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `head` VARCHAR(255),
  `gender` VARCHAR(255),
  `age` INT(10),
  `specialty` VARCHAR(255),
  `detail` VARCHAR(2550),
  `hospital_id` INT(10),
  FOREIGN KEY (hospital_id) REFERENCES hospital(id)
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
-- ----------------------------
-- Records of doctor
-- ----------------------------
INSERT INTO doctor (id, name, head, gender, age, specialty, detail, hospital_id)
VALUES
  (1, 'Dr. Emily Johnson', 'https://p.ipic.vip/n24s6t.jpg', 'Female', 42, 'Cardiology', 'Dr. Johnson is a highly skilled cardiologist with extensive experience in diagnosing and treating heart conditions. She is dedicated to providing personalized care and is known for her compassionate approach in helping patients improve their cardiovascular health.', 1),
  (2, 'Dr. Samuel Lee', 'https://p.ipic.vip/3y6r9h.jpg', 'Male', 39, 'Orthopedics', 'Dr. Lee is an accomplished orthopedic surgeon specializing in the treatment of musculoskeletal disorders. With a keen attention to detail and advanced surgical techniques, he aims to restore mobility and enhance the quality of life for his patients.', 2),
  (3, 'Dr. Sophia Patel', 'https://p.ipic.vip/5k2viq.jpg', 'Female', 35, 'Obstetrics and Gynecology', 'Dr. Patel is a compassionate OB/GYN dedicated to providing comprehensive care to women of all ages. She is committed to promoting women''s health and wellness, offering personalized treatment options and guidance throughout each stage of life.', 3),
  (4, 'Dr. Benjamin Chen', 'https://p.ipic.vip/mftjxo.jpg', 'Male', 48, 'Oncology', 'Dr. Chen is a renowned oncologist who specializes in the diagnosis and treatment of various cancers. His expertise in cutting-edge therapies and his patient-centered approach make him a trusted advocate for individuals fighting cancer.', 4),
  (5, 'Dr. Maya Gupta', 'https://p.ipic.vip/cxglfq.jpg', 'Female', 41, 'Neurology', 'Dr. Gupta is a dedicated neurologist with a passion for understanding and treating disorders of the nervous system. She strives to provide comprehensive care and support to patients dealing with neurological conditions, improving their quality of life.', 5),
  (6, 'Dr. Christopher Davis', 'https://p.ipic.vip/negx6s.jpg', 'Male', 44, 'Dermatology', 'Dr. Davis is a skilled dermatologist specializing in the diagnosis and treatment of skin conditions. With a focus on patient education and innovative skincare solutions, he helps individuals achieve healthy, radiant skin.', 6),
  (7, 'Dr. Olivia Wilson', 'https://p.ipic.vip/r5xqjo.jpg', 'Female', 37, 'Psychiatry', 'Dr. Wilson is a compassionate psychiatrist who offers expert mental health care to individuals of all ages. She believes in a holistic approach, combining therapy and medication management to help patients achieve emotional well-being.', 1),
  (8, 'Dr. Daniel Ramirez', 'https://p.ipic.vip/y2ed8f.jpg', 'Male', 36, 'Pediatrics', 'Dr. Ramirez is a dedicated pediatrician committed to providing exceptional care to children and adolescents. He strives to create a warm and welcoming environment, ensuring each child receives personalized attention and treatment.', 2),
  (9, 'Dr. Isabella Thompson', 'https://p.ipic.vip/2e4b3d.jpg', 'Female', 43, 'Internal Medicine', 'Dr. Thompson is a highly skilled internist with a broad knowledge of adult healthcare. She emphasizes preventive medicine and works closely with patients to develop personalized treatment plans that optimize their overall health.', 3),
  (10, 'Dr. Andrew Wilson', 'https://p.ipic.vip/b3uzb7.jpg', 'Male', 47, 'Urology', 'Dr. Wilson is an experienced urologist specializing in the diagnosis and treatment of urinary system disorders. With a patient-centric approach, he aims to provide comprehensive and compassionate care to individuals with urological conditions.', 4),
  (11, 'Dr. Mia Roberts', 'https://p.ipic.vip/o5dxfx.jpg', 'Female', 38, 'Ophthalmology', 'Dr. Roberts is a skilled ophthalmologist dedicated to preserving and improving patients'' vision. With expertise in both medical and surgical eye care, she offers individualized treatment options to enhance visual health.', 5),
  (12, 'Dr. Ava Mitchell', 'https://p.ipic.vip/x1xfmv.jpg', 'Female', 33, 'Family Medicine', 'Dr. Mitchell is a compassionate family medicine physician committed to providing comprehensive healthcare for individuals and families. She focuses on preventive care, disease management, and building strong patient-doctor relationships to promote overall well-being.', 6);



-- ----------------------------
-- Table structure for scheduling
-- ----------------------------
DROP TABLE IF EXISTS `scheduling`;
CREATE TABLE `scheduling`  (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `month` INT(10),
  `date` INT(10),
  `time` VARCHAR(50),
  `status` INT(10), -- 预约的状态1可以 0不可以，2已经预定
  `doctor_id` INT,
  FOREIGN KEY (doctor_id) REFERENCES doctor(id)
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
-- ----------------------------
-- Records of scheduling
-- ----------------------------
INSERT INTO `scheduling` VALUES (1, 1, 1, 'Morning', 1, 1);
INSERT INTO `scheduling` VALUES (2, 1, 1, 'Afternoon', 2, 1);
INSERT INTO `scheduling` VALUES (3, 1, 1, 'Morning', 1, 1);
INSERT INTO `scheduling` VALUES (4, 1, 1, 'Morning', 1, 1);
INSERT INTO `scheduling` VALUES (5, 1, 1, 'Afternoon', 1, 1);
INSERT INTO `scheduling` VALUES (6, 1, 1, 'Morning', 1, 2);
INSERT INTO `scheduling` VALUES (7, 1, 2, 'Morning', 1, 1);
INSERT INTO `scheduling` VALUES (8, 1, 2, 'Afternoon', 2, 1);
INSERT INTO `scheduling` VALUES (9, 1, 2, 'Morning', 1, 1);
INSERT INTO `scheduling` VALUES (10, 1, 2, 'Morning', 1, 1);
INSERT INTO `scheduling` VALUES (11, 1, 2, 'Afternoon', 1, 1);
INSERT INTO `scheduling` VALUES (12, 1, 2, 'Morning', 1, 2);


-- ----------------------------
-- Table structure for reservation
-- ----------------------------
DROP TABLE IF EXISTS `reservation`;
CREATE TABLE `reservation`  (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `account` VARCHAR(255) NOT NULL,
  `scheduling_id` INT,
  FOREIGN KEY (account) REFERENCES user(account),
  FOREIGN KEY (scheduling_id) REFERENCES scheduling(id)
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
-- ----------------------------
-- Records of reservation
-- ----------------------------
INSERT INTO `reservation` VALUES (1, 'user1', '1');


-- ----------------------------
-- Table structure for medicine
-- ----------------------------
DROP TABLE IF EXISTS `medicine`;
CREATE TABLE `medicine`  (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `usage` VARCHAR(255) NOT NULL,
  `treats` VARCHAR(255) NOT NULL
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
-- ----------------------------
-- Records of medicine
-- ----------------------------
INSERT INTO `medicine` (`name`, `type`, `usage`, `treats`) VALUES 
('Calmex', 'Antianxiety medication', 'Take one tablet orally, twice daily.', 'Generalized anxiety disorder, panic disorder'),
('Healolin', 'Antibiotic', 'Take one capsule orally, three times a day after meals.', 'Bacterial infections, such as respiratory tract infections'),
('PainShield', 'Analgesic', 'Apply a thin layer of cream topically to the affected area, up to three times daily.', 'Musculoskeletal pain, arthritis'),
('DigiHeart', 'Cardiac medication', 'Take one tablet orally, once daily in the morning.', 'Heart failure, arrhythmias'),
('ClariBreath', 'Respiratory medication', 'Inhale two puffs through a metered-dose inhaler, twice daily.', 'Asthma, chronic obstructive pulmonary disease (COPD)'),
('Digestol', 'Digestive aid', 'Take one tablet orally, before meals, three times daily.', 'Indigestion, bloating, acid reflux'),
('AllerGuard', 'Antihistamine', 'Take one tablet orally, once daily.', 'Allergic rhinitis, hay fever'),
('SleepEase', 'Sleep aid', 'Take one tablet orally, 30 minutes before bedtime.', 'Insomnia, difficulty falling asleep'),
('DiabeCare', 'Antidiabetic medication', 'Take one tablet orally, twice daily with meals.', 'Type 2 diabetes'),
('OptiVision', 'Ophthalmic solution', 'Instill one to two drops into each eye, twice daily.', 'Dry eyes, conjunctivitis'),
('BoneStrong', 'Calcium supplement', 'Take two tablets orally, once daily with food.', 'Osteoporosis, calcium deficiency'),
('ImmunoBoost', 'Immune system enhancer', 'Take one capsule orally, once daily.', 'Weak immune system, recurrent infections'),
('Amoxicillin', 'Antibiotic', 'Oral, Injection', 'Bacterial infections'),
('Azithromycin', 'Antibiotic', 'Oral', 'Bacterial infections, such as respiratory tract infections'),
('Cephalexin', 'Antibiotic', 'Oral', 'Bacterial infections'),
('Metronidazole', 'Antibiotic', 'Oral, Injection', 'Bacterial infections, such as dental infections'),
('Tetracycline', 'Antibiotic', 'Oral', 'Bacterial infections'),
('Fluoxetine', 'Antidepressant', 'Oral', 'Depression, panic disorder, obsessive-compulsive disorder (OCD)'),
('Sertraline', 'Antidepressant', 'Oral', 'Depression, panic disorder, obsessive-compulsive disorder (OCD)'),
('Escitalopram', 'Antidepressant', 'Oral', 'Depression, generalized anxiety disorder'),
('Lorazepam', 'Benzodiazepine', 'Oral', 'Anxiety disorders, insomnia'),
('Hydroxyzine', 'Antihistamine', 'Oral', 'Anxiety disorders, itching, hives'),
('Oxycodone', 'Narcotic analgesic', 'Oral', 'Pain management'),
('Percocet', 'Narcotic analgesic', 'Oral', 'Pain management'),
('Gabapentin', 'Anticonvulsant', 'Oral', 'Epilepsy, nerve pain, anxiety disorders'),
('Phenytoin', 'Anticonvulsant', 'Oral', 'Epilepsy'),
('Carbamazepine', 'Anticonvulsant', 'Oral', 'Epilepsy, nerve pain'),
('Verapamil', 'Calcium channel blocker', 'Oral', 'High blood pressure, angina'),
('Digoxin', 'Cardiac medication', 'Oral', 'Heart failure, arrhythmias'),
('Amlodipine', 'Calcium channel blocker', 'Oral', 'High blood pressure, angina'),
('Enalapril', 'ACE inhibitor', 'Oral', 'High blood pressure, heart failure'),
('Losartan', 'ARB', 'Oral', 'High blood pressure, diabetic nephropathy'),
('Furosemide', 'Loop diuretic', 'Oral, Injection', 'Edema, high blood pressure, kidney disease'),
('Esomeprazole', 'Proton pump inhibitor', 'Oral', 'Gastrointestinal disorders, such as gastroesophageal reflux disease (GERD)'),
('Famotidine', 'H2 blocker', 'Oral', 'Gastrointestinal disorders, such as gastroesophageal reflux disease (GERD)'),
('Simethicone', 'Antiflatulent', 'Oral', 'Gas, bloating, stomach discomfort'),
('Metoclopramide', 'Prokinetic agent', 'Oral, Injection', 'Nausea, vomiting, gastroparesis'),
('Lansoprazole', 'Proton pump inhibitor', 'Oral', 'Gastrointestinal disorders, such as gastroesophageal reflux disease (GERD)'),
('Aspirin', 'NSAID', 'Oral', 'Pain, fever, inflammation'),
('Naproxen', 'NSAID', 'Oral', 'Pain, fever, inflammation'),
('Ibuprofen', 'NSAID', 'Oral', 'Pain, fever, inflammation');


-- ----------------------------
-- Table structure for communacation
-- ----------------------------
DROP TABLE IF EXISTS `communacation`;
CREATE TABLE `communacation`  (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `fromUser` VARCHAR(255) NOT NULL,
  `toUser` VARCHAR(255) NOT NULL,
  `time` VARCHAR(255) NOT NULL,
  `content` VARCHAR(2550) NOT NULL,
  `isRead` INT(10) NOT NULL  
) ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
-- ----------------------------
-- Records of communacation
-- ----------------------------