const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sessionSchema = new Schema(
    {
        host: {
            type: String, // host's Spotify user id
            required: true,
        },
        playlist: [String], // array of Spotify track ids
        listeners: [String], // array of Spotify user ids
        listener_count: Number, // number of listeners
    },
    {
        timestamps: true,
    }
)

// create mongoose Model
const Session = mongoose.model('Session', sessionSchema)

// export the model so other modules can import it
module.exports = {
    Session,
}