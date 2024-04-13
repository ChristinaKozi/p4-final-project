#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Product, Order


# Views go here!
class Home(Resource):
    def get(self):
        return 'Project Server'
    
api.add_resource(Home, '/')

class Signup(Resource):
    def post(self):
        data = request.get_json()
        try:
            user = User(
                username = data.get('username'),
            )
            password_hash = data.get('password')
            user.password_hash = password_hash

            if user:
                db.session.add(user)
                db.session.commit()
                session["user_id"] = user.id
                return make_response(user.to_dict(), 201)
        except IntegrityError:
            return make_response({'error':"Username must be unique"}, 422)
        except ValueError as err:
            return make_response({'error':str(err)}, 422)
        
api.add_resource(Signup, '/signup', endpoint='signup')

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        try:
            if user_id is not None:
                user = User.query.filter(User.id == user_id).first()
                return make_response(jsonify(user.to_dict()), 200)
        except:
            return make_response({'message':'Session Unavailable'}, 401)
    
api.add_resource(CheckSession, '/checksession', endpoint = 'checksession')

class Login(Resource):

    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        try:
            user = User.query.filter(User.username==username).first()
            if user and user.authenticate(password):
                session['user_id'] = user.id
                return make_response(user.to_dict(), 200)
            else:
                return make_response({'error': 'Invalid username or password'}, 401)
        except IntegrityError:
            return make_response({'error': 'Database integrity error'}, 500)
        except Exception as e:
            return make_response({'error': str(e)}, 500)


api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({'message':'Logged out'}, 401)

api.add_resource(Logout, '/logout', endpoint = 'logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

