# NHPagoda

An application for store, search information and print `praying-for-peace` for many families in my hometown, which can be extended in the future.

## Prerequisite

- `rustc` v1.66.1
- `rustup` 1.25.1
- `node` 18.13.0

Development equipment should be has at least `8GB` RAM.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## How to run

Install dependencies:

```bash
yarn install
```

Install essential packages on Linux:

```bash
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev
```

To run all parts of application, type:

```bash
yarn start
```

To run only UI:

```bash
yarn dev
```

### Warning

If your RAM capacity is less than or equal `8GB`, create a swapfile to avoid memory overflow. A swapfile should have a size equal RAM's size.

Visit [How to create a swapfile](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-20-04) for more detail.

## Project structure

```python
📦public                        # Contains assets
📦src                           # Source code for UI
 ┣ 📂components                     # Reusable components
 ┣ 📂constants                      # Constants goes here
 ┣ 📂interfaces                     # Interfaces goes here
 ┣ 📂pages                          # UI pages
 ┣ 📂services                       # Services, include tauri command calls, 3rd party services and printer
 ┣ 📂types                          # All types goes here
 ┣ 📂utils                          # Utility functions
 ┣ 📜App.tsx                        # App component
 ┣ 📜index.css                      # All override css here
 ┣ 📜index.tsx                      # App entry
 ┗ 📜vite-env.d.ts                  # Vite env
📦src-tauri                     # Source code for main logic
 ┣ 📂icons                          # Icons
 ┗ 📂src                            # Source
# And another files ...
```
