/**
 * File of handling students routs 
 */
const studentRoutes = (app, fs) => {
    //Path to JSON
    const dataPath = './data/students.json';

    //Read JSON
    const readFile = (
        callback,
        returnJson = false,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                console.error(err);
            }
            if (data) {
                callback(returnJson ? JSON.parse(data) : data);
            } else {
               console.error('Incorrect JSON file');
               callback(data);
            }
        });
    };
    
    //Write JSON
    const writeFile = (
        fileData,
        callback,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.writeFile(filePath, fileData, encoding, err => {
            if (err) {
                console.error(err);
            }
            callback();
        });
    };

    //Route to Prev request
    app.get('/students/:id/prev', (req, res) => {
        readFile(data => {
            if (!data) {
                res.status(204).send();
                return;
            }              
            const studentID = req.params['id'];
            if (data[studentID]) {

                const arr = Object.values(data);
                const prevID = (arr.indexOf(data[studentID]) - 1 + arr.length) % arr.length;
                res.send(arr[prevID]);
            } else res.status(307).redirect('../first');
        }, true);
    });

    //Route to Next request
    app.get('/students/:id/next', (req, res) => {
        readFile(data => {
            if (!data) {
                res.status(204).send();
                return;
            }
            const studentID = req.params['id'];
            if (data[studentID]) {
                const arr = Object.values(data);
                const nextID = (arr.indexOf(data[studentID]) + 1) % arr.length;
                res.status(200).send(arr[nextID]);
            } else res.status(307).redirect('../first');
        }, true);
    });

    //Get first route
    app.get('/students/first', (req, res) => {
        readFile(data => {
            if (!data) {
                res.status(204).send();
                return;
            }
            res.status(200).send(Object.values(data)[0]);
        }, true);
    });

    //Get by ID route
    app.get('/students/:id', (req, res) => {
        readFile(data => {
            if (!data) {
                res.status(204).send();
                return;
            }
            const studentID = req.params['id'];
            if (data[studentID])
                res.send(data[studentID]);
            else res.status(204).send();
        }, true);
    });

    //Read request route
    app.get('/students', (req, res) => {
        readFile(data => {
            if (!data) {
                res.status(204).send();
                return;
            }
            res.status(200).send(data);
        }, true);
    });

    //Create request route
    app.post('/students', (req, res) => {
        readFile(data => {
            const newStudentID = req.body['id'];  
            if (!data) data = {};
            if(!data[newStudentID]) {
                data[newStudentID] = req.body;
                writeFile(JSON.stringify(data, null, 4), () => {
                    res.status(200).send(data[newStudentID]);
                    console.log('New student was added.');
                });
            } else res.status(208).send();
        }, true);
    });

    //Update request route
    app.put('/students/:id', (req, res) => {
        readFile(data => {
            if (!data) {
                res.status(204).send();
                return;
            }
            const studentID = req.params['id'];
            if (data[studentID]) {

                data[studentID] = req.body;
                writeFile(JSON.stringify(data, null, 4), () => {
                    res.status(200).send(data[studentID]);
                    console.log(`Student id:${studentID} updated.`);
                });
            } else res.status(204).send();
        }, true);
    });

    //Delete request route
    app.delete('/students/:id', (req, res) => {
        readFile(data => {
            if (!data) {
                res.status(204).send();
                return;
            }
            const studentID = req.params['id'];
            if (data[studentID]) {
                delete data[studentID];
                writeFile(JSON.stringify(data, null, 4), () => {
                    res.status(200).send(`Student id:${studentID} removed.`);
                    console.log(`Student id:${studentID} removed.`);
                });
            } else res.status(204).send();
        }, true);
    });
};

module.exports = studentRoutes;