from flask import Flask

day4 = Flask(__name__)

@day4.route('/')
def hello_world():
    return "Hello World!!"

if __name__ == '__main__':
    day4.run(debug=True)
