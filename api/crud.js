const { Pool } = require('pg');
const conf = require('dotenv').config()
const pool = new Pool(conf.parsed);

exports.getTask = async () => {
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
        client.release()
        return result

    }
    catch (err) {
        client.release()
        return err

    }
};
exports.putTask = async (data) => {
    try {
        const client = await pool.connect();
        const text = 'SELECT user_data.email FROM user_data WHERE user_data.email = $1'
        const values = data.email
        const res = await client.query(text, [values])
        if (data.username && data.email && data.password && !res.rows[0]) {
            const query = 'INSERT INTO user_data (username,email,password) VALUES($1::text,$2::text,$3::text)'
            const values = [data.username, data.email, data.password]

            const result = await client.query(query, values);
        } else {
            client.release()
            throw ('Wrong data')
        }
        client.release()
        return 'Success'
    }
    catch (err) {
        return err
    }
};

exports.updateTask = async (data) => {
    try {
        const values = data.email
        const client = await pool.connect();
        const to_update = await client.query('select user_data.email from user_data where user_data.email = $1',
            [values]);

        if (to_update.rows[0]) {
            console.log(to_update.rows[0])
            const result = await client.query('UPDATE user_data SET username = $1::text, email = $2::text, password = $3::text WHERE email = $4::text',
                [data.username, data.email, data.password, to_update.rows[0].email]
            );
            console.log(result)
        } else {
            client.release()
            throw ('Wrong data')
        }
        client.release()
        return ('Success')
    }
    catch (err) {
        return err
    }
};
exports.deleteTask = async (id) => {
    try {
        const client = await pool.connect();
        const to_delete = await client.query('select user_data.id from user_data where user_data.id = $1', [id]);
        if (to_delete.rows[0]) {
            const result = await client.query('DELETE FROM user_data WHERE user_data.id = $1', [id]
            );
        } else {
            client.release()
            throw ('Wrong data')
        }
        client.release()
        return 'Success'

    }
    catch (err) {
        return err
    }
};