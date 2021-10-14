const { User } = require("./models");

async function findUserByPK(id) {
  return await User.findOne(
    {
      where: { id },
    }
  );
}

module.exports = {
  findUserByPK
};
