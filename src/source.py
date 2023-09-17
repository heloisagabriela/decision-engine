
import pandas as pd

def getPolicyDB():
    return pd.read_csv("policyDB.csv").to_numpy()

def getInfos(ageParam, incomingParam):
    policyDB = getPolicyDB()
    ageRule = policyDB[0]
    incomingRule = policyDB[1]

    ageResult = parameterValidation(ageParam, ageRule)
    incomingResult = parameterValidation(incomingParam, incomingRule)

    return result(ageResult, incomingResult)


def parameterValidation(param, rule):
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
    
def result(ageResult, incomingResult):
    if ageResult and incomingResult:
        return {'decision': True}
    else:
        return {'decision': False}