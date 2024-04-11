from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-orders.user',)

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable = False)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("password_hash is not accessible")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    orders = db.relationship('Order', back_populates = 'user', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.id}: {self.name}'

class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'
    serialize_rules = ('-orders.product',)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    price = db.Column(db.Float)

    orders = db.relationship('Order', back_populates = 'product', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Product {self.id}: {self.name}'

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    serialize_rules = ('-user.orders','-product.orders',)

    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Float)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates = 'orders')
    product = db.relationship('Product', back_populates = 'orders')

    def __repr__(self):
        return f'<Order {self.id}'



    

    

    
