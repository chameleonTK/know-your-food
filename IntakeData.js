//Reference Intakes (RIs) are used on nutrition labels on packaged food
//The Reference Nutrient Intake (RNI)
//https://www.nutrition.org.uk/attachments/article/234/Nutrition%20Requirements_Revised%20Oct%202016.pdf
// Factors affecting requirements
// • Age: e.g. the RNI for vitamin C for a child aged 1 year and under is 25 mg/d, and for an adult is 40
// mg/d
// • Gender: e.g. the RNI for iron in women aged 19-50 years is 14.8 mg/d, which is higher than for men (8.7 mg/d) to cover menstrual losses
// • Growth: e.g. adolescents have higher calcium requirements to cover their bone growth
// • Pregnancy and Lactation: e.g. The RNI for calcium in women that are breastfeeding is 550 mg/d more than adult females who are not breastfeeding.

// ** There are currently no RIs that can be used specifically for children
// ** https://www.nutrition.org.uk/nutritionscience/nutrients-food-and-ingredients/dietary-fibre.html

var intake_data = {
    //19-50 years
    "teenager_male": {
        calcories: 2000,
        protein: 50000,
        carbohydrate: 260000,
        fat: 70000,
        salt: 6000,
        fiber: 30000,
        vitamin_A: 700,
        vitamin_B6: 1.4,
        vitamin_B12: 1.5,
        vitamin_C: 40,
        vitamin_D: 10,
        calcium: 700,
        iron: 8.7,
        zinc: 9.5,
        phosphorus: 550,
        magnesium: 300,
        potassium: 3500,
        sodium: 1600,
        chloride: 2500,
        iodine: 140,
    },
    "teenager_female": {
        calcories: 2000,
        protein: 50000,
        carbohydrate: 260000,
        fat: 70000,
        salt: 6000,
        fiber: 30000,
        vitamin_A: 600,
        vitamin_B6: 1.2,
        vitamin_B12: 1.5,
        vitamin_C: 40,
        vitamin_D: 10,
        calcium: 700,
        iron: 14.8,
        zinc: 7.0,
        phosphorus: 550,
        magnesium: 270,
        potassium: 3500,
        sodium: 1600,
        chloride: 2500,
        iodine: 140,
    },

    //50+ years
    "elder_male": {
        calcories: 2000,
        protein: 50000,
        carbohydrate: 260000,
        fat: 70000,
        salt: 6000,
        fiber: 30000,
        vitamin_A: 700,
        vitamin_B6: 1.4,
        vitamin_B12: 1.5,
        vitamin_C: 40,
        vitamin_D: 10,
        calcium: 700,
        iron: 8.7,
        zinc: 9.5,
        phosphorus: 550,
        magnesium: 300,
        potassium: 3500,
        sodium: 1600,
        chloride: 2500,
        iodine: 140,
    },

    "elder_female": {
        calcories: 2000,
        protein: 50000,
        carbohydrate: 260000,
        fat: 70000,
        salt: 6000,
        fiber: 30000,
        vitamin_A: 600,
        vitamin_B6: 1.2,
        vitamin_B12: 1.5,
        vitamin_C: 40,
        vitamin_D: 10,
        calcium: 700,
        iron: 8.7,
        zinc: 7.0,
        phosphorus: 550,
        magnesium: 270,
        potassium: 3500,
        sodium: 1600,
        chloride: 2500,
        iodine: 140,
    }
}