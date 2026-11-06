import { describe, test, expect } from '@jest/globals'
import { PostsClient } from '../../clients/postsClient'
import { validateSchema } from '../../schemas/schemaValidator'
import _ from 'lodash'
import { createPostData, createPostsNegativeCases, updatePostData, updatePostsNegativeCases } from './posts.testdata'

describe('Posts API tests', () => {
  const postsClient = new PostsClient()

  const createPost = async (data) => {
    const createResp = await postsClient.createPost(data)

    expect(createResp.status).toBe(201)
    expect(createResp.data).toMatchObject(data)

    return createResp
  }

  const updatePost = async (updatePostData, isPositiveCase = true) => {
    const updateResp = await postsClient.updatePostById(updatePostData.id, updatePostData.data)

    if (!isPositiveCase) {
      return updateResp
    }

    expect(updateResp.status).toBe(200)
    expect(updateResp.data).toMatchObject(updatePostData.data)

    return updateResp
  }


  test('1. Create post [positive case]', async () => {
    const createResp = await createPost(createPostData)

    const schemeValidation = validateSchema('post.schema.yaml', createResp.data)
    expect(schemeValidation.isValid).toBe(true)
  })

  for (let testCase of createPostsNegativeCases) {
    test(testCase.title, async () => {
      const invalidData = _.clone(createPostData)
      if (testCase.schemeValidationError.missingProperty) {
        delete invalidData[testCase.field]
      }
      if (testCase.schemeValidationError.type) {
        invalidData[testCase.field] = 'abc'
      }

      const createResp = await createPost(invalidData)

      const schemeValidation = validateSchema('post.schema.yaml', createResp.data)

      expect(schemeValidation.isValid).toBe(false)
      expect(schemeValidation.errors).toHaveLength(1)
      expect(schemeValidation.errors[0].params).toEqual(testCase.schemeValidationError)
    })
  }

  test('6. Update post [positive case]', async () => {
    const updateResp = await updatePost(updatePostData)

    const schemeValidation = validateSchema('post.schema.yaml', updateResp.data)
    expect(schemeValidation.isValid).toBe(true)
  })

  test('7. Update post [negative case - non existed post id', async () => {
    const invalidData = _.clone(updatePostData)
    invalidData.id = 103

    const updateResp = await updatePost(invalidData, false)
    expect(updateResp.status).toBe(500)
  })

  for (let testCase of updatePostsNegativeCases) {
    test(testCase.title, async () => {
      const invalidData = _.cloneDeep(updatePostData)
      if (testCase.schemeValidationError.missingProperty) {
        delete invalidData.data[testCase.field]
      }
      if (testCase.schemeValidationError.type) {
        invalidData.data[testCase.field] = 'abc'
      }

      const updateResp = await updatePost(invalidData)

      const schemeValidation = validateSchema('post.schema.yaml', updateResp.data)

      expect(schemeValidation.isValid).toBe(false)
      expect(schemeValidation.errors).toHaveLength(1)
      expect(schemeValidation.errors[0].params).toEqual(testCase.schemeValidationError)
    })
  }
})