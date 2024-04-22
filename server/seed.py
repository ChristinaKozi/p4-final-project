#!/usr/bin/env python3

# Standard library imports
import random
from random import choice as rc, randint

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Review, Product

fake = Faker()

def create_users():
           # make sure users have unique usernames
    users = []
    usernames = []

    for i in range(8):
        
        username = fake.first_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        user = User(
            username=username,
        )

        user.password_hash = user.username + 'password'

        users.append(user)
    return users

def create_products():
    products = []
    for i in range(10):
        product = Product(
            name = fake.name(),
            description = fake.sentence(),
            price = round(random.uniform(1.50, 59.99), 2),
        )
        products.append(product)
    return products

def create_reviews(products, users):
    reviews = []
    for i in range(12):
        review = Review(
            rating = randint(0,5),
            comment = fake.sentence(),
            product_id = rc([product.id for product in products]),
            user_id = rc([user.id for user in users]),
        )
        reviews.append(review)
    return reviews


if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        print("Deleting all records...")
    
        Review.query.delete()
        User.query.delete()
        Product.query.delete()
        

        print("Creating users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Creating products...")
        products = create_products()
        db.session.add_all(products)
        db.session.commit()

        print("Creating reviews...")
        reviews = create_reviews(products, users)
        db.session.add_all(reviews)
        db.session.commit()

        print("Complete.")
