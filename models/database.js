const Sequelise = require('sequelize')
const pg = require('pg')
pg.defaults.ssl = process.env.NODE_ENV === 'production'? {rejectUnauthorized: false} : false

const database = new Sequelise(process.env.DATABASE_URL)


module.exports.initialise = async () => {
    try {
        await database.sync()
    } catch (e) {
        throw e
    }
}


database.define('pageviews', {
    id: {
        type: Sequelise.INTEGER,
        primaryKey: true
    },
    view_count: 'INT DEFAULT 0'
}, {
    timestamps: false
})


module.exports.record_view = async (id) => {
    try {
        return await database.query(`
            INSERT INTO pageviews 
            VALUES (:id, '1')
            ON CONFLICT (id) DO UPDATE
            SET view_count = pageviews.view_count + 1
            RETURNING view_count
        `, {
            replacements: {
                id: id
            },
            returning: true,
            plain: true
        })
    } catch (e) {
        throw e
    }
}

