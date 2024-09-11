import requests
import json
import os

# List of usernames you want to fetch data for

# File paths
usernames_file_path = 'usernames.json'

# Load usernames from usernames.json
try:
    with open(usernames_file_path, 'r') as file:
        usernames_data = json.load(file)
        usernames = [user['username'] for user in usernames_data]
        print(usernames)
except FileNotFoundError:
    print(f"{usernames_file_path} not found.")
    usernames = []
except json.JSONDecodeError:
    print(f"Error decoding {usernames_file_path}.")
    usernames = []

# Base URL for the API
base_url = "https://leetcode-stats-api.herokuapp.com/"

# File to store results
file_path = 'user_stats.json'
# Load existing data if the file exists
if os.path.exists(file_path):
    with open(file_path, 'r') as json_file:
        results = json.load(json_file)
else:
    results = {}

# Loop through each username and fetch data
for username in usernames:
    try:
        # Make the API call
        response = requests.get(f"{base_url}{username}")
        response.raise_for_status()  # Check for HTTP errors
        
        # Parse the JSON response
        data = response.json()
        print(f"{username}: {data['message']}")
        # Extract relevant information
        easy_solved = data.get('easySolved', 0)
        medium_solved = data.get('mediumSolved', 0)
        hard_solved = data.get('hardSolved', 0)
        acceptance_rate = data.get('acceptanceRate', 0.0)
        
        # Update the results dictionary with new data
        results[username] = {
            'easySolved': easy_solved,
            'mediumSolved': medium_solved,
            'hardSolved': hard_solved,
            'round2': 0,
            'round3': 0,
            'acceptanceRate': acceptance_rate
        }
    
    except requests.RequestException as e:
        print(f"Error fetching data for {username}: {e}")

# Write the updated results to the JSON file
with open(file_path, 'w') as json_file:
    json.dump(results, json_file, indent=4)

print("Data has been successfully updated in user_stats.json")
