import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getReceiptStatus(emailId) {
  try {
    const receipts = await prisma.receipt.findMany({
      where: { emailId },
      orderBy: { readAt: "desc" },
    });

    return receipts;
  } catch (error) {
    console.error("Error retrieving receipts from database:", error);
    throw new Error("Failed to retrieve receipts");
  }
}

async function trackReceipt(data) {
  try {
    const { token, userAgent, ipAddress } = data;

    const email = await prisma.email.findUnique({ where: { token } });
    if (email) {
      await prisma.receipt.create({
        data: {
          emailId: email.id,
          readAt: new Date(),
          userAgent,
          ipAddress,
        },
      });
    }
  } catch (error) {
    console.error("Error tracking receipt:", error);
    throw new Error("Failed to track receipt");
  }
}

async function markAsSelfRead(data) {
  const { id, readBySelf } = data;

  try {
    const receipt = await prisma.receipt.findUnique({
      where: { id: id },
    });

    if (!receipt) {
      throw new Error("Receipt Not Found");
    }

    const updatedReceipt = await prisma.receipt.update({
      where: { id: id },
      data: { readBySelf },
    });

    return updatedReceipt;
  } catch (error) {
    console.error("Error marking receipt as read by self:", error);
    throw new Error("Failed to mark receipt as read by self");
  }
}

export default { trackReceipt, getReceiptStatus, markAsSelfRead };
