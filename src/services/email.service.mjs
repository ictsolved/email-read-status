import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getEmails() {
  try {
    const emails = await prisma.email.findMany({ orderBy: { id: "desc" } });
    return emails;
  } catch (error) {
    console.error("Error retrieving emails:", error);
    throw new Error("Failed to retrieve emails");
  }
}

async function createEmail(data) {
  try {
    const { subject, recipients } = data;

    const result = await prisma.$transaction(async (prisma) => {
      const email = await prisma.email.create({
        data: {
          subject,
          token: nanoid(),
          recipients: {
            create: await Promise.all(
              recipients.map(async (recipient) => {
                const recipientEmail = recipient.recipient;

                let emailAddress = await prisma.emailAddress.findUnique({
                  where: { email: recipientEmail },
                });

                if (!emailAddress) {
                  emailAddress = await prisma.emailAddress.create({
                    data: { email: recipientEmail },
                  });
                }

                const emailAddressId = emailAddress.id;

                return {
                  emailAddressId,
                  type: recipient.type,
                };
              })
            ),
          },
        },
        include: {
          recipients: {
            include: {
              emailAddress: true,
            },
          },
        },
      });

      return email;
    });

    return result;
  } catch (error) {
    console.error("Error creating email:", error);
    throw new Error("Failed to create email");
  }
}

export default { getEmails, createEmail };
