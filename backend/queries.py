from flask import request, make_response
from flask_bcrypt import generate_password_hash, check_password_hash
from db import DB
import jwt


def reservatie():
    if request.method == 'GET':
        return get_reservation()
    elif request.method == 'PATCH':
        return patch_reservation()
    elif request.method == 'DELETE':
        return delete_reservation()


def my_reservations():
    token = request.headers['Authorization'].split(' ')[1]
    decoded = jwt.decode(token, key='secret', algorithms=['HS256'])
    user_id = decoded['id']

    if user_id:
        # order by date and time
        qry = '''
        SELECT * FROM reservatie WHERE gebruiker_id = :id ORDER BY date, timeStart ASC
        '''
        reservations = DB.all(qry, decoded)
        return {"message": "success",
                "reservations": reservations}, 200
    else:
        return {"message": "error",
                "error": "No token"}, 401


def get_one_table():
    args = request.json
    print(args)
    if args['id']:
        qry = '''SELECT * FROM `tafel` WHERE tafel_id = :id'''

        table = DB.all(qry, args)

    return {
               "message": "success",
               "table": table
           }, 201


def tables():
    token = request.headers['Authorization'].split(' ')[1]
    decoded = jwt.decode(token, key='secret', algorithms=['HS256'])
    staff_id = decoded['id']
    if staff_id:
        if request.method == 'GET':
            return get_tables()
        elif request.method == 'POST':
            return add_tables()
        elif request.method == 'PATCH':
            return patch_tables()
        elif request.method == 'DELETE':
            return delete_tables()


def delete_tables():
    args = request.json

    # check if the table has any reservations
    qry = '''
    SELECT * FROM `reservatie` WHERE tafel_id = :id
    '''

    reservation = DB.all(qry, args)
    if reservation:
        return {"message": "error",
                "error": "Table has reservations"}, 404
    else:
        qry = '''
        DELETE FROM `tafel` WHERE tafel_id = :id
        '''
        DB.delete(qry, args)
        return {"message": "success"}, 200


def patch_tables():
    args = request.json
    print(args)
    qry = '''
    UPDATE `tafel` SET aantal_personen = :aantal_personen, locatie = :locatie, verdieping = :verdieping, type_zitting = :type_zitting WHERE tafel_id = :id
    '''

    DB.update(qry, args)

    qry_updated_table = '''
    SELECT * FROM `tafel` WHERE tafel_id = :id
    '''

    updated_table = DB.one(qry_updated_table, args)

    return {"message": "success",
            "updated_table": updated_table}, 200


def get_tables():
    # get all the tables
    qry = ''' SELECT * FROM `tafel` '''

    all_tables = DB.all(qry)

    if all_tables:
        return {
            "message": "success",
            "tables": all_tables
        }, 200
    else:
        return {
            "message": "error",
            "error": "No tables found"
        }, 404


def add_tables():
    args = request.json

    qry = '''
    INSERT INTO `tafel` (aantal_personen, locatie, verdieping, type_zitting) VALUES (:aantal_personen, :locatie, :verdieping, :type_zitting)
    '''

    if args['aantal_personen'] and args['locatie'] and args['verdieping'] and args['type_zitting']:
        DB.insert(qry, args)
        return {"message": "success"}, 201
    else:
        return {"message": "error",
                "error": "No arguments"}, 404


def get_reservation():
    qry = '''
    SELECT reservatie_id as id, aantal_personen, aantal_kinderstoelen, tafel_id, date, timeStart, timeEnd, bericht , voorkeur_locatie, voorkeur_verdieping, voorkeur_zitting, voorkeur_vervoer, gebruiker.voornaam, gebruiker.tussenvoegsel, gebruiker.achternaam FROM `reservatie`
    INNER JOIN gebruiker ON gebruiker.gebruiker_id = reservatie.gebruiker_id ORDER BY date, timeStart ASC'''

    reservatie_info = DB.all(qry)

    return {
        "message": "success",
        "reservatie": reservatie_info

    }, 201


def get_one_reservation():
    # get argument from url
    print(request.args)
    print(request.method)
    args = request.json

    print(args)
    if args['id']:
        qry = '''
        SELECT * FROM `reservatie` WHERE tafel_id = :id
        '''
        reservation = DB.one(qry, args)
        if reservation:
            return {"message": "success",
                    "reservation": reservation}, 200
        else:
            return {"message": "error",
                    "error": "No reservation found"}, 404
    else:
        return {"message": "error",
                "error": "No id"}, 404


def patch_reservation():
    args = request.json
    print(args)
    # catch an error
    if not args['id']:
        return {"message": "error",
                "error": "No id"}, 404
    qry = '''
    UPDATE `reservatie` SET aantal_personen = :aantal_personen, aantal_kinderstoelen = :aantal_kinderstoelen, tafel_id = :tafel_id, date = :date, timeStart = :timeStart, timeEnd = :timeEnd, bericht = :bericht, voorkeur_locatie = :voorkeur_locatie, voorkeur_verdieping = :voorkeur_verdieping, voorkeur_zitting = :voorkeur_zitting, voorkeur_vervoer = :voorkeur_vervoer WHERE reservatie_id = :id
    '''

    DB.update(qry, args)

    qry_updated_reservation = '''
    SELECT * FROM `reservatie` WHERE reservatie_id = :id
    '''

    updated_reservation = DB.one(qry_updated_reservation, args)

    return {"message": "success",
            "updated_reservation": updated_reservation}, 200


def delete_reservation():
    args = request.json
    print(args)

    qry = '''
    DELETE FROM `reservatie` WHERE reservatie_id = :id
    '''

    DB.delete(qry, args)

    return {"message": "success"}, 200


def post_reservation():
    # Parse all arguments for validity
    args = request.json
    token = args['token']
    decoded = jwt.decode(token, key='secret', algorithms=['HS256'])
    user_id = decoded['id']

    # add user id to args
    args['user_id'] = user_id

    # Link a table to the reservation

    # make args[aantal_personen] into integer
    args['aantal_personen'] = int(args['aantal_personen'])

    # check if aantal_personen in reservatie is the same as aantal_personen in tafel
    qry = '''
    SELECT tafel_id FROM `tafel` WHERE tafel.aantal_personen = :aantal_personen
    '''
    # if voorkeuren is not "geen" then add to the query
    if args["voorkeur_locatie"] != "geen":
        qry += ''' AND tafel.locatie = :voorkeur_locatie'''
    if args["voorkeur_verdieping"] != "geen":
        qry += ''' AND tafel.verdieping = :voorkeur_verdieping'''
    if args["voorkeur_zitting"] != "geen":
        qry += ''' AND tafel.type_zitting = :voorkeur_zitting'''

    # give error message if query returns no results
    if DB.one(qry, args) is None:
        return {"message": "error",
                "error": "Tafel met jouw voorkeuren is niet beschikbaar"}, 404

    else:
        tafel_id = DB.one(qry, args)
        # change tafel_id to an integer
        tafel_idINT = int(tafel_id['tafel_id'])

        # add tafel_id to args
        args['tafel_id'] = tafel_idINT

        # is a table available?
        qryAvailability = '''
        SELECT * FROM `reservatie` WHERE tafel_id = :tafel_id  and date = :date and (:timeStart between timeStart and timeEnd)
        '''
        tafel_reservatie = DB.all(qryAvailability, args)
        if tafel_reservatie:
            return {
                "message": "error",
                "error": "Tafel is niet beschikbaar, kies een andere tijd of datum"
            }, 404

        # Make the insert query with parameters
        qryInsert = '''
        INSERT INTO `reservatie`(`gebruiker_id`, `aantal_personen`, `aantal_kinderstoelen`, `date`, `timeStart`, `timeEnd`, `bericht`, `voorkeur_locatie`, `voorkeur_verdieping`, `voorkeur_zitting`, `voorkeur_vervoer`, `tijd_van_reservatie`, `tafel_id`)
        VALUES(:user_id ,:aantal_personen, :aantal_kinderstoelen, :date, :timeStart, :timeEnd, :text, :voorkeur_locatie, :voorkeur_verdieping, :voorkeur_zitting, :voorkeur_vervoer, :tijd_van_reservatie, :tafel_id)
        '''

        # Insert into the database
        reservatie_id = DB.insert(qryInsert, args)

        # Return a message and the user id
        return {"message": "success", "id": reservatie_id}, 201


def create_user():
    # Parse all arguments for validity
    args = request.get_json()

    # Make the insert query with parameters
    qry = '''
    INSERT INTO `gebruiker`(`voornaam`,`tussenvoegsel`,`achternaam`,`email`,`wachtwoord`)
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
