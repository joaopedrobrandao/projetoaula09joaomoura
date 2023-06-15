const express = require('express'); 
const multer  = require('multer')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '..data/imagens.db';

const hostname = '127.0.0.1';
const port = 3010;
const app = express();


/* Colocar toda a parte estática no frontend */
app.use(express.static("./public"));

/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './public/imagens')
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }

})

const upload = multer({ storage: storage })


app.get('/', (req, res) => {
  res.sendFile('/public/index.html');
});


// Retorna todos registros (é o R do CRUD - Read)
app.get('/imagens', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM imagens ORDER BY id DESC';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			console.log('rows')
			console.log(rows)
			res.json(rows[0]);
		});
		db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereimagem', upload.single("file"), (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
  console.log(req.file)
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = "INSERT INTO imagens (URL) VALUES ('" +req.file.originalname+ "')";
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});


app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
