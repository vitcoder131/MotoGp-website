CREATE TABLE Team (
    idteam INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(225),
    country VARCHAR(225),
    membes INT DEFAULT 0,
    pictureTeam VARCHAR(225),
    idcalendar INT
);



-- BẢNG RIDER
CREATE TABLE Rider (
    idrider INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(225),
    idteam INT,
    pictureId VARCHAR(225),
    points INT DEFAULT 0,
    FOREIGN KEY (idteam) REFERENCES Team(idteam)
);

-- BẢNG RESULTS
CREATE TABLE Results (
    idresult INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    standing VARCHAR(10),
    points INT,
    idrider INT,
    FOREIGN KEY (idrider) REFERENCES Rider(idrider)
);

-- BẢNG CALENDAR
CREATE TABLE Calendar (
    idcalendar INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(225),
    dates DATE,
    times TIME
);

-- TRIGGER: Khi thêm kết quả => tăng điểm cho rider
DELIMITER $$

CREATE TRIGGER trg_result_insert
AFTER INSERT ON Results
FOR EACH ROW
BEGIN
    UPDATE Rider
    SET points = points + NEW.points
    WHERE idrider = NEW.idrider;
END$$

-- TRIGGER: Khi cập nhật điểm => tính lại điểm rider
CREATE TRIGGER trg_result_update
AFTER UPDATE ON Results
FOR EACH ROW
BEGIN
    UPDATE Rider
    SET points = points - OLD.points + NEW.points
    WHERE idrider = NEW.idrider;
END$$

-- TRIGGER: Khi xóa kết quả => giảm điểm rider
CREATE TRIGGER trg_result_delete
AFTER DELETE ON Results
FOR EACH ROW
BEGIN
    UPDATE Rider
    SET points = points - OLD.points
    WHERE idrider = OLD.idrider;
END$$

-- TRIGGER: Khi thêm rider => tăng số lượng thành viên team
CREATE TRIGGER trg_rider_insert
AFTER INSERT ON Rider
FOR EACH ROW
BEGIN
    UPDATE Team
    SET membes = membes + 1
    WHERE idteam = NEW.idteam;
END$$

-- TRIGGER: Khi xóa rider => giảm số lượng thành viên team
CREATE TRIGGER trg_rider_delete
AFTER DELETE ON Rider
FOR EACH ROW
BEGIN
    UPDATE Team
    SET membes = membes - 1
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


-- Chặng 1
INSERT INTO Results (standing, points, idrider)
VALUES 
('1st', 25, 1),
('2nd', 20, 2),
('3rd', 16, 3),
('4th', 13, 4);

-- Chặng 2
INSERT INTO Results (standing, points, idrider)
VALUES 
('1st', 25, 3),
('2nd', 20, 1),
('3rd', 16, 4),
('4th', 13, 2);


INSERT INTO Calendar (address, dates, times)
VALUES 
('Losail International Circuit, Qatar', '2025-03-10', '19:00:00'),
('Circuit of the Americas, USA', '2025-04-14', '13:00:00'),
('Mugello Circuit, Italy', '2025-05-20', '15:30:00');



UPDATE Rider
    SET pictureId ='h2.png'
    WHERE idrider = 9