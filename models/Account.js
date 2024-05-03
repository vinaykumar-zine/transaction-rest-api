import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
    accountType: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0.00
    },
    accountHolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ]
},{ timestamps: true })

var Account = mongoose.model('Account', accountSchema);

export default Account;