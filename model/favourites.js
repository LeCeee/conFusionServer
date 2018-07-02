const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FavouriteSchema = new Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dishes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }
}, {
    timestamps: true
});
const  Favourites = mongoose.model('favourite',favouriteSchema);
module.exports = Favourites;