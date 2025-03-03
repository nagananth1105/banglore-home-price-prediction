# Bangalore House Price Prediction

## Overview
This project uses **synthetic data** for training to enhance model robustness and knowledge extraction.
This project is a web-based application that predicts house prices in Bangalore using a **Linear Regression** model. The backend is built with **Flask**, and the frontend uses **HTML, CSS, and JavaScript** for a simple and interactive user interface.

## Features
- Predict house prices based on user inputs (location, square footage, number of bedrooms, etc.)
- Flask API for handling ML model requests
- Interactive frontend for user input and displaying predictions
- Trained **Linear Regression Model** for accurate price predictions

## Tech Stack
### Machine Learning
- **Python** (pandas, numpy, sklearn, pickle, joblib)
- **Scikit-learn** (for training Linear Regression Model)

### Backend
- **Flask** (to create the API and serve the model)

### Frontend
- **HTML, CSS, JavaScript** (for user interaction)

## Project Structure
```
BANGALORE_HOME/
│── client/                  
│   ├── static/              # Static assets (CSS, JS, Images)
│   │   ├── app.css
│   │   ├── app.js
│   │   ├── images.jpg
│   │   ├── real-estate.jpg
│   │
│   ├── templates/           # HTML files
│   │   ├── app.html
│
│── server/
│   ├── artifacts/           # Trained model files
│   ├── __pycache__/         # Python cache files
│   ├── server.py            # Main Flask app
│   ├── util.py              # Helper functions (e.g., loading model)
│
│── models/                  # Jupyter notebooks, dataset, and model scripts
│   ├── Bengaluru_House_Data-checkpoint.ipynb
│   ├── realestate-checkpoint.ipynb
│
│── .gitignore
│── requirements.txt
│── README.md
```

## Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Bangalore_House_Prediction.git
cd Bangalore_Home
```

### 2. Create a Virtual Environment (Optional but Recommended)
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate  # On Windows
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Train the Model (If not already trained)
```bash
python models/model.py
```

### 5. Run the Flask Server
```bash
cd server
python server.py
```

### 6. Access the Application
Open your browser and go to:
```
http://127.0.0.1:5000/
```

## API Endpoint
- **POST /predict**: Accepts JSON data and returns the predicted price.
  ```json
  {
      "location": "Indiranagar",
      "sqft": 1200,
      "bath": 2,
      "bhk": 2
  }
  ```

  **Response:**
  ```json
  {
      "predicted_price": 95.3
  }
  ```

## Future Improvements
- Use **Random Forest** or **XGBoost** for better accuracy
- Deploy the model on **AWS/GCP/Heroku**
- Add a **database** to store past predictions

