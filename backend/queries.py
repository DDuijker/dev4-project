import email
from flask import request, jsonify, make_response, redirect
from flask_bcrypt import generate_password_hash, check_password_hash
from db import DB
import jwt
import json


def check_login():
    print(request.cookies.get('access_token'))
    return 'asd'


def create_user():
    # Parse all arguments for validity
    args = request.get_json()

    # Make the insert query with parameters
    qry = '''
    INSERT INTO `gebruiker`(`voornaam`,`tussenvoegsel`,`achternaam`,`email`, `wachtwoord`)
    VALUES(:firstname, :infix, :lastname, :email, :password)
    '''

    # Hash the password before inserting
    args['password'] = generate_password_hash(args['password'])

    # Insert the user into the database
    user_id = DB.insert(qry, args)

    print(user_id)
    # Return a message and the user id
    return {"message": "success", "id": user_id}, 201


def get_user():
    qry = '''
    SELECT * FROM `gebruiker` WHERE email =  :email'''
    args = request.form.to_dict()
    print(args["email"])
    email = args["email"]
    opgehaaldeGebruiker = DB.one(qry, {'email': email})

    if not opgehaaldeGebruiker or not check_password_hash(opgehaaldeGebruiker['wachtwoord'], password):
        return 'Not found', 404
    del opgehaaldeGebruiker['wachtwoord']
    json_data = {'gebruiker_id': opgehaaldeGebruiker['gebruiker_id'], 'voornaam': opgehaaldeGebruiker['voornaam'],
                 'tussenvoegsel': opgehaaldeGebruiker['tussenvoegsel'], 'achternaam': opgehaaldeGebruiker['achternaam'],
                 'email': opgehaaldeGebruiker['email']}
    print(opgehaaldeGebruiker, "yeee")
    jsonify(opgehaaldeGebruiker)
    print(type(json_data))
    access_token = jwt.encode(payload=json_data,
                              key="githubdev4keykeykeykey", algorithm="HS256")
    resp = make_response(
        redirect("http://localhost:3000/"))
    resp.set_cookie('access_token', access_token, expires="never")
    return {"message": "success",
            "response": resp}, 200


def get_menu():
    qry = '''
    SELECT menu.naam as gerecht, beschrijving, prijs FROM menu
    WHERE categorie = ?
    '''

    voorgerecht = DB.all(qry, "1")
    hoofdgerecht = DB.all(qry, "2")
    nagerecht = DB.all(qry, "3")
    bijgerecht = DB.all(qry, "4")
    dranken = DB.all(qry, "5")

    menu = {
        "voorgerechten": voorgerecht,
        "hoofdgerechten": hoofdgerecht,
        "nagerechten": nagerecht,
        "bijgerechten": bijgerecht,
        "dranken": dranken
    }
    l = check_login()
    print(l)
    return {"message": "success",
            "menu": menu
            }, 201
