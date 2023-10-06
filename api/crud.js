const { Pool } = require('pg');
const conf = require('dotenv').config()
const pool = new Pool(conf.parsed);

exports.getTask = async (data) => {
    try {
        const result = await pool.query(
            `select task.title as Task,user_data.username as Name,
        priority.title as Priority,category.title as Category,user_data.photo as Photo
        from task 
        join user_data on user_data.id = task.user_id
        join priority on user_data.id = priority.user_id
        join category on user_data.id = category.user_id; `
        );
        return result
    }
    catch (err) {
        return err.detail

    }
};
exports.putTask = async (data) => {
    try {
        const query = 'INSERT INTO user_data (username,email,password) VALUES($1::text,$2::text,$3::text)'
        const values = [data.username, data.email, data.password]
        const result = await pool.query(query, values);
        return 'Success'
    }
    catch (err) {
        return err.detail
    }
};

exports.updateTask = async (data) => {
    try {
        const result = await pool.query('UPDATE user_data SET username = $1::text, email = $2::text, password = $3::text WHERE email = $2::text',
            [data.username, data.email, data.password]
        );
        return ('Success')
    }
    catch (err) {
        return err.detail
    }
};
exports.deleteTask = async (id) => {
    try {
        const result = await pool.query('DELETE FROM user_data WHERE user_data.id = $1', [id]
        );
        return 'Success'
    }
    catch (err) {
        return err.detail
    }
};