# Styling:

## General

Devs should lean towards a more explicit class name, describing the content of the element in
relation to any parent element with a preference on kebab-casing over camelCasing class names.

- Use soft tabs (2 spaces) for indentation.
- Do not use ID selectors.
- When using multiple selectors in a rule declaration, give each selector its own line.
- Put a space before the opening brace `{` in rule declarations.
- In properties, put a space after, but not before, the `:` character.
- Put closing braces `}` of rule declarations on a new line.

## SCSS

### SCSS practices:

We will be using SCSS mostly to make use of its functionality (eg: lighten/darken, variables),
however we will explicitly NOT be using any ‘&’ operators or ‘@extends’. We will be creating SCSS
modules for every component and every page. For example, you will declare all layout properties for
the page in the Blog page module - however the styling for dimensions and interactions of the blog
posts themselves will live in the blog post components SCSS module.

### Grouping instead of nesting

We won’t be nesting child element selectors, we will be grouping block elements and and their child
elements together with no line of white space between the closing curly brace and a new element
selector. To separate unrelated content-blocks, we will add a line of white-space between the
closing curly brace and a new selector. There should always be a single space between the name of
the selector and the opening curly brace.

Example:

```css
.post {
  color: red;
}
.post-preview {
  padding: 20px;
}
.post-preview p {
  font-weight: bold;
}

.contact {
  padding: 20px;
}
.contact-form,
.contact-form-button {
  font-size: 20px;
}
```

### Plugin

We will be using `gatsby-plugin-sass` as a plugin to use SCSS modules. When creating your SCSS
module you’ll need to give it the extension `.module.scss` as in `blogPost.module.scss`. Each module
is imported to the component they are used in, with the module being named on import:
`import blogPostStyles from ‘./blog.module.scss’;`.

When assigning a class name to an element, you will use dot notation to reference the specific class
name(the class name will need to be written in camel-case, regardless of the convention used in the
style declaration), written as: `className={blogPostStyles.postPreview}` which will compile in css
to either `.post-preview`or`.postPreview`. The output class name applied on render will contain
additional characters that `gatsby-plugin-sass` injects. In the case of `.post-preview` that is
being applied from the `blogPostStyles` module, it will look something like:
`blog-post-module--post-preview--_LWeR` or `blogPost-module--postPreview--_c4S2` depending on the
case you’ve used when declaring the style. This will help provide a bit of path to find a particular
style in your src folder. The beginning of the class name `blog-post-module` tells you which SCSS
module to look in, followed by the class name (`post-preview`), the rest of the class name can be
ignored for searching purposes as it is just a randomly generated string which helps to limit
conflicts.
