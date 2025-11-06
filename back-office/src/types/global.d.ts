// Type declarations for importing CSS/SCSS files
// Allows both side-effect imports (import './globals.css') and CSS modules
declare module '*.css' {
  const content: { [className: string]: string } | string;
  export default content;
}

declare module '*.module.css' {
  const classes: { readonly [className: string]: string };
  export default classes;
}

declare module '*.scss' {
  const content: { [className: string]: string } | string;
  export default content;
}

declare module '*.module.scss' {
  const classes: { readonly [className: string]: string };
  export default classes;
}
