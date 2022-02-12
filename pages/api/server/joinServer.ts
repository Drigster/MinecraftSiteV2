export default async function handler(req, res) {
  const request = req.body;
  const user = await prisma.user.findUnique({ 
    where: { username: request["username"] },
    include: { session: true }
  });
  if(user.session.sessionToken == request["accessToken"]){
    await prisma.user.update({ where: { 
      username: user.username }, 
      data: { 
        auntificationData: { 
          update: { 
            serverId: request["serverId"]
          } 
        }
      } 
    });
    res.status(200).send();
  }
  else {
    res.status(404).send();
  }
}
