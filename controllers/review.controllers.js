const User = require('../models/Users.model');
const Review = require('../models/Review.model');

const getAddReview = async (req, res, next) => {
  try {
    const currentUser = req.session.currentUser;
    const { professionalId } = req.params;
    res.render('reviews/add-review', { currentUser, professionalId });
  } catch (error) {
    next(error)
  }
}

const postAddReview = async (req, res, next) => {
  try {
    const { professionalId, title, description, rating } = req.body;
    const newReview = await Review.create({ professionalId, title, description, rating });
    await User.findByIdAndUpdate(professionalId, { $push: { reviews: newReview._id } });
    res.redirect('/myaccount');
  } catch (error) {
    next(error)
  }
}

module.exports = { getAddReview, postAddReview }