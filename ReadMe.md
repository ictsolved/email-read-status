# Email Read Status

**Email Read Status** is a Node.js application designed for tracking the read status of emails. The application utilizes Prisma for database management and SQLite for storage. It allows users to insert email records for tracking, track read receipts, and also let user to mark self-opened emails.

## Features

1. **Insert Email Record**: Add new email records for tracking along with a unique tracking code.
2. **View List of Emails**: Retrieve and display a list of all tracked emails.
3. **View Read Receipts**: Check the read status and receipts of specific emails.
4. **Mark Emails as Self-opened**: Update the read status as self-opened.

## TODOs

- **Email Address Suggestions in Frontend**: Implement a feature to search for stored email address to show auto-completion suggestion in frontend.
- **Get List of Emails by Email Address**: Create functionality to retrieve a list of emails associated with a specific email address.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [yarn](https://yarnpkg.com/) (Yarn package manager)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ictsolved/email-read-status.git
   cd email-read-status
   ```

2. **Install Dependencies**

   Install the necessary packages using yarn:

   ```bash
   yarn
   ```

3. **Set Up Prisma**

   Initialize Prisma and set up the SQLite database:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the root directory and configure the database URL:

   ```env
   PORT=3000
   DATABASE_URL="file:./email.db"
   URL=http://localhost:3000
   IMAGE_NAME=image.gif
   ```

## Usage

1. **Start the Application**

   Run the application using:

   ```bash
   yarn start
   ```

   The application will start and listen for incoming requests.

2. **Database Migrations**

   For any database schema changes, use Prisma to apply migrations:

   ```bash
   npx prisma migrate dev --name migration-name
   ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes. Ensure that your code follows the project's coding style and includes tests for new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
