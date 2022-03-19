export const checkAuth = (req,res,next) =>{
    const status = true;
    if(status)
    {
        next();
    }
    else{
        console.log("Không có truy cập");
    }
}