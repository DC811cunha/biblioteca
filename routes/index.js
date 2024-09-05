var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { titulo: 'Sistema de Biblioteca' });
});

router.post('/login', async function(req, res, nest){
  const login = req.body.edtUsuario;
  const senha = req.body.edtSenha;

  //verificar se o usuário senha existem no BD
  const usuario = await global.db.buscarUsuario({login, senha});

  if(usuario.usucodigo)
  {
    res.redirect('/principal');
  }
  else
  {
    res.redirect('/');
  }
});

module.exports = router;
