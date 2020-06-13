const { Schema, model } = require("mongoose");

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
    },
    tags: {
      type: [String],
      maxlength: 5,
    },
    photos: {
      type: [String], //ARRAY DE URL??
      maxlength: 10,
    },
    assigned: Boolean,
    announcer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    professional: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    offers: [
      {
        professional: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        estimatedPrice: Number,
        comments: String,
      },
    ],
    reviews: {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
    finished: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Announcement", announcementSchema);
