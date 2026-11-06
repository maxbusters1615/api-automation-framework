import { describe, test, expect } from '@jest/globals'
import { faker } from '@faker-js/faker/locale/cs_CZ'
import { validateSchema } from '../../schemas/schemaValidator'
import _ from 'lodash'
import { UsersClient } from '../../clients/usersClient'
import { authUserData } from './users.testdata'

describe('Auth login user API tests', () => {
  const usersClient = new UsersClient()

  test('1. Auth user by login and password [positive case]', async () => {
    const authResp = await usersClient.authUser(authUserData)

    expect(authResp.status).toBe(200)
    expect(authResp.data.username).toBe(authUserData.username)

    const schemeValidation = validateSchema('auth-login.schema.yaml', authResp.data)
    expect(schemeValidation.isValid).toBe(true)
  })

  test('2. Auth user by login and password [negative case - invalid login]', async () => {
    const invalidData = _.clone(authUserData)
    invalidData.username = faker.internet.username()

    const authResp = await usersClient.authUser(invalidData)
    expect(authResp.status).toBe(400)
    expect(authResp.data.message).toBe("Invalid credentials")
  })

  test('3. Auth user by login and password [negative case - invalid password]', async () => {
    const invalidData = _.clone(authUserData)
    invalidData.password = faker.internet.password()

    const authResp = await usersClient.authUser(invalidData)
    expect(authResp.status).toBe(400)
    expect(authResp.data.message).toBe("Invalid credentials")
  })

  test('4. Auth user by login and password [negative case - password is missing]', async () => {
    const invalidData = _.clone(authUserData)
    delete invalidData.password

    const authResp = await usersClient.authUser(invalidData)
    expect(authResp.status).toBe(400)
    expect(authResp.data.message).toBe("Username and password required")
  })

  test('5. Auth user by login and password [negative case - username is missing]', async () => {
    const invalidData = _.clone(authUserData)
    delete invalidData.username

    const authResp = await usersClient.authUser(invalidData)
    expect(authResp.status).toBe(400)
    expect(authResp.data.message).toBe("Username and password required")
  })
}) 