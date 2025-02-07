const mysql = require('mysql2/promise');



//---------------------------Funcao para estabelecer a conexao com o banco de dados------
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
        password: 'DC811roo&',
        database: 'biblioteca'
    });
    console.log('Conectado ao BD Biblioteca');
    global.conexao = conexao;
    return global.conexao;
}



//---------------------------Funcao para buscar usuario----------------------------------
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



//---------------------------Funcao para buscar registros dos alunos---------------------
async function buscarAlunos()
{
    const con = await conectarBD();
    const [registros] = await con.query('select *from alunos order by alunome;');
    return registros;
}



//---------------------------Funcao para inserir aluno BD--------------------------------
async function inserirAluno(novoAluno) 
{
    const con = await conectarBD();
    const sql = "insert into alunos (alunome, aluemail, alutelefone) values (?,?,?);";
    await con.query(sql, [novoAluno.nome, novoAluno.email, novoAluno.telefone]);
}



//---------------------------Funcao para selecionar registro do aluno--------------------
async function selecionarAluno(codigo) 
{
    const con = await conectarBD();
    const sql = "select *from alunos where alucodigo=?;";
    const [registro] = await con.query(sql, [codigo]);
    return registro && registro.length>0 ? registro[0] : {};
}



//---------------------------Funcao para alterar registro do aluno-----------------------
async function alterarAluno(aluno) 
{
    const con = await conectarBD();
    const sql = "update alunos set alunome=?, aluemail=?, alutelefone=? where alucodigo=?;";
    await con.query(sql, [aluno.nome, aluno.email, aluno.telefone, aluno.codigo]);
    return;
}



//---------------------------Funcao para apagar registro do aluno------------------------
async function apagarAluno(codigo) 
{
    const con = await conectarBD();
    const sql = "delete from alunos where alucodigo=?;";
    await con.query(sql, [codigo]);
    return;
}



//---------------------------Funcao para buscar registros dos livros---------------------
async function buscarLivros()
{
    const con = await conectarBD();
    const [registros] = await con.query('select *from livros order by livtitulo;');
    return registros;
}



//---------------------------Funcao para inserir livro BD--------------------------------
async function inserirLivro(novoLivro) 
{
    const con = await conectarBD();
    const sql = "insert into livros (livtitulo, livautor, livpaginas) values (?,?,?);";
    await con.query(sql, [novoLivro.titulo, novoLivro.autor, novoLivro.paginas]);
}



//---------------------------Funcao para selecionar registro do livro--------------------
async function selecionarLivro(codigo) 
{
    const con = await conectarBD();
    const sql = "select *from livros where livcodigo=?;";
    const [registro] = await con.query(sql, [codigo]);
    return registro && registro.length>0 ? registro[0] : {};
}



//---------------------------Funcao para alterar registro do livro-----------------------
async function alterarLivro(livro) 
{
    const con = await conectarBD();
    const sql = "update livros set livtitulo=?, livautor=?, livpaginas=? where livcodigo=?;";
    await con.query(sql, [livro.titulo, livro.autor, livro.paginas, livro.codigo]);
    return;
}



//---------------------------Funcao para apagar registro do livro------------------------
async function apagarLivro(codigo) 
{
    const con = await conectarBD();
    const sql = "delete from livros where livcodigo=?;";
    await con.query(sql, [codigo]);
    return;
}



//---------------------------Funcao para buscar registros dos emprestimos----------------
async function buscarEmprestimos()
{
    const con = await conectarBD();
    const [registros] = await con.query('select *from emprestimos order by empdata;');
    return registros;
}



conectarBD();



module.exports = {
                    buscarUsuario, 
                    buscarAlunos, 
                    buscarLivros, 
                    inserirAluno, 
                    inserirLivro,
                    selecionarAluno,
                    alterarAluno,
                    apagarAluno,
                    selecionarLivro,
                    alterarLivro,
                    apagarLivro,
                    buscarEmprestimos
                }