# Challenge Points - Rafael Zavala

This quick project is to show my skills with React.
I am using NextJS TypeScript, RTL, Jest, and some other libraries to get this UI.

## Challenge

Your task is to build an application that queries our mock API and calculates the total income tax for an inputted salary and tax year. You may refer to this resource for context on how to calculate total income tax using margin tax rates: [Tax Rates Calculator](https://investinganswers.com/dictionary/m/marginal-tax-rate)

The application should have a form that accepts two inputs: annual income and the tax year. On form submission, the UI should print either an error or the total income tax for the inputted parameters. Remember, you will need to deal with marginal tax rates. Feel free to use the frontend application framework that you’re most comfortable with.

## Features

- Info toggle.
  Would work if the user toggles the info to see how the system is calculating the tax. It was usefull to test my work and it can be useful for any user.
- Testing edge cases with Jest.
- Isolated tables to test their content with Snapshots.
- Integration of Material UI library for styles.

### Pre-requisites

Install the given API to check yearly ranges for taxes.

## Installation & Running

Install the project dependencies with yarn

```bash
  yarn install
```

Run the project with yarn

```bash
  yarn start
```

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

## Improvements

Thinking about improvements that I would check.

- When the user selects the same year don't ask the API for the brackets table.
- More descriptive errors on the Form. Maybe using Formik and Yup validations.

## Documentation
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

[Tax Rates Calculator](https://investinganswers.com/dictionary/m/marginal-tax-rate)

## Author

Rafael Zavala | Encora MX

- [LinkedIn](https://www.linkedin.com/in/rafael-zavala-lopez-699867140)
