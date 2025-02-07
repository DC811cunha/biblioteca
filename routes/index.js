var express = require('express');
var router = express.Router();



//---------------------------GETS'S------------------------------------------------------



// GET home.
router.get('/', function(req, res, next) {
  res.render('index', { titulo: 'Sistema de Biblioteca' });
});



// GET principal.
router.get('/principal', function(req, res, next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }
  res.render('principal', {titulo: 'Sistema de Biblioteca / Principal'});
});



// GET desconectar.
router.get('/sair', function(req, res, next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }  
  global.usuarioCodigo = null;
  res.redirect('/');
});



// GET alunos.
router.get('/alunos', async function(req, res, next) {
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }  
  const registros = await global.db.buscarAlunos();
  res.render('alunos', {titulo: "Alunos", registros});
});



// GET alunos para formulário cadastro.
router.get('/novoAluno', function(req,res,next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }  
  res.render('alunosForm', {titulo: "Cadastro Aluno", registro: {}, acao: "/gravarNovoAluno"});
});



// GET alunos para formulário de alteração.
router.get('/alterarAluno/:cod', async function(req,res,next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }
  const codigo = parseInt(req.params.cod);
  const registro = await global.db.selecionarAluno(codigo);
  res.render('alunosForm', {titulo: "Alteração Aluno", registro, acao: "/gravarAlteracaoAluno"});
});



// GET alunos para excluir.
router.get('/excluirAluno/:cod', async function (req,res,next) {
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }
  const codigo = parseInt(req.params.cod);
  await global.db.apagarAluno(codigo);
  res.redirect('/alunos');
});



// GET livros.
router.get('/livros', async function(req,res,next) {
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/')
  }
  const registros = await global.db.buscarLivros();
  res.render('livros', {titulo: "Livros", registros});
})



// GET livros para formulário cadastro.
router.get('/novoLivro', function(req,res,next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }  
  res.render('livrosForm', {titulo: "Cadastro Livro", registro: {}, acao: "gravarNovoLivro"});
})



// GET livros para formulário de alteração.
router.get('/alterarLivro/:cod', async function(req,res,next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }
  const codigo = parseInt(req.params.cod);
  const registro = await global.db.selecionarLivro(codigo);
  res.render('livrosForm', {titulo: "Alteração Livro", registro, acao: "/gravarAlteracaoLivro"});
});



// GET livros para excluir.
router.get('/excluirLivro/:cod', async function (req,res,next) {
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }
  const codigo = parseInt(req.params.cod);
  await global.db.apagarLivro(codigo);
  res.redirect('/livros');
});



// GET emprestimos.
router.get('/emprestimos', async function (req,res,next) {
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)  
  {
    res.redirect('/')
  }
  const registros = await global.db.buscarEmprestimos();
  res.render('emprestimos', {titulo: "Empréstimos", registros})
})



// GET emprestimos para formulário cadastro.
router.get('/novoEmprestimo', function(req,res,next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }  
  res.render('emprestimosForm', {titulo: "Cadastro Empréstimo", registro: {}, acao: "/gravarNovoEmprestimo"});
});



//---------------------------POST'S------------------------------------------------------



// POSt login.
router.post('/login', async function(req, res, next){
  const login = req.body.edtUsuario;
  const senha = req.body.edtSenha;
  const usuario = await global.db.buscarUsuario({login, senha});
  //verificar se o usuário senha existe no BD
  if(usuario.usucodigo)
  {
    global.usuarioCodigo = usuario.usucodigo;
    global.usuarioLogin = usuario.usulogin;
    res.redirect('/principal');
  }
  else
  {
    res.redirect('/');
  }
});



// POST gravar novo aluno.
router.post('/gravarNovoAluno', async function(req,res,next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }
  const nome = req.body.edtNome;
  const email = req.body.edtEmail;
  const telefone = req.body.edtTelefone;
  await global.db.inserirAluno({nome, email, telefone});
  res.redirect('/alunos');
  });



// POST gravar alteração aluno.
router.post('/gravarAlteracaoAluno', async function(req,res,next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }
  const codigo = parseInt(req.body.edtCodigo);
  const nome = req.body.edtNome;
  const email = req.body.edtEmail;
  const telefone = req.body.edtTelefone;
  await global.db.alterarAluno({codigo, nome, email, telefone});
  res.redirect('/alunos');
});



// POST gravar novo livro.
router.post('/gravarNovoLivro', async function(req,res,next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }
  const titulo = req.body.edtTitulo;
  const autor = req.body.edtAutor;
  const paginas = req.body.edtPaginas;
  await global.db.inserirLivro({titulo, autor, paginas});
  res.redirect('/livros');
  });



// POST gravar alteração livro.
router.post('/gravarAlteracaoLivro', async function(req,res,next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }
  const codigo = parseInt(req.body.edtCodigo);
  const titulo = req.body.edtTitulo;
  const autor = req.body.edtAutor;
  const paginas = req.body.edtPaginas;
  await global.db.alterarLivro({codigo, titulo, autor, paginas});
  res.redirect('/livros');
});



/*// POST gravar novo emprestimo.
router.post('/gravarNovoEmprestimo', async function(req,res,next){
  if(!global.usuarioCodigo || global.usuarioCodigo <=0)
  {
    res.redirect('/');
  }
  const codigo = req.body.edtCodigo;
  const codAluno = req.body.edtCodAluno;
  const codLivro = req.body.edtCodLivro;
  await global.db.inserirAluno({nome, email, telefone});
  res.redirect('/alunos');
  });*/



module.exports = router;