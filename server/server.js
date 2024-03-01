const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2/promise');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rankme',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 1000,
  queueLimit: 0
});

// Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // }
  filename: function (req, file, cb) {
    const timestamp = new Date().toISOString().replace(/:/g, '-'); // Use timestamp in the filename
    const filename = timestamp + '-' + file.originalname;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// route

app.get('/api/getdata', async(req,res) => {
    const connection = await pool.getConnection();
    const results = await connection.execute('SELECT * FROM vote ORDER BY vote DESC');
    connection.release();
    res.status(200).json(results[0])
})

app.get('/api/getdata/:id', async(req,res) => {
    let id = req.params.id
    console.log(id)
    try {
      const connection = await pool.getConnection();
      const results = await connection.execute('SELECT * FROM vote WHERE id = ?',[id]);
      connection.release();
      res.status(200).json(results[0])
    } catch (error) {
      console.log(error.message)
    }

})



app.get('/api/numberone', async(req,res) => {
    try {
        const connection = await pool.getConnection();
        const ontop = await connection.execute('SELECT * FROM vote ORDER BY vote DESC LIMIT 1');
        connection.release();
        res.status(200).json(ontop[0])
    } catch (error) {
        console.log(error.message)
    }

})

// Routes
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    const { filename } = req.file;
    const { name } = req.body;

    const vote = '0'
    const connection = await pool.getConnection();
    await connection.execute('INSERT INTO vote (name, vote, img) VALUES (?,?,?)', [name, vote,`uploads/${filename}`]);
    connection.release();

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delte method

app.delete('/api/delete/:id', async (req,res) => {
    try {
        let id = req.params.id
        console.log(id)
        const connection = await pool.getConnection();
        const a1 = await connection.query('DELETE FROM vote WHERE id = ?',id);
        connection.release()

        res.status(200).json({
            message: 'delete ok.',
            data: a1[0]
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal error'
        })
    }
})

app.patch('/api/vote/:id', async(req,res) => {
    try{
        let id = req.params.id
        let { vote } = req.body
        console.log(id,' ',vote)
        const connection = await pool.getConnection();
        const results = await connection.query(
            'UPDATE vote SET vote = vote + ? WHERE id = ?',
            [vote, id]
            )
        connection.release()
        res.json({
            message: 'update ok.',
            data: results[0]
        })
    } catch(error) {
        console.error('error message', error.message)
        res.status(500).json({
            message: 'something wrong',
        })
    }

    
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
