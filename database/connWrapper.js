// ENV Config
require("dotenv").config()
const env = (env_param) => {
    env_ = env_param.toUpperCase();
    return process.env[env_]
};

const mysql = require("mysql");

async function pool_query(query, variables, res) {
    
    // Cria a pool de conexão
    let pool = mysql.createPool({
        host: env("DB_HOST"),
        user: env("DB_USER"),
        password: env("DB_PASSWORD"),
        database: env("DB_NAME"),
        connectionLimit: 25,
    })

    // Prepara o JSON de resposta
    let response = {};

    const queue = new Promise((resolve, reject) => {
        pool.query(query, variables, (error, result, fields) => {
            
            if(error) {
                response["status"] = "rejected"
                response["rejectReason"] = error;
                return reject(response)
            }

            response["status"] = "success"
            response["result"] = result;
            return resolve(response);
    
        })
    }).catch(error => {
        response["status"] = "error"
        response["error"] = "Verifique a requisição enviada.";

        return response;
    })

    // Insere o valor do JSON como resposta
    response = await queue;

    // Encerra a pool de conexão
    pool.end();

    // Retorna o JSON
    return response;
}

module.exports = pool_query