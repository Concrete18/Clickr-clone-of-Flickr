const { User } = require("./models");

async function findUserByPK(userId) {
  return await User.findOne(
    {
      where: { userId },
    }
  );
}

module.exports = {
  findUserByPK
};
