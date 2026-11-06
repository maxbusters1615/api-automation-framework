import { faker } from '@faker-js/faker/locale/cs_CZ'

export const createPostsNegativeCases = [
  {
    title: '2. Create post [negative case - missing title field]',
    field: 'title',
    schemeValidationError: { missingProperty: 'title' }
  },
  {
    title: '3. Create post [negative case - missing body field]',
    field: 'body',
    schemeValidationError: { missingProperty: 'body' }
  },
  {
    title: '4. Create post [negative case - missing userId field]',
    field: 'userId',
    schemeValidationError: { missingProperty: 'userId' }
  },
  {
    title: '5. Create post [negative case - wrong userId type]',
    field: 'userId',
    schemeValidationError: { type: "integer" }
  }
]

export const updatePostsNegativeCases = [
  {
    title: '8. Update post [negative case - missing title field]',
    field: 'title',
    schemeValidationError: { missingProperty: 'title' }
  },
  {
    title: '9. Create post [negative case - missing body field]',
    field: 'body',
    schemeValidationError: { missingProperty: 'body' }
  },
  {
    title: '10. Create post [negative case - missing userId field]',
    field: 'userId',
    schemeValidationError: { missingProperty: 'userId' }
  },
  {
    title: '11. Create post [negative case - wrong userId type]',
    field: 'userId',
    schemeValidationError: { type: "integer" }
  }
]

export const createPostData = {
  title: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  userId: faker.number.int({ min: 1, max: 100 })
}

export const updatePostData = {
  id: faker.number.int({ min: 1, max: 100 }),
  data: {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    userId: faker.number.int({ min: 1, max: 100 })
  }
}