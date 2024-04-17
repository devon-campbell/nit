# Nit

[DESCRIPTION TO BE WRITTEN]

## Installation

To get started, follow these steps:

1. **Clone the repository and navigate to it:**  
    ```
    cd ui_tweakers
    ```
2. **Setup the backend:**  
    Navigate to the backend directory:
    ```
    cd backend
    ```

    Create and activate a virtual environment named `venv` (don't name it anything else!):
    ```
    python3 -m venv venv
    source venv/bin/activate
    ```

    Install the required Python dependencies:
    ```
    pip install -r requirements.txt
    ```

3. **Setup the frontend:**  
    Navigate to the frontend directory:
    ```
    cd ../frontend
    ```

    Install the required Node.js dependencies:
    ```
    npm install
    ```

4. **Start the app:**  
    - To start both the React and Flask app at the same time, ensure you're in the frontend directory and run:
        ```
        npm run start:both
        ```

    - To start the React app individually, ensure you're in the frontend directory and run:
        ```
        npm start
        ```

    - To start the Flask app individually, navigate to the backend directory and run:
        ```
        cd ../backend
        python server.py
        ```
