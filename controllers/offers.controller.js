const Offers = require('../models/Offers.model');

const postEditOffer = async (req, res, next) => {
  try {
    const { estimatedPrice, comments } = req.body;
    await Offers.findByIdAndUpdate(req.params.offerId, { estimatedPrice, comments });
    res.redirect(`/announcement/${req.params.announceId}`);
  }
  catch (error) {
    next(error);
  }
}


module.exports = { postEditOffer }