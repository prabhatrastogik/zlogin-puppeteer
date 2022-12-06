# Objective
Login Automation - Google Cloud Function for Zerodha request token generation, which is separately handled by lambda.

# What does it do?
This is a scheduled job in the morning (can be implemented in free tier google cloud to run every morning after 6.30)

This function requests zerodha to get access token - Zerodha will generate a redirect which is handled separately in a AWS lambda in separate repo zerodha-dynamodb-save-accesstoken with request token as query parameter.
