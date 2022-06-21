import json
from flask import request, jsonify, make_response
from flask_bcrypt import generate_password_hash, check_password_hash
from db import DB
from flask_jwt_extended import (jwt_required, get_jwt_identity)
import jwt


def my_reservations():
    token = request.headers['Authorization'].split(' ')[1]
    decoded = jwt.decode(token, key='secret', algorithms=['HS256'])
    user_id = decoded['id']

    if user_id:
        qry = '''
        SELECT * FROM reservatie WHERE gebruiker_id = :id
        '''
        reservations = DB.all(qry, decoded)
        return {"message": "success",
                "reservations": reservations}, 200
    else:
        return {"message": "error",
                "error": "No token"}, 401

<< << << < HEAD
== == == =

def post_reservation():
    # Parse all arguments for validity
    args = request.json
    print(args)
    token = args['token']
    decoded = jwt.decode(token, key='secret', algorithms=['HS256'])
    print(decoded)
    user_id = decoded['id']
    print(user_id)
    # add user id to args
    args['user_id'] = user_id

    # Make the insert query with parameters
    qry = '''
    INSERT INTO `reservatie`(`gebruiker_id`, `aantal_personen`, `datum`, `tijd`, `bericht`, `voorkeur_locatie`, `voorkeur_verdieping`, `voorkeur_zitting`, `tijd_van_reservatie`)
    VALUES(:user_id ,:aantal_personen, :date, :time, :text, :voorkeur_locatie, :voorkeur_verdieping, :voorkeur_zitting, :tijd_van_reservatie)
    '''

    # Insert into the database
    reservatie_id = DB.insert(qry, args)

    print(reservatie_id)
    # Return a message and the user id
    return {"message": "success", "id": reservatie_id}, 201

# def me():
#     token = request.headers['Authorization']
#     user = jwt.decode(token, key='secret', algorithms=['HS256'])
#
#     if not request.cookies.get('access_token'):
#         return {"message": "error",
#                 "response": "no token"}, 401
#     else:
#         # decode the token
#         try:
#             payload = jwt.decode(request.cookies.get('access_token'), key='secret', algorithms=['HS256'])
#             print(payload)
#             return {"message": "success",
#                     "response": payload}, 200
#         except jwt.ExpiredSignatureError:
#             return {"message": "error",
#                     "response": "token expired"}, 401
#         except jwt.InvalidTokenError:
#             return {"message": "error",
#                     "response": "token invalid"}, 401
#         except Exception as e:
#             print(e)
#             return {"message": "error",
#                     "response": "token invalid"}, 401
>> >> >> > 2
ce72c7d41a0526f2d40d6d00d2f9dcfa36a2738


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


def login():
    # Parse all arguments for validity
    args = request.json

    print(args)
    qry = '''
        SELECT * FROM `gebruiker` WHERE email = :email
        '''

    try:
        user = DB.one(qry, args)

        print(user)
        if user:
            # if the password is correct, generate a token
            if check_password_hash(user['wachtwoord'], args['password']):

                # make access token
                access_token = jwt.encode({
                    'id': user['gebruiker_id'],
                    'email': user['email'],
                    'firstname': user['voornaam'],
                    'infix': user['tussenvoegsel'],
                    'lastname': user['achternaam']
                }, key='secret', algorithm='HS256')
                resp = make_response()
                # make access token expire in 12 hours
                # make cookie
                resp.set_cookie('access_token', access_token,
                                expires=12 * 60 * 60)

                decoded = jwt.decode(
                    access_token, key='secret', algorithms=['HS256'])

                return {"message": "success",
                        "user-id": user['gebruiker_id'],
                        "user": decoded,
                        "token": access_token
                        }, 200

            else:
                return {"message": "error",
                        "response": "wrong password"}, 401
    except Exception as e:
        print(e)
        return {"message": "error",
                "error": "Er gaat iets mis"}, 404
    else:
        return {"message": "error",
                "response": "user not found"}, 401


def staff_login():
    args = request.json

    qry = '''
    SELECT * FROM `medewerker` WHERE email = :email
    '''

    try:
        staff = DB.one(qry, args)
        print(staff)
        if staff:
            # if the password is correct, generate a token
            if staff['wachtwoord'] == args['password']:

                # make access token
                access_token = jwt.encode({
                    'id': staff['medewerker_id'],
                    'email': staff['email'],
                    'firstname': staff['voornaam'],
                    'infix': staff['tussenvoegsel'],
                    'lastname': staff['achternaam']
                }, key='secret', algorithm='HS256')
                resp = make_response()
                # make access token expire in 12 hours
                # make cookie
                resp.set_cookie('access_token', access_token,
                                expires=12 * 60 * 60)

                decoded_staff = jwt.decode(
                    access_token, key='secret', algorithms=['HS256'])

                print(decoded_staff)
                return {"message": "success",
                        "staff-id": staff['medewerker_id'],
                        "staff": decoded_staff,
                        "staff_token": access_token
                        }, 200
            else:
                return {"message": "error",
                        "response": "wrong password"}, 401

    except Exception as e:
        print(e)
        return {"message": "error",
                "error": "Er gaat iets mis"}, 404
    else:
        return {"message": "error",
                "response": "Staff member not found"}, 401


def get_reservatie():
    qry = '''
    SELECT reservatie_id as id, aantal_personen, datum, tijd FROM `reservatie`'''

    reservatie_info = DB.all(qry)

    return {
               "message": "success",
               "reservatie": reservatie_info

           }, 201


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

    return {"message": "success",
            "menu": menu
            }, 201


def get_gallery():
    qry = '''SELECT naam FROM gallerij '''

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

<< << << < HEAD
# def me():
#     token = request.headers['Authorization']
#     user = jwt.decode(token, key='secret', algorithms=['HS256'])
#
#     if not request.cookies.get('access_token'):
#         return {"message": "error",
#                 "response": "no token"}, 401
#     else:
#         # decode the token
#         try:
#             payload = jwt.decode(request.cookies.get('access_token'), key='secret', algorithms=['HS256'])
#             print(payload)
#             return {"message": "success",
#                     "response": payload}, 200
#         except jwt.ExpiredSignatureError:
#             return {"message": "error",
#                     "response": "token expired"}, 401
#         except jwt.InvalidTokenError:
#             return {"message": "error",
#                     "response": "token invalid"}, 401
#         except Exception as e:
#             print(e)
#             return {"message": "error",
#                     "response": "token invalid"}, 401
== == == =

def get_reservatie():
    qry = '''
    SELECT reservatie_id as id, aantal_personen, datum, tijd FROM `reservatie`'''

    reservatie_info = DB.all(qry)

    return {
               "message": "success",
               "reservatie": reservatie_info

           }, 201

>> >> >> > 2
ce72c7d41a0526f2d40d6d00d2f9dcfa36a2738
