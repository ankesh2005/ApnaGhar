export const isLoggedIn=(req,res,next)=>{
  
  if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","you must login")
    return res.redirect("/login")
  }
  next()
}

export const savedRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl
  }
  next()
}