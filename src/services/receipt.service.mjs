import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function emailReceipts(emailId) {
  try {
    const receipts = await prisma.receipt.findMany({
      orderBy: { readAt: "desc" },
      where: { emailId },
    });
    return receipts;
  } catch (error) {
    console.error("Error retrieving email receipts from database:", error);
    throw new Error("Failed to retrieve email receipts");
  }
}

async function latestReceipts() {
  try {
    const queryOptions = {
      orderBy: { readAt: "desc" },
      where: { readBySelf: false },
      take: 10,
      include: {
        email: {
          select: {
            id: true,
            subject: true,
            recipients: {
              select: {
                type: true,
                emailAddress: {
                  select: {
                    id: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    };

    const receipts = await prisma.receipt.findMany(queryOptions);

    return receipts.map((receipt) => ({
      id: receipt.id,
      readAt: receipt.readAt,
      userAgent: receipt.userAgent,
      ipAddress: receipt.ipAddress,
      email: {
        id: receipt.email.id,
        subject: receipt.email.subject,
        recipients: receipt.email.recipients.map((recipient) => ({
          id: recipient.emailAddress.id,
          email: recipient.emailAddress.email,
          type: recipient.type,
        })),
      },
    }));
  } catch (error) {
    console.error("Error retrieving latest receipts from database:", error);
    throw new Error("Failed to retrieve latest receipts");
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

export default {
  trackReceipt,
  emailReceipts,
  latestReceipts,
  markAsSelfRead,
};
