import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getEmails(query) {
  try {
    const page = query.page || 1;
    const pageSize = query.pageSize || 10;

    const emailAddress = query.emailAddress;
    const emailAddressId = query.emailAddressId;

    const filterConditions = {};

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    if (emailAddress) {
      filterConditions.recipients = {
        some: {
          emailAddress: {
            email: emailAddress,
          },
        },
      };
    }

    if (emailAddressId) {
      filterConditions.recipients = {
        some: {
          emailAddressId: emailAddressId,
        },
      };
    }

    const emails = await prisma.email.findMany({
      where: filterConditions,
      orderBy: { id: "desc" },
      include: {
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
      skip: skip,
      take: take,
    });

    const totalCount = await prisma.email.count({ where: filterConditions });

    const result = emails.map((email) => ({
      id: email.id,
      subject: email.subject,
      createdAt: email.createdAt,
      token: email.token,
      recipients: email.recipients.map((recipient) => ({
        id: recipient.emailAddress.id,
        email: recipient.emailAddress.email,
        type: recipient.type,
      })),
    }));

    return {
      data: result,
      page,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  } catch (error) {
    console.error("Error retrieving emails:", error);
    throw new Error("Failed to retrieve emails");
  }
}

async function searchEmailAddress(query) {
  try {
    const take = 10;

    // First query: Search for email addresses that start with the query
    let emailAddresses = await prisma.emailAddress.findMany({
      where: { email: { startsWith: query } },
      select: { email: true },
      take: take,
    });

    // TODO: Second Query: Search for email addresses that contain the query
    // if (emailAddresses.length < take) {
    //   const remainingCount = take - emailAddresses.length;

    //   const additionalEmails = await prisma.emailAddress.findMany({
    //     where: {
    //       email: { contains: query },
    //       email: { notIn: emailAddresses.map((address) => address.email) },
    //     },
    //     select: { email: true },
    //     take: remainingCount,
    //   });

    //   emailAddresses = [...emailAddresses, ...additionalEmails];
    // }

    return emailAddresses.map((address) => address.email);
  } catch (error) {
    console.error("Error retrieving email addresses from database:", error);
    throw new Error("Failed to retrieve email addresses");
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
      });

      return email;
    });

    return result;
  } catch (error) {
    console.error("Error creating email:", error);
    throw new Error("Failed to create email");
  }
}

export default { getEmails, createEmail, searchEmailAddress };
