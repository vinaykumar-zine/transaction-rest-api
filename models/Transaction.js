import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    fromAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    toAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }, 
    amount: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        default: 'NA'
    },
    status:{
        type: Boolean,
        default: true,
        required: true
    },
    failureReason:{
        type: String,
        default: 'NA'
    }
},{ timestamps: true })

var Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;