const express = require('express')
const app = express()

const listener = app.listen(3000, () => {
  console.log('App is running on port', listener.address().port)
})

const fileUpload = require('express-fileupload')
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './tmp-sounds',
}))

app.post('/upload-sound', async (req, res) => {
  let file = req.files.sound

  await res.send({
    status: true,
    message: 'File is uploaded',
    data: {
      filename: file.tempFilePath.split('/')[1],
      mimetype: file.mimetype,
      size: file.size
    }
  })
})

app.use(express.static('preset-sounds'))
app.use(express.static('tmp-sounds'))
app.use(express.static('public'))