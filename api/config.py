import os
from dotenv import load_dotenv

db_passwd = os.getenv('MONGO_PASS')


class DBConfig:
    MONGO_URI = f'mongodb+srv://mandarcofiato87:{db_passwd}@cluster0.pontizx.mongodb.net/?retryWrites=true&w=majority'


class AppConfig:
    DEBUG = False
