const app = require('./app/app')
const db = require('./database')
const config = require('./bin/config').web.development

const port = config.port
const host = config.host

app.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}`);

    db.sequelize.sync().then(() => {
        console.log("DB connect success!!");
    }).catch(function(error){
        console.log(error);
    });
})