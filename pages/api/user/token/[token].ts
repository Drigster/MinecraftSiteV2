export default async function handler(req, res) {
  const { token } = req.query;
  const session = await prisma.session.findUnique({ 
    where: { 
      sessionToken: token },
    include: { 
      user: { 
        include: { 
          userInfo: true, 
          skin: true 
        } 
      } 
    } 
  });
  if(session){
    const HttpUser = {
        "username": session.user.username,
        "uuid": session.user.id,
        "permissions": {
          "perms": JSON.parse(session.user.userInfo.permissions),
          "roles": JSON.parse(session.user.userInfo.roles)
        },
        "skin": {
          "url": session.user.skin.skin,
          "digest": "",
          "metadata": {
            "model": "default"
          }
        },
        "cloak": {
          "url": session.user.skin.cloak,
          "digest": ""
        }
      };
    const HttpUserSession = {
        "id": session.id,
        "user": (( HttpUser )),
        "expireIn": session.expires
      };

    console.log(HttpUserSession);

    res.status(200).json(HttpUserSession);
  }
  else {
    res.status(404);
  }
}
