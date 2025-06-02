-- BẢNG TEAM
CREATE TABLE Team (
    idteam INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(225),
    country VARCHAR(225),
    membes INT DEFAULT 0,
    pictureTeam VARCHAR(225),
    idcalendar INT
	FOREIGN KEY (idcalendar) REFERENCES Calendar(idcalendar);
);
-- BẢNG RIDER
CREATE TABLE Rider (
    idrider INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(225),
    idteam INT,
    pictureId VARCHAR(225),
    points INT DEFAULT 0,
    season ENUM('moto1', 'moto2', 'moto3', 'motoE'),
    victory INT DEFAULT 0,
    podium INT DEFAULT 0,
    race INT DEFAULT 0,
    poles INT DEFAULT 0,
    worldchampionships INT DEFAULT 0,
    FOREIGN KEY (idteam) REFERENCES Team(idteam)
);

-- BẢNG CALENDAR
CREATE TABLE Calendar (
    idcalendar INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(225),
    dates DATE,
    times TIME,
    season ENUM('moto1', 'moto2', 'moto3', 'motoE'),
    rounds INT,
    calendar_name VARCHAR(225),
    pitureCountry varchar(225)
);
-- BẢNG RESULTS
CREATE TABLE Results (
    idresult INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    standing VARCHAR(10),
    points INT,
    idrider INT,
    idcalendar INT,
    season ENUM('moto1', 'moto2', 'moto3', 'motoE'),
    mvp_name VARCHAR(225),
    time_finish TIME,
    FOREIGN KEY (idrider) REFERENCES Rider(idrider),
    FOREIGN KEY (idcalendar) REFERENCES Calendar(idcalendar)
);
-- TẠO TRIGGER
DELIMITER $$
CREATE TRIGGER trg_result_insert
AFTER INSERT ON Results
FOR EACH ROW
BEGIN
    UPDATE Rider
    SET points = points + NEW.points
    WHERE idrider = NEW.idrider;
END$$

CREATE TRIGGER trg_result_update
AFTER UPDATE ON Results
FOR EACH ROW
BEGIN
    UPDATE Rider
    SET points = points - OLD.points + NEW.points
    WHERE idrider = NEW.idrider;
END$$

CREATE TRIGGER trg_result_delete
AFTER DELETE ON Results
FOR EACH ROW
BEGIN
    UPDATE Rider
    SET points = points - OLD.points
    WHERE idrider = OLD.idrider;
END$$

CREATE TRIGGER trg_rider_insert
AFTER INSERT ON Rider
FOR EACH ROW
BEGIN
    UPDATE Team
    SET members = members + 1
    WHERE idteam = NEW.idteam;
END$$

CREATE TRIGGER trg_rider_delete
AFTER DELETE ON Rider
FOR EACH ROW
BEGIN
    UPDATE Team
    SET members = members - 1
    WHERE idteam = OLD.idteam;
END$$

DELIMITER ;

INSERT INTO Team (name, country, pictureTeam)
VALUES 
    ('Ducati Lenovo Team', 'Italy', 'ducati.png'),
    ('Monster Energy Yamaha', 'Japan', 'yamaha.png'),
    ('Repsol Honda Team', 'Japan', 'honda.png');

INSERT INTO Rider (name, idteam, pictureId)
VALUES 
    ('Francesco Bagnaia', 1, 'bagnaia.png'),
    ('Enea Bastianini', 1, 'bastianini.png'),
    ('Fabio Quartararo', 2, 'quartararo.png'),
    ('Marc Marquez', 3, 'marquez.png');

INSERT INTO Calendar (address, dates, times)
VALUES 
    ('Losail International Circuit, Qatar', '2025-03-10', '19:00:00'),
    ('Circuit of the Americas, USA', '2025-04-14', '13:00:00'),
    ('Mugello Circuit, Italy', '2025-05-20', '15:30:00');

INSERT INTO Results (standing, points, idrider)
VALUES 
    ('1st', 25, 1),
    ('2nd', 20, 2),
    ('3rd', 16, 3),
    ('4th', 13, 4);

INSERT INTO Results (standing, points, idrider)
VALUES 
    ('1st', 25, 3),
    ('2nd', 20, 1),
    ('3rd', 16, 4),
    ('4th', 13, 2);

INSERT INTO Calendar (address, dates, times)
VALUES 
    ('Assen Circuit, Netherlands', '2025-06-08', '14:00:00'),
    ('Silverstone Circuit, UK', '2025-07-15', '15:00:00'),
    ('Sepang International Circuit, Malaysia', '2025-08-20', '17:00:00');

INSERT INTO Team (name, country, pictureTeam, idcalendar)
VALUES 
    ('Red Bull KTM Factory Racing', 'Austria', 'ktm.png', 4),
    ('Aprilia Racing', 'Italy', 'aprilia.png', 5);


INSERT INTO Calendar (address, dates, times, season, rounds, calendar_name) VALUES
('Chang International Circuit, Thailand', '2025-02-28', '09:00:35', 'moto3', 1, 'PT Grand Prix of Thailand'),
('Chang International Circuit, Thailand', '2025-03-01', '09:25:55', 'moto2', 2, 'PT Grand Prix of Thailand'),
('Chang International Circuit, Thailand', '2025-03-02', '10:10:50', 'moto1', 3, 'PT Grand Prix of Thailand'),
('Termas de Rio Hondo, Argentina', '2025-03-14', '19:00:35', 'moto3', 4, 'Gran Premio YPF Energia de Argentina'),
('Termas de Rio Hondo, Argentina', '2025-03-15', '00:00:45', 'moto2', 5, 'Gran Premio YPF Energia de Argentina'),
('Termas de Rio Hondo, Argentina', '2025-03-16', '00:00:25', 'moto2', 6, 'Gran Premio YPF Energia de Argentina'),
('Circuit Of the Americas', '2025-03-28', '00:00:00', 'moto1', 7, 'Red Bull Grand Prix of The Americas'),
('Circuit Of the Americas', '2025-03-29', '01:15:50', 'moto3', 8, 'Red Bull Grand Prix of The Americas'),
('Circuit Of the Americas', '2025-03-30', '00:50:05', 'moto3', 9, 'Red Bull Grand Prix of The Americas'),
('Lusail International Circuit, Qatar', '2025-04-11', '18:00:35', 'moto3', 10, 'Qatar Airways Grand Prix of Qatar'),
('Lusail International Circuit, Qatar', '2025-04-12', '00:00:00', 'moto1', 11, 'Qatar Airways Grand Prix of Qatar'),
('Lusail International Circuit, Qatar', '2025-04-13', '00:00:45', 'moto1', 12, 'Qatar Airways Grand Prix of Qatar'),
('Circuito de Jerez – Ángel Nieto, Spain', '2025-04-25', '14:00:35', 'moto3', 13, 'Estrella Galicia O,O Grand Prix of Spain'),
('Circuito de Jerez – Ángel Nieto, Spain', '2025-04-26', '13:40:10', 'moto3', 14, 'Estrella Galicia O,O Grand Prix of Spain'),
('Circuito de Jerez – Ángel Nieto, Spain', '2025-04-27', '14:40:50', 'moto1', 15, 'Estrella Galicia O,O Grand Prix of Spain'),
('Le Mans, France', '2025-05-09', '13:30:45', 'motoE', 16, 'Michelin Grand Prix of France'),
('Le Mans, France', '2025-05-10', '13:40:10', 'moto3', 17, 'Michelin Grand Prix of France'),
('Le Mans, France', '2025-05-11', '14:40:50', 'moto1', 18, 'Michelin Grand Prix of France'),
('Silverstone Circuit, United Kingdom', '2025-05-23', '16:00:35', 'moto3', 19, 'Tissot Grand Prix of the United Kingdom'),
('Silverstone Circuit, United Kingdom', '2025-05-24', '15:40:10', 'moto3', 20, 'Tissot Grand Prix of the United Kingdom'),
('Silverstone Circuit, United Kingdom', '2025-06-25', '15:40:50', 'moto1', 21, 'Tissot Grand Prix of the United Kingdom'),
('MotorLand Aragon', '2025-06-06', '14:00:35', 'moto3', 22, 'GoPro Gran Prix of Aragon'),
('MotorLand Aragon', '2025-06-07', '14:25:55', 'moto2', 23, 'GoPro Gran Prix of Aragon'),
('MotorLand Aragon', '2025-06-08', '14:40:50', 'moto1', 24, 'GoPro Gran Prix of Aragon'),
('Autodromo Internazionale del Mugello, Italy', '2025-06-20', '14:00:35', 'moto3', 25, 'Brembo Grand Prix of Italy'),
('Autodromo Internazionale del Mugello, Italy', '2025-06-21', '13:40:10', 'moto3', 26, 'Brembo Grand Prix of Italy'),
('Autodromo Internazionale del Mugello, Italy', '2025-06-22', '14:40:50', 'moto3', 27, 'Brembo Grand Prix of Italy'),
('TT Circuit, Netherlands', '2025-06-27', '13:30:45', 'motoE', 28, 'Motul Grand Prix of Netherlands'),
('TT Circuit, Netherlands', '2025-06-28', '13:40:10', 'moto3', 29, 'Motul Grand Prix of Netherlands'),
('TT Circuit, Netherlands', '2025-06-29', '14:41:50', 'moto1', 30, 'Motul Grand Prix of Netherlands'),
('Sachsenring, Germany', '2025-07-11', '14:00:35', 'moto3', 31, 'Liqui Grand Prix of Germany'),
('Sachsenring, Germany', '2025-07-12', '15:10:40', 'moto1', 32, 'Liqui Grand Prix of Germany'),
('Sachsenring, Germany', '2025-07-13', '19:00:30', 'moto2', 33, 'Liqui Grand Prix of Germany'),
('Automotodrom Brno, Czechia', '2025-07-18', '14:00:35', 'moto3', 34, 'Grand Prix of Czechia'),
('Automotodrom Brno, Czechia', '2025-07-19', '14:14:55', 'moto2', 35, 'Grand Prix of Czechia'),
('Automotodrom Brno, Czechia', '2025-07-20', '14:40:50', 'moto3', 36, 'Grand Prix of Czechia'),
('Red Bull Ring - Spielberg, Austria', '2025-08-15', '13:13:45', 'motoE', 37, 'Grand Prix of Austria'),
('Red Bull Ring - Spielberg, Austria', '2025-08-16', '13:14:10', 'moto3', 38, 'Grand Prix of Austria'),
('Red Bull Ring - Spielberg, Austria', '2025-08-17', '14:40:50', 'moto1', 39, 'Grand Prix of Austria'),
('Balaton Park, Hungary', '2025-08-22', '13:30:45', 'motoE', 40, 'Grand Prix of Hungary'),
('Balaton Park, Hungary', '2025-08-23', '13:40:10', 'moto3', 41, 'Grand Prix of Hungary'),
('Balaton Park, Hungary', '2025-08-24', '14:40:50', 'moto1', 42, 'Grand Prix of Hungary'),
('Circuit de Barcelona, Catalonia', '2025-09-05', '13:13:45', 'motoE', 43, 'Monster Energy Grand Prix of Catalonia'),
('Misano World Circuit Marco Simoncelli, San Marino', '2025-09-12', '12:13:45', 'motoE', 44, 'Red Bull Grand Prix of San Marino and the Rimini Riviera'),
('Mobility Resort Motegi, Japan', '2025-09-28', '07:07:50', 'moto1', 45, 'Motul Grand Prix of Japan'),
('Pertamina Mandalika Circuit, Indonesia', '2025-10-03', '08:08:35', 'moto3', 46, 'Pertamina Grand Prix of Indonesia'),
('Philip Island, Australia', '2025-10-17', '11:02:00', 'moto1', 47, 'Australian Motorcycle Grand Prix'),
('Petronas Sepang International Circuit, Malaysia', '2025-10-24', '08:08:35', 'moto3', 48, 'Petronas Grand Prix of Malaysia'),
('Autodromo Internacional do Algarve, Portugal', '2025-11-07', '15:15:45', 'motoE', 49, 'Qatar Airways Grand Prix of Portugal'),
('Circuit Ricardo Tormo, Valencia', '2025-11-14', '15:15:35', 'moto3', 50, 'Motul Grand Prix of Valencian Community');

INSERT INTO Team (name, country, membes, pictureTeam, idcalendar) VALUES
('Aprilia Racing', 'Italy', 2, 'aprilia_racing.png', 170),
('BK8 Gresini Racing MotoGP', 'Italy', 2, 'bk8_gresini_racing.png', 170),
('Ducati Lenovo Team', 'Italy', 2, 'ducati_lenovo_team.png', 170),
('Honda HRC Castrol', 'Japan', 2, 'honda_hrc_castrol.png', 170),
('LCR Honda', 'Monaco', 2, 'lcr_honda.png', 170),
('Monster Energy Yamaha MotoGP', 'Italy', 2, 'monster_energy_yamaha.png', 170),
('Pertamina Enduro VR46 Racing Team', 'Italy', 2, 'pertamina_vr46.png', 170),
('Prima Pramac Yamaha MotoGP', 'Italy', 2, 'prima_pramac_yamaha.png', 170),
('Red Bull KTM Factory Racing', 'Austria', 2, 'redbull_ktm_factory.png', 170),
('Red Bull KTM Tech3', 'France', 2, 'redbull_ktm_tech3.png', 170),
('Trackhouse MotoGP Team', 'USA', 2, 'trackhouse_motogp.png', 170);

INSERT INTO Results (standing, points, idrider, idcalendar, season, mvp_name, time_finish) VALUES
(1, 25, 39, 160, 'moto1', 'Kheo leo', '00:45:23'),
(2, 20, 50, 160, 'moto2', 'Buc pha', '00:48:11'),
(3, 16, 52, 160, 'moto1', 'Kheo leo', '00:40:05'),
(4, 13, 48, 160, 'moto3', 'Buc pha', '00:55:45'),
(5, 11, 45, 160, 'moto2', 'Kheo leo', '01:02:10'),
(6, 10, 41, 160, 'moto2', 'Buc pha', '00:59:17'),
(7, 9, 48, 160, 'moto1', 'Kheo leo', '00:41:22'),
(8, 8, 39, 161, 'moto3', 'Buc pha', '01:05:30'),
(9, 7, 40, 161, 'moto3', 'Kheo leo', '00:54:12'),
(10, 6, 46, 161, 'moto3', 'Buc pha', '01:09:50'),
(11, 5, 44, 161, 'moto1', 'Kheo leo', '00:49:33'),
(12, 4, 42, 161, 'moto1', 'Buc pha', '00:50:05'),
(13, 3, 42, 161, 'moto3', 'Kheo leo', '00:58:08'),
(14, 2, 47, 170, 'moto3', 'Buc pha', '01:10:44'),
(15, 1, 47, 170, 'moto1', 'Kheo leo', '00:51:21'),
(16, 0, 43, 170, 'motoE', 'Cham', '01:15:32'),
(1, 25, 41, 170, 'moto3', 'Kheo leo', '00:42:12'),
(2, 20, 49, 170, 'moto1', 'Cham', '00:47:48'),
(3, 16, 41, 170, 'moto3', 'Kheo leo', '00:53:36'),
(4, 13, 49, 170, 'moto3', 'Cham', '01:00:00'),
(5, 11, 46, 175, 'moto1', 'Fast', '00:44:15'),
(6, 10, 53, 175, 'moto3', 'Cham', '01:03:22'),
(7, 9, 55, 175, 'moto2', 'Fast', '00:56:10'),
(8, 8,52, 175, 'moto1', 'Cham', '01:08:09'),
(9, 7, 58, 175, 'moto3', 'Fast', '00:57:31'),
(10, 6, 56, 175, 'moto3', 'Cham', '01:11:42'),
(11, 5, 55, 175, 'moto3', 'Fast', '00:43:17'),
(12, 4, 51, 175, 'motoE', 'Cham', '01:14:55'),
(13, 3, 58, 180, 'moto3', 'Fast', '00:49:00'),
(14, 2, 50, 180, 'moto1', 'Cham', '00:58:45'),
(15, 1, 57, 180, 'moto3', 'Fast', '00:52:06'),
(16, 0, 40, 180, 'moto1', 'Cham', '01:06:33'),
(1, 25, 47, 180, 'moto2', 'Fast', '00:46:41'),
(2, 20, 49, 180, 'moto3', 'Cham', '01:12:29'),
(3, 16, 57, 180, 'moto2', 'Fast', '00:50:11'),
(4, 13, 39, 180, 'moto3', 'Cham', '01:05:45'),
(5, 11, 44, 180, 'motoE', 'Fast', '00:48:54'),
(6, 10, 41, 185, 'moto3', 'Cham', '01:07:22'),
(7, 9, 52, 185, 'moto1', 'Fast', '00:42:38'),
(8, 8, 43, 185, 'moto3', 'Cham', '00:59:14'),
(9, 7, 41, 185, 'moto3', 'Fast', '00:55:09'),
(10, 6, 56, 185, 'moto1', 'Cham', '01:02:45'),
(11, 5, 46, 185, 'motoE', 'Fast', '00:47:50'),
(12, 4, 42, 185, 'motoE', 'Cham', '01:09:11'),
(13, 3, 58, 185, 'moto1', 'Fast', '00:51:00'),
(14, 2, 45, 190, 'moto3', 'Cham', '01:13:05'),
(15, 1, 42, 190, 'moto1', 'Fast', '00:44:33'),
(16, 0, 53, 190, 'moto3', 'Cham', '01:04:27'),
(1, 25, 47, 190, 'motoE', 'Fast', '00:46:12'),
(2, 20, 51, 190, 'moto3', 'Cham', '01:00:58');






