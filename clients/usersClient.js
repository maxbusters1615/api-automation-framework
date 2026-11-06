import { config } from "../config/env";
import { ApiClient } from "./apiClient";

export class UsersClient extends ApiClient {
  constructor() {
    super(config.authUsersBaseUrl)
  }

  async getAllUsers(params = {}) {
    return this.get('/users', params)
  }

  async authUser(data = { username: '', password: '', expiresInMins: 30 }) {
    return this.post('/auth/login', data)
  }

}