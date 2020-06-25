const { Schema, model } = require("mongoose");

const offerSchema = new Schema(
  {
    professional: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    announcement: {
      type: Schema.Types.ObjectId,
      ref: "Announcement"
    },
    estimatedPrice: Number,
    comments: String,
    accepted: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true
  }
)

module.exports = model("Offer", offerSchema);