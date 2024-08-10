import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv';
import cors from 'cors';



// Importar Rotas
import PublicRoutes from "./routes/PublicRoutes.js"
import PrivateRoutes from "./routes/PrivateRoutes.js"
import Authenticate from "./middleware/Authenticate.js";



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://user-management-app-three.vercel.app/",
  credentials: true
}));
const JWT_SECRET= process.env.JWT_SECRET
const PORT = 5000;




// testando 
app.get('/', (req, res) => {
    return res.send("Hello World!!!") 
})

// Rotas
app.use('/', PublicRoutes)
app.use('/', Authenticate, PrivateRoutes)


mongoose.connect('mongodb+srv://TaskManager:QBLOo02SFTUYalia@taskmanagerdb.fju7ny5.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagerDB')
.then(() => {
    console.log("Conectado ao mongo DB com sucesso")
    app.listen(PORT, () => {
    console.log(`O servidor esta rodando na porta ${PORT} `)
})
})
.catch((error) => {
    console.log("Error ao conectar com o mongo DB")
})
