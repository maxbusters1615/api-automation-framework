import { config } from "../config/env";
import { ApiClient } from "./apiClient";

export class PostsClient extends ApiClient {
  constructor() {
    super(config.postsBaseUrl)
  }

  async getAllPosts() {
    return this.get('/posts')
  }

  async createPost(data = { title: '', body: '', userId: 0 }) {
    return this.post('/posts', data)
  }

  async updatePostById(postId, data = { title: '', body: '', userId: 0 }) {
    return this.put(`/posts/${postId}`, data)
  }
}