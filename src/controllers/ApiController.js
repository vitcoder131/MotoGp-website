const connection = require("../config/database")

let getAllRider = async (req, res) => {
    const [rows, fields] = await connection.execute('SELECT * FROM Rider');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewRider = async (req, res) => {
    let { name, idteam, pictureId, points } = req.body;
    if (!name || !idteam || !pictureId || !points) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await connection.execute(` INSERT INTO Rider( name, idteam, pictureId, points )  
        VALUES (?, ?, ?, ?)`,
        [name, idteam, pictureId, points]);

    return res.status(200).json({
        message: 'ok'
    })
}

let updateRider = async (req, res) => {
    let { name, idteam, pictureId, points,RiderId } = req.body;
    if (!name || !idteam || !pictureId || !points ||!RiderId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await connection.execute(`UPDATE Rider 
        SET name = ?,idteam =?, pictureId = ?, points = ?
        WHERE riderid = ?`,
        [name, idteam, pictureId, points,RiderId ]);
    return res.status(200).json({
        message: 'ok'
    })
}
let deleteRider = async (req, res) => {
    let RiderId = req.params.id;
    if (!RiderId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await connection.execute(
        `DELETE FROM Rider WHERE riderid = ?`,
        [RiderId])
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllRider, createNewRider, updateRider, deleteRider
}