import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_endpoint(client):
    #Test the health check endpoin
    response = client.get('/api/health')
    assert response.status_code == 200
