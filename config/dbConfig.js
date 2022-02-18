module.exports={
  getDbConnectionString:function(){   
      
      if(process.env.NODE_ENV ==="production"){
      return `mongodb+srv://${process.env.DBUNAMEPROD}:${process.env.DBPWDPROD}@cluster0.jb4mc.mongodb.net/${process.env.DBNAMEPROD}?retryWrites=true&w=majority`}
      else{
      return `mongodb+srv://${process.env.DBUNAMEDEV}:${process.env.DBPWDDEV}@cluster0.jb4mc.mongodb.net/${process.env.DBNAMEDEV}?retryWrites=true&w=majority`
  }
  }
}

