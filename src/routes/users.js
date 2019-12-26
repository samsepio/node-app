const express=require('express');
const router=express.Router();

router.get('/signin',(req,res,next)=>{
	res.render('signin');
});
router.get('/signup',(req,res,next)=>{
	res.render('signup');
});
router.post('/signup',async(req,res,next)=>{
	const {email,name,password,comfirm} = req.body;
	const errors = []
	if(email.length <= 0 || name.length <= 0 || password.length <= 0 || comfirm.length <= 0){
		errors.push({text: 'todos los campos son hobligatorios'});
	}
	if(password.length <= 4){
		errors.push({text: 'la contraseña debe ser menor de 4 caracteres'});
	}
	if(password != comfirm){
		errors.push({text: 'las contraseñas no coinciden'});
	}
	if(errors.length > 0){
		res.render('signup',{email,name,password,comfirm,errors});
	}else{
		res.redirect('/profile');
	}
});

module.exports=router;
