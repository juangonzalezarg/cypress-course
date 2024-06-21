# Readme Cypress course

1. npm init

2. npm install cypress --save-dev

3. npx cypress open

   npm run cy:open

## Write your first test

```
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})
```

Now let's write our first failing test.

```
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(false)
  })
})
```

## Write a real test
