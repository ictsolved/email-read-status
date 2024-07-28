import service from "../services/email.service.mjs";

async function getEmails(req, res) {
  try {
    const emails = await service.getEmails(req.query);
    res.send(emails);
  } catch (error) {
    console.error("Error retrieving emails:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

async function searchEmailAddress(req, res) {
  try {
    const query = req.query.q;
    const emailAddresses = await service.searchEmailAddress(query);
    res.send(emailAddresses);
  } catch (error) {
    console.error("Error retrieving emails:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

async function createEmail(req, res) {
  res.set("Content-Type", "text/html");
  try {
    const email = await service.createEmail(req.body);

    res.send(
      Buffer.from(
        `<img src="${process.env.URL}/receipt/${email.token}" width="0px" height="0px">`
      )
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(Buffer.from(`Error`));
  }
}

export default { getEmails, createEmail, searchEmailAddress };
