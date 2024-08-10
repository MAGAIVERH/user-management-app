import express from "express"
import User from '../models/User.js';

const router = express.Router()

router.get('/listar', async (req, res) => {
   
    try {
        const pegarUsuario = await User.find()

        return res.status(200).json({ message: "Usuarios Recuperados com sucesso!!!", pegarUsuario})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error do servidor."})
    }
})


router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Extrair o id dos parâmetros da rota
        const { username, password } = req.body;

        // Verifica se o usuário existe
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Atualiza o usuário
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, password },
            { new: true, runValidators: true }
        );

        return res.status(200).json({ 
            message: "Usuário atualizado com sucesso", 
            user: updatedUser 
        });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ message: "Erro ao tentar atualizar, tente novamente." });
    }
});


router.delete('/delete/:id' , async (req , res ) => {
    try {
        const {id} = req.params;

        const existingUser = await User.findById(id);
        if(!existingUser) {
            return res.status(404).json({message: "Usuario nao encontrado"})
        }

        // Deleta o Usuario
        const deletarUsuario = await User.findByIdAndDelete(id)

        return res.status(200).json({message: "Usuario deletado com sucesso", deletarUsuario})
        } catch (error) {
            console.log("Error ai tentar deletar um usuario")
                return res.status(400).json({ message: "Error ao tentar deletar um usuario, tente novamente"})
            }
})

export default router;