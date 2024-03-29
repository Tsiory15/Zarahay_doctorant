const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const bcrypt = require('bcrypt')
const multer = require("multer")
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const app = express()
const path = require('path')
require('dotenv').config();
app.use(cookieParser());
app.use(express.json());
app.use(cors(
    {
        origin:["http://localhost:3000"],
        methods:["POST,GET,DELETE"],
        credentials:true
    }
))
const db = mysql.createConnection({
    host:process.env.HOST,  
    user:process.env.DB_USER,
    password:process.env.PASSWORD,
    database:process.env.DB})

db.connect((err) => {if(err){console.error('Erreur de connexion a la base de données:',err)}})
const createAdmin = `
CREATE TABLE IF NOT EXISTS admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_mail TEXT,
    admin_mdp TEXT
);`;
const createFormation =`
CREATE TABLE IF NOT EXISTS formation (
    id_formation INT PRIMARY KEY AUTO_INCREMENT,
    nom_formation TEXT,
    description_formation TEXT,
    expiration INT,
    unite TEXT
);`;
const createModule=`
CREATE TABLE IF NOT EXISTS module (
    id_module INT PRIMARY KEY AUTO_INCREMENT,
    id_formation INT,
    description_module TEXT,
    videos TEXT,
    pdf TEXT,
    ppt TEXT
);`;
const createUser =`
CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom TEXT,
    mail TEXT,
    mdp TEXT,
    date_creation DATE
);`;
const createInscription=`
CREATE TABLE IF NOT EXISTS inscription (
    id_inscription INT PRIMARY KEY AUTO_INCREMENT,
    id_formation TEXT,
    nom TEXT,
    status TEXT,
    execution_time TIMESTAMP,
    datefin TIMESTAMP
);`;

db.query(createAdmin,err => {if(err){console.log(err)}})
db.query(createFormation,err => {if(err){console.log(err)}})
db.query(createModule,err => {if(err){console.log(err)}})
db.query(createUser,err => {if(err){console.log(err)}})
db.query(createInscription,err => {if(err)console.log(err)})


//Fichier
app.use('/videos', express.static(path.join(__dirname, 'videos')));
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'videos')
    },
    filename:(req,file,cb) => {
        const fileExtension = path.extname(file.originalname);
        cb(null, `${Date.now()}${fileExtension}`);
    }
})
const upload = multer({storage: storage})

app.post('/play/:id',(req,res) => {
    const sql ="SELECT * from module WHERE id_module = ?";
    db.query(sql,req.params.id,(err,result) => {
        if(err)res.json({Message:"Failed to fetch data from play module"});
        return res.json(result);
    })
})

//Délai d'accès a une formation 
const ms = require('ms')
function execute(){
    const status = 'oui'
    db.query('SELECT * FROM inscription WHERE status = ?',[status],(error,result) => {
    if(error)console.log(error)
    const currentTime = new Date().getTime();
    result.forEach((row) => {
        const delai = ms(row.délai)
        const executionTime = new Date(currentTime + delai);
        if (!row.execution_time || executionTime > new Date(row.execution_time)) {
        setTimeout(() => {
            db.query('UPDATE inscription SET execution_time = ? WHERE id_inscription = ?', [executionTime, row.id_inscription], (error,result ) => {
                if (error) console.log(error);
                db.query('DELETE FROM inscription WHERE id_inscription = ?',[row.id_inscription],(err,res) => {
                    if(err)console.log(err)
                })
              });
        },delai)
        }
    })
})}
execute();
setInterval(execute,ms('1s'));





//Inscription
app.post('/inscription',(req,res) => {
    const status = 'non'
    const sql = "INSERT INTO inscription SET id_formation = ?,nom = ?, status = ?,délai = ?,execution_time = NOW()";
    db.query(sql,[req.body.id,req.body.name,status,req.body.expiration],(err,result) => {
        if(err)res.json(err);
        return res.json(result);
    })
})
app.get('/getinscrit',(req,res) => {
    const sql = "SELECT * FROM inscription";
    db.query(sql,(err,result) => {
        if(err)res.json(err);
        return res.json(result);
    })
})
//Vérification inscription
app.post('/checkinscrit',(req,res) => {
    const idFormation = req.body.id
    const status = 'non' 
    const sql = "SELECT * FROM inscription WHERE id_formation = ? AND nom = ? AND status = ?";
    db.query(sql,[idFormation,req.body.name,status],(err,result) => {
        if(err)res.json(err);
        if(result.length > 0){
            res.status(201).json(result)
        }else{
            res.status(202).json(result)
        }
    })
})
//Vérification validation
app.post('/getvalider',(req,res) => {
    const idFormation = req.body.id
    const status = 'oui' 
    const sql = "SELECT * FROM inscription WHERE id_formation = ? AND nom = ? AND status = ?";
    db.query(sql,[idFormation,req.body.name,status],(err,result) => {
        if(result.length > 0){
            res.status(201).json(result)
        }else{
            res.status(202).json(result)
        }
    })
})
//Valider inscription
app.post('/validate',(req,res) => {
    const status = 'oui'
    const timestamp = req.body.datefin
    const futuretimestamp = parseInt(timestamp,10)
    const sql = 'UPDATE inscription SET status = ? , datefin = ? WHERE id_inscription = ?'
    db.query(sql,[status,new Date(futuretimestamp),req.body.id_inscription],(err,result) => {
        if(err)res.json(err);
        return res.json(result)
    })
})
app.get('/getformationbyid/:id',(req,res) => {
    const sql = 'SELECT * FROM formation WHERE nom_formation = ?'
    db.query(sql,req.params.id,(err,result) => {
        if(err)res.json(err);
        return res.json(result);
    })
})
app.delete('/deleteinscription/:id',(req,res) => {
    const id = req.params.id
    const sql = "DELETE from inscription WHERE id_formation = ?";
    db.query(sql,[id],(err,result) => {
        if(err) return res.json(err);
        return res.json({Message:"Deleted successfully"});
    })
})
//Ajout module
app.post('/upload',upload.fields([{name:'video'},{name:'pdf'},{name:'ppt'}]),(req,res) => {
    const video = req.files['video'][0].filename;
    const pdf = req.files['pdf'][0].filename;
    const ppt = req.files['ppt'][0].filename;
    const description = req.body.description
    const id_formation = req.body.id_formation
    const sql = "INSERT INTO module SET videos = ?,pdf = ? ,ppt = ?,description_module = ?, id_formation = ?"
    db.query(sql,[video,pdf,ppt,description,id_formation],(err,result) => {
        if(err) return res.json({Message:"Error when uploading file"})
        return res.json({Status:"Success"})
    })
})

app.delete('/deleteModule/:id',(req,res) => {
    const id = req.params.id
    const sql = "DELETE from module WHERE id_module = ?";
    db.query(sql,[id],(err,result) => {
        if(err) return res.json(err);
        return res.json({Message:"Deleted successfully"});
    })
})

app.get('/getmodule',(req,res) => {
    const sql = "SELECT * FROM module"
    db.query(sql,(err,result) => {
        if(err)res.json({Message:"Failed to fetch data"});
        return res.json(result)
    })
})

app.delete('/delete/:id',(req,res) => {
    const id = req.params.id
    const sql = "DELETE from user WHERE id = ?";
    db.query(sql,[id],(err,result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})
//Suppression formation
app.delete('/delformation/:id',(req,res) => {
    const id = req.params.id
    const sql = "DELETE from formation WHERE id_formation = ?";
    db.query(sql,[id],(err,result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.get('/getall',(req,res) => {
    const sql = "SELECT * from user";
    db.query(sql,(err,result) => {
        if(err)res.json({Message:"Failed to get data"});
        return res.json(result);
    })
})
//Affichage des formations
app.get('/getformation',(req,res) => {
    const sql = "SELECT * from formation";
    db.query(sql,(err,result) => {
        if(err)res.json({Message:"Failed to get data from formation"});
        return res.json(result);
    })
})
//Affichage des modules selon les formations selectionner
app.post('/getmoduleformation/:id',(req,res) => {
    const sql ="SELECT * from module WHERE id_formation = ?";
    db.query(sql,req.params.id,(err,result) => {
        if(err)res.json({Message:"Failed to fetch data from module formation"});
        return res.json(result);
    })
})
//Authentication
app.post('/Acceuil',(req,res) => {
    const sql = "SELECT * from user WHERE mail = ?";
    db.query(sql,req.body.email,(err,result) => {
        if(err)res.json({Message:"Task failed successfully"});
        if(result.length > 0 && bcrypt.compareSync(req.body.pass,result[0].mdp)){
            const name = result[0].nom;
            const token = jwt.sign({name},"jsonwebtoken-secret-key",{expiresIn:"1y"});
            res.cookie('token',token);
            return res.json({Status:"Success"});
        }else{
            return res.status(201).json(result);
        }
    })
})
const verifyUser = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Message:"We need token"})
    }else{
        jwt.verify(token,"jsonwebtoken-secret-key",(err,decoded) => {
            if(err){
                return res.json({Message:"Authentication Error"})
            }else{
                req.name = decoded.name;
                next();
            }
        })
    }
}
app.get('/auth',verifyUser,(req,res)=>{
    return res.json({Status:"Success",name:req.name})
})

app.get('/logout',(req,res) => {
    res.clearCookie('token');
    return res.json({Status:"Success"})
})
app.get('/logoutasanadmin',(req,res) => {
    res.clearCookie('admin_token');
    return res.json({Status:"Success"})
})

app.post('/logadmin',(req,res) => {
    const sql = "SELECT * from admin WHERE admin_mail = ? and admin_mdp = ?";
    db.query(sql,[req.body.adminMail,req.body.adminPass],(err,result) => {
        if(err)res.json({Message:"Task failed successfully"});
        if(result.length > 0 ){
            const admin_name = result[0].admin_id
            const admin_token = jwt.sign({admin_name},"admin_secret_key",{expiresIn:'1y'});
            res.cookie('admin_token',admin_token)
            return res.status(200).json(result)
        }else{
            return res.status(201).json(result);
        }
    })
})
//Insertion de formation 
app.post('/formation',(req,res) => {
    const sql = "INSERT INTO formation SET nom_formation = ?,description_formation = ?,expiration = ?,unite = ?";
    db.query(sql,[req.body.nom,req.body.desc,req.body.delai,req.body.unite],(err,result) => {
        if(err)return res.json(err);
        return res.json(result)
    })
})
app.post('/editformation',(req,res) => {
    const sql = "UPDATE formation SET nom_formation = ?,description_formation = ?,expiration = ?,unite = ? WHERE id_formation = ?";
    db.query(sql,[req.body.nom,req.body.desc,req.body.delai,req.body.unite,req.body.idFormation],(err,result) => {
        if(err)return res.json(err);
        return res.json(result)
    })
})


//Code de validation
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const code = crypto.randomBytes(4).toString('hex')
const codeValidation = code

app.post('/sendValidation',(req,res) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.USER,
            pass:process.env.PASS,
        }
    })
    const mailOptions = {
        from:"Dontreply@gmail.com",
        to:req.body.mail,
        subject:'Code de validation',
        text:`Votre code de validation est ${code}`
    };
    transporter.sendMail(mailOptions,(error,info) => {
        if(error){
        console.error(error);
        res.status(201).send("Erreur lors de l'envoye du code de validation")
        }else{
        console.log('Code de validation envoyé : ' + info.response);
        res.status(200).send('Code de validation envoyé avec succès.');
        }
    })
})
//Mot de passe oublié
//Vérification existance adresse mail dans la base de données
app.post('/forgotpassword',(req,res) => {
    const check = 'SELECT * FROM user WHERE mail = ?'
    db.query(check,[req.body.mail],(err,result) => {
        if(err)return res.json(err);
        if(result.length > 0 && codeValidation === req.body.validation){
            const mail = result[0].mail
            const mail_token = jwt.sign({mail},"mail_secret_key",{expiresIn:'30m'});
            res.cookie('mail_token',mail_token)
            return res.status(201).json(result)
        }else{
            return res.status(202).json(result)
        }
    })
})
const getmail = (req,res,next) => {
    const mail_token = req.cookies.mail_token;
    if(!mail_token){
        return res.json({Message:"We need token"})
    }else{
        jwt.verify(mail_token,"mail_secret_key",(err,decoded) => {
            if(err){      
                return res.json({Message:"Authentication Error"})
            }else{
                req.mail = decoded.mail;
                next();
            }
        })
    }
}
app.get('/getmail',getmail,(req,res)=>{
    return res.json({Status:"Success",mail:req.mail})
})
//Réinitialisation de la mot de passe
app.post('/resetpassword',(req,res) => {
    const sql = 'UPDATE user SET mdp = ? WHERE mail = ?'
    bcrypt.hash(req.body.pass,10,(error,hash) => {
        if(error){
            console.log(error)
        }else{
            db.query(sql,[hash,req.body.mail],(err,result) => {
                if (err) return res.json(err);
                return res.json(result);
            })
        }
    })
})
//Création d'un compte
app.post('/user',(req,res) => {
    const sql = "INSERT INTO user SET nom = ?, mail = ?, mdp = ?, date_creation = ?";
    const check = "SELECT * from user WHERE mail = ? ";
        db.query(check,[req.body.mail],(err,results) => {
            if(err)return res.json(err);
            if(results.length > 0){
                return res.status(201).json(results);
            }else{
                if(req.body.validation != codeValidation){
                    console.log("incorrecte")
                    res.status(202).json(results);
                }else{
                bcrypt.hash(req.body.mdp,10,(error,hash) => {
                    if(error){
                        console.error("Error when crypting password")
                    }else{
                        db.query(sql,[req.body.name,req.body.mail,hash,req.body.formattedDate],(err,result) => {
                            if (err) return res.json(err);
                            return res.json(results);
                        })
                    }
                })}
                }
            })     
        })

const PORT = process.env.PORT
app.listen(PORT,() => {
    console.log(`Listening on PORT ${PORT}`)
})