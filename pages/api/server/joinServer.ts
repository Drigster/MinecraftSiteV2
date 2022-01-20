export default async function handler(req, res) {
  const request = req.body;
  const user = await prisma.user.findUnique({ 
    where: { username: request["username"] },
    include: { session: true }
  });
  if(user.session.sessionToken == request["accessToken"]){
    res.status(200).send();
  }
  else {
    res.status(404).send();
  }
}
