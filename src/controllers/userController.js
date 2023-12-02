export const getUsers = (req, res)=>{
    console.log("llegaste a la ruta de usuario");
    res.status(201).json({
        hola:"chau"
    });
};