# 📧 **Email Read Status**

Welcome to **Email Read Status**! 🚀 This Node.js application is designed to efficiently track the read status of your emails. Utilizing Prisma for database management and SQLite for storage, this app lets you track, manage, and interact with email records effortlessly.

## 🛠️ **Features**

- **Add New Email Records**: Insert and track emails with a unique tracking code. 📧
- **View All Emails**: Retrieve and display a list of all tracked emails. 📜
- **Track Read Receipts**: Check read status and receipts for specific emails. 👁️
- **Mark Self-opened Emails**: Update read status for emails opened by yourself. 🖥️
- **List Emails by Address**: Retrieve emails associated with a specific email address. 📋
- **Latest Receipts**: See the last 10 read receipts (useful in frontend for notification). 🔔
- **Email Address Search**: Search for stored email addresses (useful for autocomplete suggestions in frontend). 🔍

## 📋 **Prerequisites**

Ensure you have the following installed before getting started:

- [Node.js](https://nodejs.org/) (version 14 or higher) 🟢
- [Yarn](https://yarnpkg.com/) (Yarn package manager) 🧶

## 🏗️ **Installation**

Follow these steps to set up your environment:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ictsolved/email-read-status.git
   cd email-read-status
   ```

2. **Install Dependencies**:

   Install necessary packages using Yarn:

   ```bash
   yarn
   ```

3. **Set Up Prisma**:

   Initialize Prisma and set up the SQLite database:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Configure Environment Variables**:

   Create a `.env` file in the root directory and configure the following settings:

   ```env
   PORT=3000
   DATABASE_URL="file:./email.db"
   URL=http://localhost:3000
   IMAGE_NAME=image.gif
   ```

## 🚀 **Usage**

1. **Start the Application**:

   Run the application with:

   ```bash
   yarn start
   ```

   Your application will start and listen for incoming requests on the specified port. 🎉

2. **Database Migrations**:

   To apply any changes to the database schema, use Prisma to run migrations:

   ```bash
   npx prisma migrate dev --name migration-name
   ```

## 🤝 **Contributing**

We welcome contributions! 🎉 To contribute:

1. **Fork the Repository**: Create your own fork of the repository.
2. **Create a Branch**: Make changes in a separate branch.
3. **Submit a Pull Request**: Open a pull request with your proposed changes.

Please ensure that your code adheres to the project's coding style and includes tests for new features. 🧪

## 📜 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details. 📄
