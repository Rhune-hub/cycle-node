/**
 * File of controlling server routs
 */
const studentRoutes = require('./students');

const appRouter = (app , fs) => {

    app.get('/', (req, res) => {
        fs.readFile('./public/index.html', null, function (error, data) {
            if (error) {
                response.writeHead(404);
                respone.write('Whoops! File not found!');
            } else {
                response.write(data);
            }
            response.end();
        });  
    });
    
    studentRoutes(app, fs);
};

module.exports = appRouter;