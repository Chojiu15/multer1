const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')
const PORT = 3002

const publicFolder = path.join(__dirname, 'public')
const uploadFolder = path.join(publicFolder, 'uploads')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
      cb(null, `${+Date.now()}-${file.originalname}`)
    }
  })

const upload = multer({storage : storage})


app.use(express.static(path.join(__dirname, './public')))


app.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
    console.log(req.file)
    if(!req.file){
        return res.status(404).send('No file')
    }
    else{
        res.send(`<img src='uploads/${req.file.filename}' alt='profile pic' width='500' />`)
    }
    })

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))