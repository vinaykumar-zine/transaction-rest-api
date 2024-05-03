import Account from "../models/Account.js";

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createAccount = async (req, res) => {
  const { accountType, balance, accountHolder } = req.body;

  if(accountType == 'BASICSAVINGS' && Number(balance) > 50000) return res.status(400).json({message: "BASICSAVINGS account type cannot have balance greater than Rs. 50,000"});

  const newAccount = new Account({
    accountType,
    balance,
    accountHolder,
  });

  try {
    await Account.create(newAccount, function (err, createdAccount) {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(201).json(createdAccount);
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
