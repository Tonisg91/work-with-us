const { Schema, model } = require("mongoose");

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    sector: {
      type: String,
      enum: [
        "Fontanería",
        "Carpintería",
        "Carpintería de aluminio",
        "Paletería",
        "Albañilería",
        "Electricidad",
        "Jardinería",
        "Reparación electrodomésticos",
        "Pintura",
        "Cristalería",
        "Cerrajería",
        "Otros",
      ]
    },
    description: {
      type: String,
    },
    tags: {
      type: [String],
      maxlength: 5,
    },
    photos: {
      type: String, //ARRAY DE URL??
    },
    assigned: {
      type: Boolean,
      default: false,
    },
    announcer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    professional: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    offers: [{
      type: Schema.Types.ObjectId,
      ref: 'Offer'
    }],
    reviews: {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Announcement", announcementSchema);
