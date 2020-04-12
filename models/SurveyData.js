const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
var SurveyDataSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    idNumber: {
        type: String,
    },
    gender: {
        type: String,
    },
    neighborhood: {
        type: String,
    },
    address: {
        type: String,
    },
    houseMembersList: [
        {
            relation: {
                type: String,
            },
            age: {
                type: String,
            },
            idNumber: {
                type: String
            }
        }
    ],
    liveInHome: {
        type: String,
    },
    houseMaterial: {
        type: String,
    },
    floor: {
        type: String,
    },
    roof: {
        type: String,
    },
    bathroom: {
        type: String,
    },
    water: {
        type: String,
    },
    cooking: {
        type: String,
    },
    asset: {
        type: Array,
    },
    guarani: {
        type: String,
    },
    foreignCountry: {
        type: String
    },
    symptomsType: {
        type: Array,
    },
    suspectedCase: {
        type: String,
    },
    suffering: {
        type: String,
    },
    diseaseMembers: {
        type: String,
    },
    diseaseMembersList: [
        {
            relation: {
                type: String,
            },
            age: {
                type: String,
            },
            disease: {
                type: String
            }
        }
    ],
    regularVisitors: {
        type: String,
    },
    mainSourceIncome: {
        type: String,
    },
    workCategory: {
        type: String,
    },
    employeesNumber: {
        type: String,
    },
    allIPS: {
        type: String,
    },
    layOffEmployees: {
        type: String,
    },
    businessSituation: {
        type: String,
    },
    businessStrategy: {
        type: String,
    },
    amountMarchMoney: {
        type: String,
    },
    amountAprilMoney: {
        type: String,
    },
    cellPhoneNumber: {
        type: String,
    },
    headingCompany: {
        type: String,
    },
    role: {
        type: String,
    },
    expectIPSHeadingCompany: {
        type: String,
    },
    loseJobHeadingCompany: {
        type: String,
    },
    guaraniEnterHeadingCompany: {
        type: String,
    },
    workplaceHeadingCompany: {
        type: String,
    },
    shareWorkplaceHeadingCompany: {
        type: String,
    },
    whatCategoryDoes: {
        type: String,
    },
    expectIPSWhatCategoryDoes: {
        type: String,
    },
    loseJobWhatCategoryDoes: {
        type: String,
    },
    guaraniEnterWhatCategoryDoes: {
        type: String,
    },
    workplaceWhatCategoryDoes: {
        type: String,
    },
    shareWorkplaceWhatCategoryDoes: {
        type: String,
    },
    areYou: {
        type: String,
    },
    medicalCenterServing: {
        type: String,
    },
    instruments: {
        type: String,
    },
    suspectedCaseMedicalCenter: {
        type: String,
    },
    unemployedPeriod: {
        type: String,
    },
    produceFood: {
        type: String,
    },
    surviveMoney: {
        type: String,
    },
    receiveMoney: {
        type: String,
    },
    spendDrugs: {
        type: String,
    },
    commentMayerWorkCategory: {
        type: String,
    },
    commentMayerHeadingCompany: {
        type: String,
    },
    commentMayerWhatCategoryDoes: {
        type: String,
    },
    commentMayerAreYou: {
        type: String,
    },
    commentMayerUnemployedPeriod: {
        type: String,
    },
    commentMayerReceiveMoney: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    weight: {
        type: String,
    },
    location: {
        type: String,
    },
    end: {
        type: String,
    },
});


var SurveyData = mongoose.model('surveydata', SurveyDataSchema);
    

module.exports = SurveyData;