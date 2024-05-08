# Weekday Frontend Interview Assignment: Candidate Application Platform

## Features

- Interactive Job Cards implemented as per [design](https://drive.google.com/file/d/1YMbZDo6GHIpHRSnigklspSUG_KZfWdM7/view).
- Job Dashbaord with filters as mentioned below:

  - Min experience
  - Company name
  - Location
  - Remote/on-site
  - Tech stack
  - Role
  - Min base pay

  Note that some filters might not be work as some data from API is missing

- Infinite Scrolling : Jobs are fetched automatically when user reaches the end of the Job Listing and are added automatically.

  - Implemented using the `Intersection Observer API`

- Fully responsive UI

## Tech Stack

- ReactJS
- Redux Toolkit
- CSS
- Material UI

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and `npm` on your machine.
- You have cloned this repository to your local machine.

## Installation

To install the dependencies, follow these steps:

1. Navigate to the project directory in your terminal.
2. Run the following command:
   ```sh
   npm install
   ```

## Usage

To run the project locally, follow these steps:

1. Ensure you are in the project directory in your terminal.
2. Run the following command:

   ```sh
   npm run dev --host
   ```

3. Your terminal will now show a set of links. Hover the mouse pointer over the link

- `Local` : This is to preview on your local system
- `Network` : This is to preview over other devices connected to the same network as your local system

## Contributing

Contributions are welcome! Please create a new branch for your changes and submit a pull request.
