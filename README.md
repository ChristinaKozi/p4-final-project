# Phase 4 Full-Stack Application Project

## Introduction

This is a Flask-React application that represents a forum where users can view products, leave reviews(edit and delete them), and add products as well. The application opens initially to a signup/login menu and authenticates users to make sure they have gained access to the product list as well as have to power to edit and delete their own product reviews.

## Setup

### `server/`

The `server/` directory contains all of your backend code and `app.py` is the Flask application. 

The project contains a `Pipfile` with this projects dependencies.

To download the dependencies for the backend server, run:

```console
pipenv install
pipenv shell
```

You can run your Flask API on [`localhost:5555`](http://localhost:5555) by
running:

```console
python server/app.py
```

### `client/`

The `client/` directory contains all of the frontend code. The file
`package.json` has been configured with the necessary React application dependencies.

To download the dependencies for the frontend client, run:

```console
npm install --prefix client
```

You can run your React app on [`localhost:3000`](http://localhost:3000) by
running:

```sh
npm start --prefix client
```

Check that your the React client displays a default page
`http://localhost:3000`. You should see the login page of the React app.

### src/components/
#### `NavBar.js`
NavBar is, as the name implies, the navigation bar for the application providing an authorized user access to different routes housed within the NavBar. The navigation links are implemented using the NavLink component from React Router.

The handleLogoutClick function sends a DELETE request to the server when the user clicks the "Logout" button. 

#### `App.js`
This React component serves as the main entry point for the application. It utilizes the useContext hook to access the user context, determining whether a user is logged in or not. If no user is detected, it renders the Login component, prompting the user to log in. Once logged in, it renders the Home component, providing access to the main functionality of the application. 

#### `LoginForm.js`
LoginForm is responsible for rendering a login form and handling user authentication. It utilizes useState to manage loading state and error messages. The useContext hook is used to access the setUser function from the UserContext, enabling the component to update the global user state upon successful login.

The handleSubmit function sends a POST request to the server with the login credentials provided by the user then sets the user in the context or displays errors to the user.

Form validation is implemented using the Yup library, ensuring that the username and password meet certain criteria (minimum length and presence) as well as managing form state, validation, and submission.

#### `SignUpForm.js`
SignUpForm is similar to LoginForm but instead of fetching an existing user, it sends a POST request to the server to create a new user and add then to the database. Once created, the user is logged in.

#### `ProductCard.js`
ProductCard represents a card displaying information about a specific product. It includes the product's name, description, and price, along with an option to display or hide reviews for the product that is toggled in state view the handleClick function.

The reviewList variable maps through the list of reviews for the product and generates ReviewCard components for each review.

#### `ReviewCard.js`
ReviewCard is a card displaying details of a review for a product. It includes the user's rating and comment for the product, along with options to edit or delete the review. 

The component checks which user is logged in, enabling editing or deletion of the review if it belongs to the current user.

The handleEdit function toggles the editing state, allowing the user to modify the review. The handleDeleteReview function sends a DELETE request to the server to delete the review when the "Delete Review" button is clicked. Upon successful deletion, it updates the list of reviews displayed.

### src/contexts/
#### `UserContext.js`
UserContext context object created to share user data across components.
UserProvider manages the user data and provides it to its children components. useEffect performs auto-login by sending a request to check the session on reload. If the session id is found, it sets the user data.

#### `ProductContext.js`
This is a context object created to share product data across components. The ProductProvider component is a provider for the ProductContext. useEffect fetches product data from the server when the user changes. It updates the products state accordingly.

### src/pages/
#### `ErrorPage.js`
Displays error message on the page when there is a failure.

#### `Home.js`
This component gets rendered when a user is logged in. It welcomes the user and provides a brief description of the app's functionalities.

#### `Login.js`
The Login component renders when a user is not logged in. It utilizes state via a button click function to toggle between the LoginForm component and the SignUpForm component. 

#### `Products.js`
Provided the user is valid and logged in, the products page displays a list of products. It maps through the products array and generates a ProductCard component for each product, passing the product object and the user object as props.

#### `ProductForm.js`
The ProductForm component is a page that can be found through the NavBar that enables users to create a new product. The handleSubmit sends a POST request to create a new product. If successful, it updates the products state with the new product to be rendered on the Products page. The useFormik hook is used to manage form state, validation, and submission.

#### `Globals.js`
Contains headers to be used in fetch requests.

#### `index.js`
The main component of the application, where the UI and functionality are defined. It configures routing and renders the application's main components (App) wrapped with User and Product context providers as well as the router provider, which mounts them in the HTML document's "root" container.

#### `routes.js`
Contains a list of routing objects consisting of the path, the element, and the errorElement.

## Working With Your Database

Change into the `server` directory:

```console
cd server
```

If you wish to edit, add to, or update the databse, enter the commands below to do so:

```
flask db migrate
flask db upgrade head
```
or 
```
flask db revision --autogenerate -m'<descriptive message>'
flask db upgrade head
```

#### `config.py`

Here I've outline the necessary imports to run the backend. You will find also the code that instantiates the app with REST API and sets its attributes. 

#### `app.py`

app.py houses all of the functionalities that the database carries out. Below is a brief description of each function:

-Signup: Handles user registration and returns the new user.
-CheckSession: Checks if a user session is active and returns the user object.
-Login: Authenticates users based on username and password.
-Logout: Clears the current user session.
-Users: Retrieves a list of all users.
-Products: Retrieves all products or creates a new product.
-ProductsById: Retrieves, updates, or deletes a specific product by its ID.
-Reviews: Retrieves all reviews or creates a new review.
-ReviewsByID: Retrieves, updates, or deletes a specific review by its ID.

#### `models.py`
Here you'll find three models: User, Review, Product. The models User and Product share a many to many relationship via Reviews as it has having a one to many relationship to both User and Product.

#### `seed.py` 
The seed file contains test data for the application from the faker import, which you can compile by running:

```console
python server/seed.py
```

### Deployment

This app can be run on two seperate terminals running the front and backend independantly. It can also be run simultaneously on one terminal.
Make sure to first build the production version of the app using this command:

```console
npm run build --prefix client
```

Followed by gunicorn command in your CLI to start the application:

```console
gunicorn --chdir server app:app
```
This may be useful when deploying as only one terminal is needed with that command. Further, The requirement.txt file is included in the files but if any changes are made to the pipfile, they need to reflected in the requirement file by running:

```console
pipenv requirements > requirements.txt
```

### Conclusion
Hope you enjoy playing around with all the possibilities of this app!
