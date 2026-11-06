import { describe, test, expect } from '@jest/globals'
import { validateSchema } from '../../schemas/schemaValidator'
import _ from 'lodash'
import { UsersClient } from '../../clients/usersClient'

describe('Get Users API tests', () => {
  const usersClient = new UsersClient()

  test('1. Get users [positive case - with no params]', async () => {
    const getResp = await usersClient.getAllUsers()

    expect(getResp.status).toBe(200)
    expect(getResp.data.limit).toBe(30)
    expect(getResp.data.skip).toBe(0)
    expect(getResp.data.total).toBeGreaterThanOrEqual(1)

    const schemeValidation = validateSchema('users-list.schema.yaml', getResp.data)
    expect(schemeValidation.isValid).toBe(true)
  })

  test('2. Get users [positive case - with limit param]', async () => {
    const getResp = await usersClient.getAllUsers({ limit: 1 })

    expect(getResp.status).toBe(200)
    expect(getResp.data.limit).toBe(1)
    expect(getResp.data.skip).toBe(0)
    expect(getResp.data.total).toBeGreaterThanOrEqual(1)


    const schemeValidation = validateSchema('users-list.schema.yaml', getResp.data)
    expect(schemeValidation.isValid).toBe(true)
  })

  test('3. Get users [positive case - with skip param]', async () => {
    const getResp = await usersClient.getAllUsers({ limit: 2 })
    expect(getResp.status).toBe(200)
    expect(getResp.data.limit).toBe(2)
    expect(getResp.data.skip).toBe(0)
    expect(getResp.data.total).toBeGreaterThanOrEqual(1)


    const schemeValidation = validateSchema('users-list.schema.yaml', getResp.data)
    expect(schemeValidation.isValid).toBe(true)

    const secondUser = _.cloneDeep(getResp.data.users[1])

    const getWithSkipResp = await usersClient.getAllUsers({ limit: 2, skip: 1 })
    expect(getWithSkipResp.status).toBe(200)
    expect(getWithSkipResp.data.limit).toBe(2)
    expect(getWithSkipResp.data.skip).toBe(1)
    expect(getResp.data.total).toBeGreaterThanOrEqual(1)
    expect(getWithSkipResp.data.users[0]).toEqual(secondUser)

    const schemeValidation2 = validateSchema('users-list.schema.yaml', getWithSkipResp.data)
    expect(schemeValidation2.isValid).toBe(true)
  })

  test('4. Get users [positive case - with limit=0 param]', async () => {
    const getResp = await usersClient.getAllUsers({ limit: 0 })

    expect(getResp.status).toBe(200)
    expect(getResp.data.limit).not.toBe(0)
    expect(getResp.data.limit).toBe(getResp.data.total)
    expect(getResp.data.skip).toBe(0)

    const schemeValidation = validateSchema('users-list.schema.yaml', getResp.data)
    expect(schemeValidation.isValid).toBe(true)
  })

  test('5. Get users [negative case - with limit="ABC" param]', async () => {
    const getResp = await usersClient.getAllUsers({ limit: "ABC" })

    expect(getResp.status).toBe(400)
    expect(getResp.data.message).toBe("Invalid 'limit' - should be a positive number")
  })

  test('6. Get users [negative case - with skip="ABC" param]', async () => {
    const getResp = await usersClient.getAllUsers({ skip: "ABC" })

    expect(getResp.status).toBe(400)
    expect(getResp.data.message).toBe("Invalid 'skip' - should be a positive number")
  })
})