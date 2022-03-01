import { getRandomString } from "../../../modules/utils";
import { prisma } from "../../../modules/db";

export default async function handler(req, res) {
  const request = JSON.parse(req.body);
  const userInfo = await prisma.userInfo.findUnique({ 
    where: { refreshToken: request["refreshToken"] },
    include: { user: { include: { session: true } } }
  });
  if(userInfo){
    const token = getRandomString(16);
    const refreshToken = getRandomString(16);
    await prisma.user.update({ where: { 
      username: userInfo.user.username }, 
      data: { userInfo: { update: { refreshToken: refreshToken } }, session: { disconnect: true } } 
    });
    const session = await prisma.session.create({
      data: {
        sessionToken: token,
        user: { connect: { id: userInfo.user.id } },
        expires: (Date.now() + 60*60*1000)
      }
    });
    const HttpUserSession = await fetch(`/api/user/token/${session.sessionToken}`)
    const AuthReport = {
        "minecraftAccessToken": session.sessionToken,
        "oauthAccessToken": session.sessionToken,
        "oauthRefreshToken": refreshToken,
        "oauthExpire": 0,
        "session": (( HttpUserSession ))
      };
    res.status(200).json(AuthReport);
  }
  else {
    res.status(404).send({error: "auth.usernotfound"});
  }
}
