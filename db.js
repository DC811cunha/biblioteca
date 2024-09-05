const mysql = require('mysql2/promise');

//função para estabelecer a conexão com o banco de dados
async function conectarBD()
{
    //verifica se já existe uma conexão no objeto global
    if(global.conexao && global.conexao.state !== 'disconnected')
    {
        return global.conexao;
    }
    //caso a conexão não exista em global, cria uma nova
    const conexao = await mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'biblioteca'
    });
    console.log('Conectado Mysql');
    global.conexao = conexao;

    return global.conexao;
}

async function buscarUsuario(usuario) 
{
    const con = await conectarBD();
    const sql = "select * from usuarios where usulogin=? and ususenha=?;";
    const [usuarioEncontrado] = await con.query(sql, [usuario.login, usuario.senha]);

    console.log(usuarioEncontrado);
    
    if(usuarioEncontrado && usuarioEncontrado.length>0)
    {
        return usuarioEncontrado[0];
    }
    else
    {
        return {};
    }
}

conectarBD();

module.exports = {buscarUsuario}