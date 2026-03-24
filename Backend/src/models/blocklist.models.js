const mongoose = require("mongoose")

const blockListSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "token is required"]
  }
}, {
  timestamps: true
})

const blockModel = mongoose.model("blacklist", blockListSchema)

module.exports = blockModel