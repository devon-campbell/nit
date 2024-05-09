# Nit

Nit is an app that learns users basic sight reading and piano. At its core, it functions based on an iteration of version control for music, which shows changes or differences in versions of sheet music. Our goal is to present music to users in a fun and engaging way. By implementing our own version of version control for music, it will enhance the user experience when it comes to calibration quizzes. In addition to our carefully curated lessons, we also present users with quizzes, which make use of generative UI to consistently provide users with new material. Learn to play piano without an actual piano!	

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
