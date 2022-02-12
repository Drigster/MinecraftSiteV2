import { getRandomString } from "../../../modules/utils";
import { compare } from 'bcrypt';
import { prisma } from "../../../modules/db";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'metod is not allowed' });
  }
  const request = req.body;
  let user = await prisma.user.findUnique({ 
    where: { 
      username: request["login"] 
    },
    include: { 
      userInfo: true,
      session: true
    }
  });
  if(await compare(request['password']['password'], user.password)){
    if(user.session){
      await prisma.user.update({
        where: { username: request["login"] },
        data: {
          session: {
            delete: true
          }
        },
        include: {
          userInfo: true
        }
      });
    }
    const token = getRandomString(16);
    const session = await prisma.session.create({
      data: {
        sessionToken: token,
        user: { connect: { id: user.id } },
        expires: (Date.now() + 60*60*1000)
      }
    });
    const HttpUserSession = await (await fetch(`${process.env.NEXTAUTH_URL}/api/user/token/${session.sessionToken}`)).json();
    const AuthReport = {
        "minecraftAccessToken": session.sessionToken,
        "oauthAccessToken": session.sessionToken,
        "oauthRefreshToken": user.userInfo.refreshToken,
        "oauthExpire": 0,
        "session": (( HttpUserSession ))
      };
    res.status(200).json(AuthReport);
  }
  else {
    res.status(404).send();
  }
}
