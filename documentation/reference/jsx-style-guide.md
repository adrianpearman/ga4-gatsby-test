# JSX

## General:

- We will be importing Components from react, using hooks for graphql, and functions for stateless
  components
- Only include one React component per file.
- Always use JSX syntax.
- Name your component upon instantiation
- Export component on its own line at the bottom of the file

## Class vs stateless

`class BlogPost extends Component {` is the preferred method of class instantiation, and
`function BlogPost() {` or `const BlogPost = () => {` for stateless components.

## Naming

- Extensions: Use `.jsx` extension for React components
- Filname: Use PascalCase for filenames. Eg., `BlogPost.jsx`
- Use camelCase for prop names
- Prop Naming: avoid using DOM component props names. Eg. `<BlogPost style="thisOrThat" />`

## Alignment and spacing

- Drop attributes to their own line
- If component has a single attribute and can fit entirely in one line, do so
- Child elements get nested as usual
- Always include a single space in self-closing tag
- If your component has multi-line properties, close its tag on a new line

## Props

- Omit the value of the prop when it is explicitly `true`
- Always include an `alt` prop on `<img>` tags, if image is presentation `<img>` must have
  `role="presentation"`
- Don't use words like "image", "photo", "picture of" in `alt` props as screenreaders announce it as
  an image already

## Misc

- Avoid using array index as `key`
- Wrap JSX tags in parentheses when they span more than one line
