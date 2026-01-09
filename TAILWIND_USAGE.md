# Using Tailwind CSS with Bootstrap

This project uses both Bootstrap and Tailwind CSS for styling. This document explains how to effectively use both frameworks together without conflicts.

## How It's Set Up

The project is configured to use both Bootstrap and Tailwind CSS with the following considerations:

1. **Parent class scoping**: All Tailwind CSS styles are scoped to elements inside a parent with the `.tailwind` class
2. **Tailwind's base styles are disabled**: This prevents Tailwind from resetting styles that Bootstrap relies on
3. **Tailwind is marked as important within scope**: This ensures Tailwind styles can override Bootstrap when needed within tailwind containers
4. **Custom Tailwind styles**: We've converted custom CSS to Tailwind format in `src/app/tailwind-custom.css`

## Usage Guidelines

### How to Use Tailwind in Your Components

1. Add the `tailwind` class to the parent element where you want to use Tailwind CSS:

```jsx
<div className="tailwind">
  {/* All Tailwind classes work without prefixes in here */}
  <div className="flex items-center p-4 bg-blue-500 text-white">
    This uses Tailwind classes
  </div>
</div>
```

2. Outside of elements with the `tailwind` class, use Bootstrap or regular CSS as usual:

```jsx
<div className="container">
  <div className="row">
    <div className="col-md-6">{/* Bootstrap content */}</div>
    <div className="col-md-6">
      {/* Use Tailwind inside a scoped element */}
      <div className="tailwind p-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Tailwind Button
        </button>
      </div>
    </div>
  </div>
</div>
```

### When to Use Bootstrap

Continue using Bootstrap for:

- Layout grid system (rows, columns)
- Basic components (navbar, cards, modals, forms)
- Existing elements to maintain consistency

### When to Use Tailwind CSS

Use Tailwind for:

- Custom styling needs
- One-off UI elements
- Quick adjustments without writing custom CSS
- New components where design flexibility is needed

### Custom Styles

Many custom styles from the original `custom.css` have been converted to Tailwind utilities:

1. **Button styles**: Original button classes like `btn-prm`, `btn-scn` have been converted to use Tailwind's `@apply` directive
2. **Colors**: Colors like `blue-bg` and `text-yellow` have Tailwind equivalents
3. **Typography**: Font styles for headings have been converted to Tailwind classes
4. **Background images**: Complex background images remain as custom classes but can be used alongside Tailwind

### Example Usage

```jsx
// Example of using both frameworks together
<div className="container">
  {" "}
  {/* Bootstrap container */}
  <div className="row">
    {" "}
    {/* Bootstrap row */}
    <div className="col-md-6">
      {" "}
      {/* Bootstrap column */}
      {/* Standard Bootstrap card */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Bootstrap Card</h5>
          <p className="card-text">This is styled with Bootstrap</p>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      {" "}
      {/* Bootstrap column */}
      {/* Tailwind-scoped card */}
      <div className="tailwind">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h5 className="text-xl font-bold mb-2">Tailwind Card</h5>
          <p className="text-gray-700">This is styled with Tailwind</p>

          {/* Using a custom button class that's been converted to Tailwind */}
          <button className="btn-prm">Primary Button</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Example Components

Check out these components that demonstrate the new approach:

- `src/components/home/Hero.jsx`
- `src/components/home/WhatWeOffer.jsx`

## Best Practices

1. **Be consistent**: Choose one framework for each component or section
2. **Use the parent class**: Always wrap Tailwind-styled elements with the `tailwind` class
3. **Prefer Tailwind for new components**: Use Tailwind for new development
4. **Keep custom classes for complex styles**: Some styles like background images are better kept as custom classes
5. **Use @apply for repeated patterns**: If you find yourself repeating the same set of Tailwind classes, consider using `@apply` in the custom CSS file

By following these guidelines, you can leverage the strengths of both frameworks while maintaining a clean and consistent codebase.
