from flask import request, jsonify, make_response, redirect, url_for
from flask_bcrypt import generate_password_hash, check_password_hash
from db import DB
import jwt


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
    SELECT * FROM `gebruiker` WHERE email =  ?'''
    args = request.get_json()
    given_email = args["email"]
    password = args["password"]
    # opgehaalde_gebruiker = DB.one(qry, {'email': given_email})
    opgehaalde_gebruiker = DB.one(qry, [given_email])

    print(opgehaalde_gebruiker)

    # het gaat hier fout

    if not opgehaalde_gebruiker or not check_password_hash(opgehaalde_gebruiker['wachtwoord'], password):
        return 'Not found', 404

    del opgehaalde_gebruiker['wachtwoord']
    json_data = {'gebruiker_id': opgehaalde_gebruiker['gebruiker_id'],
                 'voornaam': opgehaalde_gebruiker['voornaam'],
                 'tussenvoegsel': opgehaalde_gebruiker['tussenvoegsel'],
                 'achternaam': opgehaalde_gebruiker['achternaam'],
                 'email': opgehaalde_gebruiker['email']}
    jsonify(opgehaalde_gebruiker)
    access_token = jwt.encode(payload=json_data,
                              key="githubdev4keykeykeykey", algorithm="HS256")
    resp = make_response()
    resp.set_cookie('access_token', access_token, expires="never")
    print(resp)
    return resp


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


def get_gallery():
    qry = '''SELECT * FROM gallerij '''

    gallerij = DB.all(qry)

    return {
        "message": "success",
        "gallerij": gallerij
    }, 201
    
def get_staff():
    qry = '''
    SELECT medewerker_id as id, voornaam, tussenvoegsel, achternaam, foto, titel, beschrijving FROM `medewerker`'''

    medewerker_info = DB.all(qry)

    return {
               "message": "success",
               "medewerkers": medewerker_info
           }, 201
