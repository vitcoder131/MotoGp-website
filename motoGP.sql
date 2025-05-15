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
    country varchar(300),
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
    calendar_name VARCHAR(225)
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

UPDATE Rider
SET pictureId = 'h2.png'
WHERE idrider = 9;


