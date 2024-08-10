import express from "express"
import User from '../models/User.js';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    console.error("JWT_SECRET não está definido. Verifique seu arquivo .env");
    process.exit(1);
}

// Criando Usuario
router.post('/cadastro', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Usuário já existente" });
        }

        // Cria um novo usuário
        const newUser = new User({ username, password });
        const userDB = await newUser.save();

        return res.status(201).json(userDB);
    } catch (error) {
        console.error(error); // Loga o erro para depuração
        return res.status(500).json({ message: "Erro ao criar o usuário" });
    }
});

// Fazendo Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username, password})
        if(!user) {
            return res.status(401).json({ error: "Credenciais Inválidas"})
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, { expiresIn: "8h"} ) 
        res.json({token})
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
})

export default router;