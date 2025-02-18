import sqlite3, os, sys # FOR DB
from typing import Any, List, Tuple, Optional   # FOR "execute_query" FUNCTIONS
from .. import logging  # GET .ENV CONSTANTS AND LOGGING
from .utils.utility import image_to_binary
from werkzeug.security import generate_password_hash, check_password_hash # LOGIN-SYSTEM SECURITY



### CREATE QUERY FUNCTIONS FOR SQLite ###

# EXECUTE SQL WITH PARAMS
def execute_query(sql: str, params: Tuple[Any, ...], connectionstring: str, fetch: bool = False) -> Optional[List[Tuple]]:
    """Executes a SQL command with the provided parameters.

    This function connects to the SQLite database, executes the specified SQL command with the given parameters,
    and optionally fetches the results based on the `fetch` argument. 

    Args:
        sql (str): The SQL-Command to be executed. This can be any valid SQL statement such as 
                   SELECT, INSERT, UPDATE, or DELETE.
                   
        connectionstring (str): The DB-Connection-String used for the query
                   
        params (Tuple[Any, ...]): A tuple containing the parameters to bind to the SQL command. 
                                The number and types of parameters should match the placeholders in the SQL statement.
                                
        fetch (bool, optional): If True, the function fetches and returns all rows of the result set as a list of tuples.
                                If False, it returns a boolean indicating whether any rows were affected by 
                                the SQL command (True for affected, False for none). Defaults to False.
    Returns:
        Optional[List[Tuple]]: 
            - If `fetch` is True, returns a list of tuples where each tuple represents a row fetched from the database. 
              Returns an empty list if no rows were returned.
            - If `fetch` is False, returns a boolean value:
              - True if the SQL command affected one or more rows.
              - False if no rows were affected.
            - Returns None if an error occurs during execution.

    """
    try:
        with sqlite3.connect(connectionstring) as con:
            cursor = con.cursor()
            cursor.execute("PRAGMA foreign_keys = ON;")
            con.commit()
            cursor.execute(sql, params)
            
            if fetch:
                return cursor.fetchall()  # Return fetched results
            
            else:
                return cursor.rowcount > 0  # Return True for insert/update/delete if any rows affected, else False
            
    except sqlite3.Error as e:
        logging.error(f"An error occurred: {e}")
        return None  # Return None in case of error

# EXECUTE SQL WITHOUT PARAMS
def execute_query_get_all(sql: str, connectionstring: str) -> dict:
    results: dict = {}  # {"name": id} -> str: int
    try:
        with sqlite3.connect(connectionstring) as con:
            cursor = con.cursor()
            cursor.execute("PRAGMA foreign_keys = ON;")
            con.commit()
            cursor.execute(sql)
            rows = cursor.fetchall()
            
            for row in rows:
                results[row[1]] = row[0]
                
            return results
        
    except sqlite3.error as e:
        logging.error(f"An error occured: {e}")
        return results



### SET UP DATABASES ###

## SET DB-Connection Strings ##
CONNECTIONSTRING_LOGIN = os.path.join(os.path.dirname(__file__), "db" ,"LoginDB.db")


def create_login_db() -> bool:
    try:
        con = sqlite3.connect(CONNECTIONSTRING_LOGIN)
        cursor = con.cursor()
        with con:
            sql: str = "CREATE TABLE tblLogin(" \
                        "LoginID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, " \
                        "LoginUsername TEXT NOT NULL UNIQUE, " \
                        "LoginPassword TEXT NOT NULL, " \
                        "LoginType TEXT NOT NULL)"
            cursor.execute(sql)
            
        return True
    
    except:
        logging.error("Could not create login-database!")
        return False
    
def create_admins() -> bool:
    try:
        con = sqlite3.connect(CONNECTIONSTRING_LOGIN)
        cursor = con.cursor()
        with con:
            hashed_password = generate_password_hash("admin", method='pbkdf2:sha256')
            sql: str = "INSERT INTO tblLogin(LoginUsername, LoginPassword, LoginType) VALUES ('admin', ?, 'admin')"
            cursor.execute(sql, (hashed_password,))
        return True

    except sqlite3.Error as e:
        logging.error(e)

    except:
        logging.error("Could not create admins for some reason!")
        return False

if not os.path.exists(CONNECTIONSTRING_LOGIN):
    if not create_login_db():
        logging.error("Could not create login-database! Something went wrong...")
        sys.exit()
    if not create_admins():
        logging.error("Could not create admins! Something went wrong...")
        sys.exit()



### SET UP CRUD-FUNCTIONALITY ###

#-- CRUD FUNCTIONALITY LOGIN --#

def create_login(username: str, password: str) -> bool:
    """
    Returns:
        True: if successfully added
        False: if error happened
    """
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    sql: str = "INSERT INTO tblLogin(LoginUsername, LoginPassword, LoginType) VALUES (?, ?, 'user')"
    return execute_query(sql, (username, hashed_password), CONNECTIONSTRING_LOGIN)
    

def validate_login(username: str, password: str) -> bool:
    """Validates whether a Login is successfull or not

    Args:
        username (str): Username from Frontend
        password (str): Password from Frontend

    Returns:
        True: if Password matches that from the database for the called user
        False: if user not found in the Database OR password does NOT match that from the database for the called user 
    """
    sql: str = "SELECT LoginPassword FROM tblLogin WHERE LoginUsername = ?"
    result = execute_query(sql, (username,), CONNECTIONSTRING_LOGIN, fetch=True)
    
    if not result:
        return False    # No matches for the username
    
    password_db = result[0][0]
    
    if check_password_hash(password_db, password):
        return True # Passwords match
    
    return False    # Password doesn't match with database


def get_all_usernames() -> list:
    """Returns a list containing all usernames in the database"""
    sql: str = "SELECT LoginUsername FROM tblLogin"
    
    with sqlite3.connect(CONNECTIONSTRING_LOGIN) as con:
        cursor = con.cursor()
        cursor.execute(sql)
        results = cursor.fetchall()
        usernames: list = [user[0] for user in results]
        
    return usernames





### FOR TESTING FUNCTIONS ONLY ###
if __name__ == "__main__":
    ### Login ###

    # print(get_correct_answer(1))
    # print(add_login("Name", "Password"))
    # print(validate_login("Name", "Password"))
    # print(get_all_usernames())
    
    pass
