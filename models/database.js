const Sequelise = require('sequelize')
const pg = require('pg')
const notifier = require('node-notifier')
pg.defaults.ssl = false

const database = new Sequelise(process.env.DATABASE_URL)


module.exports.initialise = async () => {
    try {
        await database.sync()
    } catch (e) {
        notifier.notify({
            title: 'Sync Error',
            message: e.message()
        })
    }
}


database.define('views', {
    id: {
        type: Sequelise.INTEGER,
        primaryKey: true
    },
    views: 'INT DEFAULT 0'
})

