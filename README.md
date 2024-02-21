# Digital-Community-Platform

## Installation Guide (Backend)

- Create a virtual environment

    ```
     python -m venv env 
     ```

- Activate the virtual environment

    ```
     env\Scripts\activate 
     ```

- Install the required packages

    ``` 
    pip install -r requirements.txt 
    ```

    Note - If error occurs upgrade the version of pip by running the following command

    ``` 
    python -m pip install -U pip 
    ```

- Run the following command to start the server

    ``` 
    uvicorn app.main:app --host localhost --port 8000 --reload
     ```
