CREATE DATABASE IF NOT EXISTS db_registro;

USE db_registro;

CREATE TABLE IF NOT EXISTS tb_usuario (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome_usuario VARCHAR(50) NOT NULL,
senha_usuario VARCHAR(255) NOT NULL,
email_usuario VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS tb_usuario_log (
id_usuario_log INT PRIMARY KEY AUTO_INCREMENT,
nome_usuario_log VARCHAR(50) NOT NULL,
senha_usuario_log VARCHAR(255) NOT NULL,
email_usuario_log VARCHAR(100) NOT NULL,
acao_usuario_log VARCHAR(50) NOT NULL,
data_acao_usuario_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ativo_usuario_log ENUM("ativo", "deletado") NOT NULL
);

ALTER TABLE tb_usuario_log ADD COLUMN id_origem INT;

DELIMITER //

CREATE TRIGGER after_usuario_insert
AFTER INSERT ON tb_usuario
FOR EACH ROW
BEGIN
    INSERT INTO tb_usuario_log (id_origem, nome_usuario_log, email_usuario_log, senha_usuario_log, acao_usuario_log, ativo_usuario_log)
    VALUES (NEW.id_usuario, NEW.nome_usuario, NEW.email_usuario, NEW.senha_usuario, 'INSERT', 'ativo');
END;
//

CREATE TRIGGER after_usuario_update
AFTER UPDATE ON tb_usuario
FOR EACH ROW
BEGIN
    INSERT INTO tb_usuario_log (id_origem, nome_usuario_log, email_usuario_log, senha_usuario_log, acao_usuario_log, ativo_usuario_log)
    VALUES (NEW.id_usuario, NEW.nome_usuario, NEW.email_usuario, NEW.senha_usuario, 'UPDATE', 'ativo');
END;
//

CREATE TRIGGER after_usuario_delete
AFTER DELETE ON tb_usuario
FOR EACH ROW
BEGIN
    INSERT INTO tb_usuario_log (id_origem, nome_usuario_log, email_usuario_log, senha_usuario_log, acao_usuario_log, ativo_usuario_log)
    VALUES (OLD.id_usuario, OLD.nome_usuario, OLD.email_usuario, OLD.senha_usuario, 'DELETE', 'deletado');
END;
//

DELIMITER ;