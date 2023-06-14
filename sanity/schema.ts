import { type SchemaTypeDefinition } from 'sanity'
import {product} from "./product"
import { category } from './category'
import { size } from './size'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, size],
}
