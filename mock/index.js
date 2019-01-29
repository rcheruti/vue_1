
const express =     require('express')
const bodyParser =  require('body-parser')
const multer =      require('multer')
const upload =      multer({ dest: '../temp/' })
const app =         express()
app.use(bodyParser.json())

let db = {
  pessoas: [{
    id: 1,
    nome: 'Rafael',
    sexo: true,
    nascimento: '1990-12-10'
  },{
    id: 2,
    nome: 'Beatriz',
    sexo: false,
    nascimento: '1996-08-10'
  },]
}

// -------------------------

app.get('/pessoas', (req, res) => {
  res.send(db.pessoas)
})
camposUp = upload.fields([ { name: 'foto' }, { name: 'dados' } ])
app.post('/pessoas', camposUp, (req, res) => {
  console.log( req.files )
  let obj = req.body
  if( !obj.nome ) return res.status(400).send({ msg: `O nome é obrigatório!` })
  if( !('sexo' in obj) ) return res.status(400).send({ msg: `O sexo é obrigatório!` })
  if( !obj.nascimento ) return res.status(400).send({ msg: `O nascimento é obrigatório!` })

  obj.id = db.pessoas[ db.pessoas.length -1 ].id + 1
  db.pessoas.push(obj)
  setTimeout(() => res.status(200).send(obj), 1300)
})

// -------------------------

let port = 8080
app.listen(port, () => {
  console.log(`Mock server listening on port ${port}!`);
});
