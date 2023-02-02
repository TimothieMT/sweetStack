import {exec} from 'child_process';
import fs from "fs";
import _progress from "cli-progress";
import chalk from "chalk";
import {MongoClient as client, MongoClient} from 'mongodb';

/**
 * getNpmRoot
 *
 * returns the directory of where node_modules is stored on Linux, Mac and Windows
 *
 * const npmRoot = await sweet.getNpmRoot();
 */
export const getNpmRoot = () => {
    return new Promise((resolve) => {
        exec('npm root -g', (error, stdout, stderr) => {
            stdout = stdout.trim('\n');
            const lines = stdout.split('\n');
            if (lines.length > 1) {
                stdout = lines[lines.length - 1];
            }
            resolve(stdout);
        });
    });
};

/*
    * makeHook with write option
 */

export const makeHook = (content, to) => {
    fs.writeFileSync(to, content, {flag: 'w', encoding: 'utf8'});
}

/*
    * renameFile with async/await
 */

export const renameFileSync = (oldName, newName) => {
    try {
        fs.renameSync(oldName, newName)
    } catch (err) {
        console.error(err)
    }
}

/*
    * npm install automatic execution
 */

export const npmInstaller = (path) => {
    return new Promise((resolve) => {
        exec(`cd ${path} && npm install`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
            resolve(stdout);
        });
    });
}

export const gitInit = (path) => {
    return new Promise((resolve) => {
        exec(`cd ${path} && git init -b main`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
            }
            resolve(stdout);
        });
    });
}

export const loader = ([], timerValue) => {
    // create new progress bar using default values
    const b1 = new _progress.Bar();
    b1.start(100, 0);

    // the bar value - will be linear incremented
    let value = 0;

    // 20ms update rate
    const timer = setInterval(function () {
        // increment value
        value++;

        // update the bar value
        b1.update(value)

        // set limit
        if (value >= b1.getTotal()) {
            // stop timer
            clearInterval(timer);

            b1.stop();

            // print message
            console.log(chalk.green(`
            go to folder and npm run dev`))
        }
    }, timerValue);
}


/**
 * Function to create a MongoDB database and collections
 * @param connectionString
 * @param {string} databaseName - The name of the MongoDB database
 * @param {string[]} collectionNames - An array of collection names to be created
 */
export const createDB = (connectionString, databaseName, ...collectionNames) => {
    // URL for connecting to MongoDB
    MongoClient.connect(connectionString, (err, db) => {
        if (err) throw err;
        // Access the database
        const dbo = db.db(databaseName)
        let collectionsCreated = 0;
        // Loop through the collection names and create each collection
        collectionNames.forEach(collectionName => {
            dbo.createCollection(collectionName, (err) => {
                if (err) throw err;
                collectionsCreated++;
                // Close the connection after all collections have been created
                if (collectionsCreated === collectionNames.length) {
                    db.close();
                }
            });
        });
    });
}

export const dataImportCollection = (connectionString,dataBaseName, collectionName, file) => {
    MongoClient.connect(connectionString, (err, db) => {
        if (err) throw err;
        const dbo = db.db(dataBaseName)

        fs.readFile(file, (err, data) => {
            if (err) throw err;
            const documents = JSON.parse(data);

            documents.forEach((document) => {
                delete document._id
                delete document.__v

            })

            dbo.collection(collectionName).insertMany(documents, (err, res) => {
                if (err) throw err;
                db.close();
            });
        })
    })
}


export const replaceData = (searchValue, replaceValue, destinationPath) => {

    const fileReader = fs.readFileSync(destinationPath, 'utf8')

    if (fileReader.includes(searchValue)) {
        const replaced = fileReader.replace(searchValue, replaceValue)
        fs.writeFileSync(destinationPath, replaced, 'utf8')
    }
}