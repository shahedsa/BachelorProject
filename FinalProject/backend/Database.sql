Drop TABLE beacons;
CREATE TABLE Beacons
(
    id varchar(255),
    doorName VARCHAR(255),
    PRIMARY KEY(id)
);

INSERT INTO Beacons
    (id, doorName)
VALUES
    ('Au9Z', 'MainOuterDoor');