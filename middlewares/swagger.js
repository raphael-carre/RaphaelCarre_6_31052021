import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import jsDoc from 'swagger-jsdoc'
import YAML from 'js-yaml'

const swaggerConfig = await jsDoc(YAML.load(fs.readFileSync(process.cwd() + '/docs/swagger/index.yaml'), 'utf8'))

export { swaggerUi, swaggerConfig }