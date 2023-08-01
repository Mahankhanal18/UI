import requests

authenticationAPI = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp"
apiEndpoint = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp"

# Function to authenticate the user and get the bearer token
def authenticate_user():
    login_id = "test@sunbasedata.com"
    password = "Test@123"

    response = requests.post(authenticationAPI, json={"login_id": login_id, "password": password})

    if not response.ok:
        raise Exception("Authentication failed.")

    data = response.json()
    bearer_token = data.get("token")  # Assuming the response JSON has a field named "token"
    return bearer_token

# Function to make an authenticated API call using the bearer token
def make_authenticated_api_call(bearer_token):
    endpoint = f"{apiEndpoint}?cmd=get_customer_list"

    headers = {"Authorization": f"Bearer {bearer_token}"}
    response = requests.get(endpoint, headers=headers)

    if not response.ok:
        raise Exception("Unable to fetch customer list.")

    data = response.json()
    return data

# Example usage:
try:
    bearer_token = authenticate_user()
    customer_list = make_authenticated_api_call(bearer_token)
    print(customer_list)
except Exception as e:
    print(e)
