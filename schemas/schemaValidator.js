import Ajv from "ajv";
import addFormats from "ajv-formats"
import path from "path"
import fs from "fs"
import * as yaml from "js-yaml"

const ajv = new Ajv({ allErrors: true, strict: false })
addFormats(ajv)

export function validateSchema(schemaFileName, data) {
  const filePath = path.resolve(process.cwd(), `schemas/yaml/${schemaFileName}`)
  const fileContents = fs.readFileSync(filePath, 'utf8')

  const schema = yaml.load(fileContents)
  const validate = ajv.compile(schema)

  return {
    isValid: validate(data),
    errors: validate.errors
  }
}