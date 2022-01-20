export default async function handler(req, res) {
  const { uuid } = req.query;
  const user = await prisma.user.findUnique({ 
    where: { id: uuid },
    include: { skin: { select: { skin: true, cloak: true } }, userInfo: { select: { permissions: true, roles: true } } }});
  if(user){
    const HttpUser = JSON.stringify(
      {
        "username": user.username,
        "uuid": user.id,
        "permissions": {
          "perms": JSON.parse(user.userInfo.permissions),
          "roles": JSON.parse(user.userInfo.roles)
        },
        "skin": {
          "url": user.skin.skin,
          "digest": "",
          "metadata": {
            "model": "default"
          }
        },
        "cloak": {
          "url": user.skin.cloak,
          "digest": ""
        }
      }
    )
    res.status(200).json(HttpUser);
  }
  else {
    res.status(404);
  }
}
