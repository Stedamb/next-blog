import { defineField, defineType } from "sanity";

export const post = defineType({
    name: "post",
    type: "document",
    title: "Post",
    fields: [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        }),
        defineField({
            name: "author",
            type: "reference",
            to: [{ type: "author" }],
        }),
        defineField({
            name: "image",
            type: "url",
        }),
        defineField({
            name: "categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
        }),
        defineField({
            name: "publishedAt",
            type: "datetime",
        }),
        defineField({
            name: "body",
            type: "markdown",
        }),
    ],
    preview: {
        select: {
            title: "title",
            author: "author.name",
            media: "mainImage",
        },
        prepare(selection) {
            const { author } = selection;
            return { ...selection, subtitle: author && `by ${author}` };
        },
    },
});