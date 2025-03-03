from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({'locations': util.get_location_names()})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid input"}), 400  # Bad request

    try:
        total_sqft = float(data['total_sqft'])
        location = data['location']
        bhk = int(data['bhk'])
        bath = int(data['bath'])

        estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)
        response = jsonify({'estimated_price': estimated_price})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    except KeyError as e:
        return jsonify({"error": f"Missing key: {str(e)}"}), 400

    except ValueError:
        return jsonify({"error": "Invalid data type"}), 400

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(debug=True)
