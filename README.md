# Kong Gateway Service Sanity Test

A proof-of-concept (PoC) project for testing the Gateway Service Manager in the Kong platform.

## Overview

This project consists of two main parts:

1. **Test Documentation**: [Test strategy](https://github.com/shengdancheng/kongtestpoc/blob/main/test_doc/Test%20Strategy_service_route_sanity_test.docx).
2. **End-to-End (E2E) Automation Testing**: Implemented using [Cypress.io](https://www.cypress.io/), an open-source testing framework.

## Run Tests

### Local testing

To run the tests from this repo on your local machine, first make sure your machine meets the [Cypress System Requirements](https://on.cypress.io/guides/getting-started/installing-cypress#System-requirements), including the installation of [Node.js](https://docs.cypress.io/guides/getting-started/installing-cypress#Installing-Nodejs).
Make sure [docker-compose](https://docs.docker.com/compose/install/) is installed.

Follow these steps to clone the repository, install dependencies, and execute the Cypress tests:

```shell
git clone https://github.com/shengdancheng/kongtestpoc.git
cd kongtestpoc
npm ci # Install dependencies
npm run app:start # Start Kong Gateway Manager. http://localhost:8002/
npm run e2e:run # Run all test cases under folder cypress/e2e in chrome, then generate results under folder ./cypress/results and all-in-one report under folder ./cypress/report
npm run app:stop # Stop Kong Gateway Manager.
```

If you would like to run Cypress tests interactively, `cypress:open` is a [package.json](./package.json) script that starts a local webserver and then uses [cypress run](https://docs.cypress.io/guides/guides/command-line#cypress-run) to run Cypress in headed mode.You can pick individual tests to run.

## Project Design

### Scope

According to this assignment requirement, the test scope covers two workflow, creating a service and add a route.
The automation test cases only cover these two workflow.

### Test Case Design

Refer to [Gateway document](https://docs.konghq.com/gateway/latest/kong-manager/get-started/services-and-routes/), for designing test cases involving the addition, updating, and deleting services and routes for existing services. These test cases should cover positive, negative, and edge cases. 

*(Due to domain knowledge limitation, mandatory properties and tag property are only covered in test workflow.Part of negative test case and edge test cases are based on my test experiment and assumption.)*

### Automation Test Case Design
The following two principles guide the design of the automation test cases:

1. **"Automation script resembles manual test descriptions"**:

The test automation scripts mirror manual test case steps as closely as possible, making them easier to understand and maintain.

2. **"Ease of use and maintainability"**:

The test framework is designed to be simple to use and maintain, minimizing technical debt.

**Page Objects**
In UI automation, maintaining test scripts can become challenging when changes in the DOM (Document Object Model) affect test stability. To minimize this, the project uses Page Objects located in the ./cypress/pageObjects. These page objects abstract DOM element references, so changes in the DOM only need to be updated in a single place, reducing maintenance effort.
- Each function in the page object follows standard JavaScript [naming conversion](https://www.w3schools.com/js/js_conventions.asp) for readability.

- Function names align with steps in manual test cases, so developers can easily find and reuse them, reducing the effort required to maintain both manual and automated tests.

| Page Object     | Page Screenshot|
| :---        |    :----:   |
| ServiceOverview     |  <img src="https://github.com/shengdancheng/kongtestpoc/blob/main/img/service_overview.png" width="700" height="150" />| 
| ServiceConfig   | <img src="https://github.com/shengdancheng/kongtestpoc/blob/main/img/service_config.png" width="700" height="300" />       |
| ServiceEditor  |  <img src="https://github.com/shengdancheng/kongtestpoc/blob/main/img/service_editor.png" width="700" height="300" />         |
| RouteOverview  | <img src="https://github.com/shengdancheng/kongtestpoc/blob/main/img/route_overview.png" width="700" height="300" />        | 
| RouteConfig  | <img src="https://github.com/shengdancheng/kongtestpoc/blob/main/img/route_config.png" width="700" height="300" />        |
| RouteEditor  | <img src="https://github.com/shengdancheng/kongtestpoc/blob/main/img/route_editor.png" width="700" height="300" />       |

*(Note:In this project, only the pages mentioned above are considered during the design of the page objects.)*

**Test Case Implementation**

One guiding principle is to ensure the correctness of each step in the automation process.

For stability, the tests include validation steps after each action to verify that the system behaves as expected. For example, after clicking the "New Gateway Service" button on the service page, the test will ensure that the "New Gateway Service" page is correctly opened before proceeding to fill in the service details. This ensures that each step is performed successfully before moving on to the next, improving overall test reliability.

## TODO

These items listed will be more considered in future work.

1. **Improved App Lifecycle Management**:
   Explore better ways to start/stop the Kong app, potentially leveraging the Cypress API [before:run](https://docs.cypress.io/api/plugins/before-run-api#__docusaurus_skipToContent_fallback) ?

2. **Enhanced Test Results Management**:
   Consider saving test results into a database and visualizing them using a dashboard tool like [Grafana](https://grafana.com/), for easier tracking of build results.

3. **Enhanced Github Action Workflow**:
   Add a step for 'Failure Notifications' in the existing 'test' workflow to ensure that relevant stakeholders are notified if tests fail. You can integrate this using Email or Slack.

   Additionally, consider adding a workflow triggered by the 'pull_request' event. Running tests on pull requests ensures that code changes submitted by contributors or other branches are validated before being merged into the main branch.
