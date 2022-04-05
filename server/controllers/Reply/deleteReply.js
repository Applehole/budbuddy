const { Replies, Journals } = require("../../models/index");
const checkAuth = require("../../modules/verifyCookieToken");

module.exports = async (req, res) => {
  try {
    var verify = await checkAuth(req, res);
  } catch (err) {
    return err; // break
  }

  const user_id = verify.idx;

  const journal_id = req.params.id;
  const reply_Id = req.params.replyId;

  try {
    const journal = await Journals.findByPk(journal_id);

    if (!journal) return res.status(404).send({ message: "Not Found" });
    if (!journal.public) {
      if (journal.user_id !== user_id) return res.status(403).send({ message: "Forbidden" });
    }

    const reply = await Replies.findByPk(reply_Id);
    if (!reply) return res.status(404).send({ message: "Not Found" });
    if (reply.user_id !== user_id) return res.status(403).send({ message: "Forbidden, permission denied" });

    await Replies.destroy({
      where: {
        group_id: reply_Id,
      },
    });

    return res.status(204).end();
  } catch (err) {
    console.error("Sequelize Error: ", err);
    res.status(500).send(err);
  }
};
