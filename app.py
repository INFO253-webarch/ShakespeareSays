#!/usr/bin/env python
import shelve
from subprocess import check_output
import flask
from flask import request, Flask, render_template, jsonify, abort, redirect
from os import environ

import os
import sys
import json
import hashlib
import random
import string
import csv

app = flask.Flask(__name__)
app.debug = True

# Database/Dictionary to save shortened URLs
redirect_db = shelve.open("shorten.db")
backwards_db = shelve.open("lengthen.db")

with open('quotes.csv', newline='', encoding='latin-1') as f:
    raw_quotes = list(csv.reader(f))

quotes = []
for rq in raw_quotes:
    q = ''.join(x for x in rq[0] if x not in string.punctuation)
    quotes.append('-'.join(q.split()))


@app.route('/')
def index():
    """
    Builds a template based on a GET request, with some default
    arguments
    """

    return flask.render_template('index.html')

###
# Now we'd like to do this generally:
# <short> will match any word and put it into the variable =short= Your task is
# to store the POST information in =db=, and then later redirect a GET request
# for that same word to the URL provided.  If there is no association between a
# =short= word and a URL, then return a 404
###

@app.route("/create", methods=['POST'])
def create():
    """
    This POST request creates an association between a short url and a full url
    and saves it in the database (the dictionary db)
    """

    short_url = request.form.get("short_url")
    long_url = request.form.get("long_url")
    
    if not short_url:
        short_url = ''.join(random.choice(quotes))
    if long_url in backwards_db:
        short_url = backwards_db[long_url]
    else:
        redirect_db[short_url] = long_url
        backwards_db[long_url] = short_url


    return render_template("success.html", 
                           short_url=short_url, 
                           long_url=long_url)    


@app.route('/test_create/<create_url>', methods=['GET'])
def test_create(create_url):
    redirect_db[create_url] = 'http://www.google.com'
    return('Added short url {} to redirect to google'.format(create_url))


@app.route("/short/<short_url>", methods=['GET'])
def redirect_to_short(short_url):
    print('short in redirect', short_url)
    """
    Redirect the request to the URL associated =short=, otherwise return 404
    NOT FOUND
    """
    if redirect_db.get(short_url):
        if not redirect_db[short_url][:7] == 'http://':
            redirect_url = 'http://' + redirect_db[short_url]
        else:
            redirect_url = redirect_db[short_url]

        return redirect(redirect_url, code=302) 
    else:
        return (abort(404))


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

    
if __name__ == "__main__":
    app.run()
