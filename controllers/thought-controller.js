const { Thought, User } = require('../models');

const thoughtController = {
    async getThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find()
                .sort({ createdAt: -1 });

            res.json(dbThoughtData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thoughts find with this ID'});
            }
            res.json(dbThoughtData);
        }   catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { thoughts: dbThoughtData._id }},
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
    async updateThought (req, res) {
        const dbThoughtData = await Thought.findOneAndUpdate(
            { _id: req.body.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought found with this ID'});
        }
        res.json(dbThoughtData);
        console.log(err);
        res.status(500).json(err);
    },
    async deleteThought(req, res) {
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
                { new: true}
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