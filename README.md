# Install

> "pnpm" is used in this repository, but you can also use npm or yarn

```bash

    pnpm install # or, yarn install

```

You're done.

## Scripts

```bash

    # Develop
    pnpm dev # Dev mode
    pnpm build #Build the project

    # Test
    pnpm test:unit # Unit
    pnpm test:e2e # e2e

    # Miscellaneous
    pnpm lint:fix # Lint all the files in the project at once (css,scss,js,ts,html)

```

## Update

```bash

    # Update root project version
    pnpm version minor

```

---

## VSCode - DX

If you're using VSCode, it's best to follow the "Extension recommendations" to have the best DX Experience.

To install all the requirements, go to VSCODE > EXTENSIONS > and search for "@recommended", then check the "Workspace Recommendations" section.

## Code Structure

I've followed the suggested files/folders-structure provided by the Vue Team.

---

## Git

### Commit messages

[Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/)

### CSS/SCSS Lint

[Configuration](https://github.com/constverum/stylelint-config-rational-order)

1. Positioning
2. Box Model
3. Typography
4. Visual
5. Animation
6. Misc

```css

    .declaration-order {

        /* Positioning */
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;

        /* Box Model */
        display: block;
        float: right;
        width: 100px;
        height: 100px;
        margin: 10px;
        padding: 10px;

        /* Typography */
        color: #888;
        font: normal 16px Helvetica, sans-serif;
        line-height: 1.3;
        text-align: center;

        /* Visual */
        background-color: #eee;
        border: 1px solid #888;
        border-radius: 4px;
        opacity: 1;

        /* Animation */
        transition: all 1s;

        /* Misc */
        user-select: none;

    }

```

---

## Flow

Navigate to the '/challenge' page, play with the form-fields and save the data when you want.
The data is saved into the store, and the form can be saved again only after user change fields again.

The user-click in the banner is also saved into the store and can be viewed in the "PiniaStore accordion [Show Pinia store state]".
There is also a "Json accordion [Show Json]" to show how the values of the form change during user interactions.

## TODO/Nice to have

There's a dedicated [TODO](./TODO.md) file
