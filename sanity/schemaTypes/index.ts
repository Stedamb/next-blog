import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { post } from './post'
import { category } from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, post, category],
}
