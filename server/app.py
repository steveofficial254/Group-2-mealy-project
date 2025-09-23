from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def home():
    return {"message": "Deployed successfully!"}

@app.route('/health')
def health():
    return {"status": "healthy"}

@app.route('/api/test')
def test():
    return {"message": "API working", "data": "test successful"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Flask app on port {port}")
    app.run(host="0.0.0.0", port=port, debug=True)
