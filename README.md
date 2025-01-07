# Simmer

<!--toc:start-->

- [Simmer](#simmer)
  - [Features](#features)
  - [Database Schema](#database-schema)
  - [Installation](#installation)
  - [Technologies Used](#technologies-used)
  <!--toc:end-->

Simmer is a desktop application built with **ElectronJS**, designed for managing sales of cards from a company to customers. It allows users to track customer details, associate customers with cards, and generate invoices to manage payments. The application is built with **React** and **TailwindCSS** for the frontend, and uses a **Node.js** environment for the backend. The data is stored locally in an **SQLite** database.

## Features

- **Card Management**: Buy cards from companies and sell them to customers.
- **Customer Management**: Track customer details, including contact information and payment status.
- **Invoice Generation**: Create monthly invoices for customers, and add invoices when payments are made.
- **SQLite Database**: Data is saved locally for offline access, using SQLite for storing company, card, customer, and invoice information.
- **Prisma ORM**: Data handling and queries are managed through Prisma for easy and efficient database interaction.

## Database Schema

The project uses an SQLite database with the following models:

- **Company**: Information about the companies selling cards.
- **Offer**: Offers related to the cards being sold.
- **Card**: Cards bought from companies and sold to customers.
- **Customer**: Details about the customers purchasing cards.
- **Invoice**: Invoices generated for customers, including payments.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MuhammadTarek10/simmer.git
   cd simmer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

## Technologies Used

- **ElectronJS**: Framework for building desktop applications.
- **React**: Frontend library for building the user interface.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Node.js**: JavaScript runtime for the backend logic.
- **SQLite**: Local database for storing data.
- **Prisma**: ORM for managing database operations.
