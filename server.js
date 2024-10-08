const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()

const authRoute = require('./routes/auth.route')
const projectRoute = require('./routes/project.route')
const listRoute = require('./routes/list.route')
const issueRoute = require('./routes/issue.route')
const userRoute = require('./routes/user.route')
const memberRoute = require('./routes/member.route')
const commentRoute = require('./routes/comment.route')

const { authMiddleware } = require('./controllers/auth.controller')
const { restrictProjectMiddleware } = require('./utils/restrictProjectMiddleware')


// const {genAddToProjectTemplate,genRemovedFromProjectTemplate,genIssueAssignedTemplate} = require('./controllers/mailer.controller')
// const mailTransporter = require('./utils/mailConfig')

const corOptions = {
	credentials: true,
	origin: true,
	methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
}

app.use(cors(corOptions))
app.use(cookieParser())
app.use(express.json())
app.get('/ok', (req, res) => res.send('The server is active, buddy.').end())

// app.get('/ok',async(req,res)=>{
// 	// const mailDetails = genAddToProjectTemplate("akhildekarla45@gmail.com","akhil","amazing project")
// 	// const mailDetails = genRemovedFromProjectTemplate("akhildekarla45@gmail.com","akhil","amazing project")
// 	const mailDetails = genIssueAssignedTemplate("akhildekarla45@gmail.com","akhil","amazing project","nikhil","A very difficult issue")
// 	mailTransporter.sendMail(mailDetails,(err,data) => {
// 		if(err){
// 			console.log(`error sending mail : ${err}`)
// 			// res.send(`error sending mail : ${err}`).end()
// 		}
// 		else{
// 			console.log(`mail sent successfully : ${JSON.parse(data)}`)
// 			// res.send(`mail sent successfully : ${JSON.parse(data)}`).end()
// 		}

// 	})
// 	res.json('The server is active, buddy.')
	
// })

app.use('/auth', authRoute)
app.use(authMiddleware)
app.use('/api/user', userRoute)
app.use('/api/project', projectRoute)
app.use('/api/list', restrictProjectMiddleware, listRoute)
app.use('/api/issue', restrictProjectMiddleware, issueRoute)
app.use('/api/member', restrictProjectMiddleware, memberRoute)
app.use('/api/comment', restrictProjectMiddleware, commentRoute)


app.listen(process.env.PORT)
