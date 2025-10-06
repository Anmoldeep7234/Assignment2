/********************************************************************************
*  WEB700 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Anmoldeep Singh Student ID: 139671242 Date: 06/010/2025
*
********************************************************************************/

class legoData {
    constructor() {
        this.sets = [];
    }

    initialize() {
        return new Promise((resolve, reject) => {
            try {
                const setData = require("../Data/SetData.json");
                const themeData = require("../Data/themeData.json");
                    
                this.sets = [];
                 

                setData.forEach(set => {
                    const theme = themeData.find(t => t.id === set.theme_id);

                    this.sets.push({
                        set_num: set.set_num,
                        name: set.name,
                        year: set.year,
                        theme_id: set.theme_id,
                        num_parts: set.num_parts,
                        img_url: set.img_url,
                        theme: theme ? theme.name : "Unknown"
                    });
                });
                resolve(); 
            } catch (err) {
                reject(`Error initializing data: ${err}`);
            }
        });
    }

    getAllSets() {
        return new Promise((resolve, reject) => {
            if (this.sets.length > 0) {
                resolve(this.sets);
            } else {
                reject("No sets available. Did you run initialize()?");
            }
        });
    }

    getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            const found = this.sets.find(set => set.set_num === setNum);
            if (found) {
                resolve(found);
            } else {
                reject(`Unable to find requested set: ${setNum}`);
            }
        });
    }

    getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            const results = this.sets.filter(set =>
                set.theme.toLowerCase().includes(theme.toLowerCase())
            );
            if (results.length > 0) {
                resolve(results);
            } else {
                reject(`Unable to find requested sets with theme: ${theme}`);
            }
        });
    }
}

module.exports = legoData;
