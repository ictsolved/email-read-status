import path from "path";

import service from "../services/receipt.service.mjs";

async function latestReceipts(req, res) {
  try {
    const receipt = await service.latestReceipts();

    if (!receipt || receipt.length == 0) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.status(200).json(receipt);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve latest receipts" });
  }
}

async function emailReceipts(req, res) {
  try {
    const { emailId } = req.params;

    const receipt = await service.emailReceipts(emailId);

    if (!receipt || receipt.length == 0) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.status(200).json(receipt);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve receipt" });
  }
}

async function markAsSelfRead(req, res) {
  try {
    const updatedReceipt = await service.markAsSelfRead(req.body);
    res.status(200).json(updatedReceipt);
  } catch (error) {
    console.error("Error in markReceiptAsReadController:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
}

async function trackReceipt(req, res) {
  try {
    const token = req.params.token;
    const userAgent = req.headers["user-agent"];
    const ipAddress = req.ip;
    await service.trackReceipt({ token, userAgent, ipAddress });
  } catch (error) {
    console.log(error);
  } finally {
    res.setHeader("content-type", "image/gif");
    res.sendFile(`${path.resolve()}/public/image.gif`);
  }
}

export default { latestReceipts, emailReceipts, markAsSelfRead, trackReceipt };
