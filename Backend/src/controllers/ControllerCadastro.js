// import User from "../models/User.js"


// const Register = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Verifica se o usuário já existe
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(409).json({ message: "Usuário já existente" });
//         }

//         // Cria um novo usuário
//         const newUser = new User({ username, password });
//         const userDB = await newUser.save();

//         return res.status(201).json(userDB);
//     } catch (error) {
//         console.error(error); // Loga o erro para depuração
//         return res.status(500).json({ message: "Erro ao criar o usuário" });
//     }
// }

// export default Register; 