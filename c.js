const authenticationAPI = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";
const apiEndpoint = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp";

// Function to authenticate the user and get the bearer token
async function authenticateUser() {
  const login_id = "test@sunbasedata.com";
  const password = "Test@123";

  const response = await fetch(authenticationAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login_id: login_id,
      password: password,
    }),
  });

  if (!response.ok) {
    throw new Error("Authentication failed.");
  }

  const data = await response.json();
  const bearerToken = data.token; // Assuming the response JSON has a field named "token"
  return bearerToken;
}

// Function to make an authenticated API call using the bearer token
async function makeAuthenticatedAPICall(bearerToken) {
  const endpoint = `${apiEndpoint}?cmd=get_customer_list`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${bearerToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch customer list.");
  }

  const data = await response.json();
  return data;
}

// Example usage:
(async () => {
  try {
    const bearerToken = await authenticateUser();
    const customerList = await makeAuthenticatedAPICall(bearerToken);
    console.log(customerList);
  } catch (error) {
    console.error(error);
  }
})();
