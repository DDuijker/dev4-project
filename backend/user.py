from flask import request
from flask_bcrypt import generate_password_hash
from database.db import DB


def create_user():
    # Parse all arguments for validity
    args = request.get_json()

    # Make the insert query with parameters
    qry = '''
    INSERT INTO `gebruikers`(`voornaam`,`tussenvoegsel`,`achternaam`,`email`, `wachtwoord`)
    VALUES(:firstname, :infix, :lastname, :email, :password)
    '''

    # Hash the password before inserting
    args['password'] = generate_password_hash(args['password'])

    # Insert the user into the database
    user_id = DB.insert(qry, args)

    # Return a message and the user id
    return {"message": "success", "id": user_id}, 201

