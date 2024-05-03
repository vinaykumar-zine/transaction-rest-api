import mongoose from "mongoose";

import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";


export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const createTransaction = async (req, res) => {
  var failureError = "",
    fromAccount,
    toAccount;

  const { fromAccountId, toAccountId, amount, description } = req.body;

  const newTransaction = new Transaction({
    fromAccountId,
    toAccountId,
    amount,
    description,
  });

  const logTransactionInAccounts = async (createdTransaction) => {
    await fromAccount.transactions.push(createdTransaction);
    await fromAccount.save();
    await toAccount.transactions.push(createdTransaction);
    await toAccount.save();
  };

  try {
    var error_message = !mongoose.Types.ObjectId.isValid(fromAccountId)
    ? "Sender Account ID entered incorrectly. Transaction cannot be processed."
    : !mongoose.Types.ObjectId.isValid(toAccountId)
    ? "Receiver Account ID entered incorrectly. Transaction cannot be processed."
    : "";
    if (error_message) throw error_message;

    fromAccount = await Account.findById(fromAccountId);
    console.log(fromAccount);

    error_message = !fromAccount
      ? "Sender Account ID does not exist."
      : fromAccount.balance < amount
      ? "Insufficent balance in Sender's Account"
      : "";
    if (error_message) throw error_message;

    try {
      toAccount = await Account.findById(toAccountId);
      console.log(toAccount);

      error_message = !toAccount 
        ? "Receiver Account ID does not exist." 
        : `${fromAccount.accountHolder}` == `${toAccount.accountHolder}`
        ? "Transfer between accounts held by the same customer is not allowed."
        : toAccount.accountType == 'BASICSAVINGS' && toAccount.balance + Number(amount) > 50000
        ? "Receiver Account cannot accept the transaction amount due to balance restrictions."
        : "";
      if (error_message) throw error_message;

      try {
        fromAccount.balance -= Number(amount);
        await Account.findByIdAndUpdate(fromAccountId, fromAccount, {
          new: true,
        });

        console.log(fromAccount);

        toAccount.balance += Number(amount);
        await Account.findByIdAndUpdate(toAccountId, toAccount, { new: true });

        console.log(toAccount);
      } catch (error) {
        failureError = error;
        failureError.reason = "Transaction failed. Please try again!.";

        console.log(failureError);
      }
    } catch (error) {
      failureError = error;

      console.log(failureError);
    }
  } catch (error) {
    failureError = error;

    console.log(failureError);
  }

  if (failureError) {
    newTransaction.status = false;
    newTransaction.failureReason =
      failureError instanceof Error
        ? failureError.reason
          ? failureError.reason
          : failureError
        : failureError;
  }

  try {
    await newTransaction.save();
    await logTransactionInAccounts(newTransaction);
  } catch (error) {
    if(!failureError) failureError = "Sorry for the inconvenience caused. Transaction may have processed but not logged.";
  }

  if (failureError) {
    res.status(400).json({ message: failureError });
  } else {
    const accounts = await Account.find({accountHolder: `${toAccount.accountHolder}`})
    var totalToAccountBalance = 0;
    accounts.forEach((account)=>{
      totalToAccountBalance += account.balance;
    })
    res.status(201).json({
      newSrcBalance: fromAccount.balance,
      totalDestBalance: totalToAccountBalance,
      transferredAt: newTransaction.createdAt
    });
  }
};
