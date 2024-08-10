import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

const Authenticate = ( req, res , next ) => {
           // Verifica se o token JWT foi fornecido no cabeçalho de autorização
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) {
            return res.status(401).json({ error: "Token não fornecido"})
        }

        try {
            // Verifica a validade do token JWT usando a chave secreta
            const decoded = jwt.verify(token , JWT_SECRET)
            // Adiciona o objeto decodificado do token (contendo o userId) ao objeto de requisição
            req.user = decoded

            next()
        } catch (error) {
            console.log("JWT_SECRET:", JWT_SECRET);
console.log("Token:", token);
            return res.status(403).json({ error: "Token invalido"})
        }
}

export default Authenticate;