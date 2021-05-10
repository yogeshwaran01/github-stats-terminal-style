import pytest
from flask import request

from app import app


@pytest.fixture
def client():
    """ Client for Testing App """
    with app.test_client() as client:
        yield client


def test_svg_rendering(client):
    response = client.get('/yogeshwaran01?theme=powershell')
    assert request.args['theme'] == 'powershell'
    assert response.status_code == 200
    assert response.headers['Content-Type'] == 'image/svg+xml; charset=utf-8'
