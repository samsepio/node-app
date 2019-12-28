const helpers = {};

helpers.isAuthenticated = (req,res,next) => {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error_msg','inisia sesion o registrate para entrar');
	res.redirect('/signin');
}

module.exports=helpers;
