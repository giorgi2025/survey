const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
var WeightSchema = new Schema({
    liveInHome: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    houseMaterial: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    floor: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    roof: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    bathroom: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    water: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    cooking: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    asset: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    symptomsType: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    suffering: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    mainSourceIncome: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    allIPS: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    businessSituation: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    businessStrategy: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    expectIPSHeadingCompany: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    loseJobHeadingCompany: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    workplaceHeadingCompany: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    expectIPSWhatCategoryDoes: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    loseJobWhatCategoryDoes: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    workplaceWhatCategoryDoes: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    areYou: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    instruments: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    suspectedCaseMedicalCenter: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    unemployedPeriod: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],
    produceFood: [
        {
            no: {
                type: String,
            },
            field: {
                type: String,
            },
            weight: {
                type: String
            }
        }
    ],

});

module.exports = Score = mongoose.model("score", WeightSchema);