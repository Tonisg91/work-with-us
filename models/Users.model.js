const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email obligatorio"],
      match: [/^\S+@\S+\.\S+$/, "Dirección de correo inválida"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    photo:
    {
      type: String,
      default: 'https://adncultura.org/sites/default/files/styles/mg_user_picture/public/default_images/default-user.png?itok=-m-meRA9'
    },
    name: String,
    passwordHash: {
      type: String,
      required: [true, "Contraseña obligatoria"],
    },
    announcements: [
      {
        type: Schema.Types.ObjectId,
        ref: "Announcement",
      },
    ],
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
      ], //AÑADIR LOS DIFERENTES SECTORES
    },
    address: String,
    city: String,
    description: String,
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: "Review",
    }],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = model("User", userSchema);
