const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user:"SEU_USUÁRIO",
    password:"SUA_SENHA",
    database:"db_registro"
})

app.post('/usuario/cadastrar', (req, res) => {
    const { nome_usuario, senha_usuario, email_usuario } = req.body;
    console.log('Usuário:',nome_usuario, 'Email:',email_usuario);

    db.query('INSERT INTO tb_usuario (nome_usuario, senha_usuario, email_usuario) VALUES (?, ?, ?)',
    [ nome_usuario, senha_usuario, email_usuario ],
    (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        res.json({ message: `Usuário cadastrado com sucesso!` });
    });
});

app.get('/usuario', (req, res) => {
    db.query('SELECT * FROM tb_usuario', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
    });
});

app.delete('/usuario/deletar/:id', (req, res) => {
    db.query('DELETE FROM tb_usuario WHERE id_usuario = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao deletar usuário: ' + err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: `Usuário com ID ${req.params.id} deletado com sucesso!` });
    });
});

app.put('/usuario/editar/:id', (req, res) => {
    const id = req.params.id;
    const { nome_usuario, senha_usuario, email_usuario} = req.body;

    let coluna, valor;
        if (nome_usuario) {
            coluna = 'nome_usuario';
            valor = nome_usuario;
        }
        else if (senha_usuario) {
            coluna = 'senha_usuario';
            valor = senha_usuario;
        }
        else if (email_usuario) {
            coluna = 'email_usuario';
            valor = email_usuario
        }
        else {
            return res.status(400).json({ message: 'Nenhum campo para atualizar' });
        }

    db.query(`UPDATE tb_usuario SET ${coluna} = ? WHERE id_usuario = ?`,
    [valor, id],
    (err) => {
        if (err) return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
        res.json({ message: 'Usuário atualizado com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log("🌐💻 Servidor rodando na porta 3000 🌐💻");
})