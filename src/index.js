const express=require('express');
const morgan=require('morgan');
const path=require('path');
const mongoose=require('mongoose');
const exphbs=require('express-handlebars');
const methodOverride=require('method-override');
const multer=require('multer');
const uuid=require('uuid/v4');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const {format}=require('timeago.js');
const app=express();

mongoose.connect('mongodb+srv://eliotalderson_01:3219329910@databasered-6xixf.mongodb.net/test?retryWrites=true&w=majority')
	.then(db => console.log('conectado a la base de datos'))
	.catch(err => console.log(err));

require('./passport/local-auth');

app.set('puerto',process.env.PORT || 8000);
app.set('views',path.join(__dirname,'./views'));
app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'),'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs'
}));
app.set('view engine','.hbs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
	destination: path.join(__dirname,'public/img/uploads'),
	filename: (req,file,cb,filename) => {
		cb(null,uuid()+path.extname(file.originalname));
	}
});
app.use(multer({
	storage
}).single('image'));
app.use(session({
	secret: uuid(),
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=>{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	//cuando passport autentica un usuario el guarda la informacion dentro de un objeto en request si no hay un usuario que el valor sea nulo
	res.locals.user = req.user || null;
	next();
});
app.use(require('./routes/index'));
app.use(require('./routes/image'));
app.use(require('./routes/users'));

app.use(express.static(path.join(__dirname,'./public')));

app.listen(app.get('puerto'),()=>{
	console.log(`servidor ejecutandose en el puerto ${app.get('puerto')}`);
});
