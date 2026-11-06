import dotenv from "dotenv";
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

export const config = {
  postsBaseUrl: process.env.BASE_POSTS_URL,
  authUsersBaseUrl: process.env.BASE_AUTH_USERS_URL,
  authUserPwd: process.env.AUTH_USER_PWD
}