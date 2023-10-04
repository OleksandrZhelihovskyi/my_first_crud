const { Pool } = require('pg');
const cfg = require('../db/config.json')
const pool = new Pool(
    {
        user: cfg.user,
        host: cfg.host,
        database: cfg.database,
        password: cfg.password,
        port: cfg.port
    }
);

exports.getTask = () => new Promise(async (resolve, reject) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
            `select task.title as Task,user_data.username as Name,
        priority.title as Priority,category.title as Category,user_data.photo as Photo
        from task 
        join user_data on user_data.id = task.user_id
        join priority on user_data.id = priority.user_id
        join category on user_data.id = category.user_id; `
        );
        resolve(result)

    }
    catch (err) {
        reject(err)
    }
}

);
exports.putTask = (data) => new Promise(async (resolve, reject) => {
    try {
        const client = await pool.connect();
        if (data.username && data.email && data.password && !find(client,data.email).rows[0].email) {
            const result = await client.query(
                `insert into user_data (username,email,password)
         values('${data.username}','${data.email}','${data.password}');
        `
            );
        } else throw ('Wrong data')
        resolve('Success')
        async function find(client,email){
            let A = await client.query(`select user_data.email
            from user_data
            where '${email}' = user_data.email
            `)

            return A
        }
    }
    catch (err) {
        reject(err)
    }
});

exports.updateTask = (data) => new Promise(async (resolve, reject) => {
    try {
        const client = await pool.connect();
        const to_update = await client.query(`select user_data.email
        from user_data
        where user_data.email = '${data.email}'
        `);
        if (to_update) {
            const result = await client.query(
                `UPDATE user_data
                SET username = '${data.username}', email = '${data.email}', password = '${data.password}'
                WHERE email = '${to_update.rows[0].email}';
                 `
            );
        } else throw ('Wrong data')
        resolve('Success')

    }
    catch (err) {
        reject(err)
    }
}
);
exports.deleteTask = (id) => new Promise(async (resolve, reject) => {
    try {
        const client = await pool.connect();
        const to_delete = await client.query(`select user_data.id
        from user_data
        where user_data.id = '${id}'
        `);
        
        if (to_delete) {
            const result = await client.query(
                `DELETE FROM user_data
                WHERE user_data.id = '${to_delete.rows[0].id}'
                 `
            );
        } else throw ('Wrong data')
        resolve('Success')

    }
    catch (err) {
        reject(err)
    }
}
);