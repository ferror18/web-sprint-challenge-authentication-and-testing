const { hashRounds } = require("../constants")
const bcrypt = require('bcryptjs')

module.exports = {
    // This needs to return to save both salt and hash
    hashString : str => bcrypt.hashSync(str, hashRounds),
    checkPass: (passGuess, pass) => bcrypt.compareSync(passGuess, pass)
}