from flask import request, jsonify, make_response
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
    print("HI")
    # Parse all arguments for validity
    args = request.get_json()

    qry = '''
        SELECT * FROM `gebruiker` WHERE email = :email
        '''

    try:
        user = DB.one(qry, args)

        print(user)
        if user:
            # if the password is correct, generate a token
            if check_password_hash(user['wachtwoord'], args['password']):
                # generate a token
                payload = {
                    'id': user['gebruiker_id'],
                    'email': user['email'],
                    'firstname': user['voornaam'],
                    'infix': user['tussenvoegsel'],
                    'lastname': user['achternaam']
                }

                resp = make_response(jsonify(payload))
                resp.set_cookie('access_token', jwt.encode({'user_id': user['gebruiker_id']}, 'secret'))

                access_token = jwt.encode(payload=payload,
                                          key="githubdev4keykeykeykey", algorithm="HS256")
                resp = make_response()
                resp.set_cookie('access_token', access_token, expires="never")
                return {"message": "success",
                        "user_id": user['gebruiker_id'],
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


def logout():
    # how to logout?

    resp = make_response()
    resp.set_cookie("access_token", '', expires=0)
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
