# Import necessary libraries
import pandas as pd
import os
import csv

# Function to read the policy database from a CSV file and convert it to a NumPy array
def getPolicyDB():
    try:
        return pd.read_csv("policyDB.csv").to_numpy()
    except Exception as e:
        print(f"An error occurred while reading the CSV file: {e}")
        return None

# Function to retrieve information based on age and incoming parameters
def getInfos(ageParam, incomingParam):
    # Get the policy database as a NumPy array
    policyDB = getPolicyDB()
    
    # Separate age rule and incoming rule
    ageRule = policyDB[0]
    incomingRule = policyDB[1]

    # Validate age parameter against age rule and incoming parameter against incoming rule
    ageResult = parameterValidation(ageParam, ageRule)
    incomingResult = parameterValidation(incomingParam, incomingRule)

    # Return the result based on parameter validation
    return result(ageResult, incomingResult)

# Function to perform parameter validation based on a given rule
def parameterValidation(param, rule):
    try:
        if rule[1] == '>':
            return int(param) > int(rule[2])
        elif rule[1] == '<':
            return int(param) < int(rule[2])
        elif rule[1] == '>=':
            return int(param) >= int(rule[2])
        elif rule[1] == '<=':
            return int(param) <= int(rule[2])
        elif rule[1] == '==':
            return int(param) == int(rule[2])
        else:
            return False
    except ValueError as e:
        print(f"An error occurred while performing parameter validation: {e}")
        return False

# Function to generate the final result based on age and incoming validation results
def result(ageResult, incomingResult):
    if ageResult and incomingResult:
        return {'decision': True}
    else:
        return {'decision': False}

# Function to update rules with new data
def updateRules(data):
    # Delete the existing CSV file
    deleteCSV()
    
    # Create a new CSV file with the provided data
    creatNewCSV(data)
    
    # Return a success message
    return {'Rule updated successfully'}

# Function to delete the policyDB.csv file if it exists
def deleteCSV():
    try:
        if os.path.exists("policyDB.csv"):
            os.remove("policyDB.csv")
    except Exception as e:
        print(f"An error occurred while deleting the file: {e}")

# Function to create a new CSV file with provided data
def creatNewCSV(data):
    with open("policyDB.csv", mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['variable', 'operator', 'value'])

        for item in data:
            writer.writerow([item['variable'], item['operator'], item['value']])
