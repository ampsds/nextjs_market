import jwt from "jsonwebtoken"

const secret_key = "nextmarket"

const auth = (handler) => {
  return async(req,res) => {
    if (req.method === "GET"){
      return handler(req,res)
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vYnVuYWdhQG1haWwuY29tIiwiaWF0IjoxNjc1MDgzNDUxLCJleHAiOjE2NzUxNjYyNTF9.GccTfPNnBOQNvBtUJsZqvtO0wDpZko0D_XPlDaBnTKw"
    //const token = await req.headers.authorization.split(" ")[l]

    if(!token){
      return res.status(401).json({message: "トークンがありません"})
    }
    try{
      const decoded = jwt.verify(token, secret_key)
      req.body.email = decoded.email
      return handler(req,res)
    }catch(err){
      return res.status(401).json({message: "トークンが正しくないので、ログインしてください"})
    }
  }
}

export default auth