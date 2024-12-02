import { defineType } from "sanity";

export const author = defineType({
    name: 'author',
    type: 'document',
    title: 'Author',
    icon: 'UserIcon',
    fields: [
        {
            name: 'id',
            type: 'number'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'username',
            type: 'string'
        },
        {
            name: 'image',
            type: 'url'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'bio',
            type: 'text'
        }
    ],
    preview: {
        select: {
            title: 'name'
        }
    }
})