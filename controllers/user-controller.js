const { Thought, User } = require('../models');

const userController = {
    async getUsers(req, res) {
        try {
            const dbUserData = await User.find()
                .sort({ createdAt: -1 });

            res.json(dbUserData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.userId });
            if (!dbUserData) {
                return res.status(404).json({ message: 'No users find with this ID'});
            }
            res.json(dbUserData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id }},
                { new: true }
            );

            if (!dbUserData) {
                return res
                    .status(404)
                    .json({ message: 'Thought created but no user with this ID'});
            }

            res.json({ message: 'Thought Created Successfully'});
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateUser (req, res) {
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this ID'});
        }
        res.json(dbUserData);
        console.log(err);
        res.status(500).json(err);
    },
    async deleteUser(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndRemove({
                _id: req.params.thoughtId,
            });
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this ID'});
            }

            const dbUserData = User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            );

            if (!dbUserData) {
                return res
                    .status(404)
                    .json({ message: 'Thought created but no user was found with this ID'});
            }
            res.json({ message: 'Thought deleted successfully'});
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body}},
                { runValidators: true, new: true}
            );
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this ID'});
            }
            res.json(dbThoughtData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try{
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.params.reactionId}}},
                { runValidators: true, new: true}
            );
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'No thought found with this ID'});
            }
            res.json(dbThoughtData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;