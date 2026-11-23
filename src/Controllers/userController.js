const userSerive = require('../Services/userService');

exports.handleCreateuser = async (req, res) => {
    try {
        const createUser = await userSerive.CreateUser(req.body);
        return res.status(201).json({createUser});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}




exports.handleGetAllUsers = async (req, res) => {
    try {
        const users = await userSerive.GetAllUsers();
        res.status(200).json({
            data: users
        })
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
}

exports.handleGetUserById = async (req, res) => {
    try {
        const user = await userSerive.GetUserById(req.params.id);
        return res.status(200).json({user})
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

