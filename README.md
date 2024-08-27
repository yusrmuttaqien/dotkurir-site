<br/>

# Cek Ongkir

### Framework, library, language or API used in this site

- [Next.js - Framework / Bootstrap](https://nextjs.org)

- [TailwindCSS - Styling library](https://tailwindcss.com)

- [React Query - API manager library](https://tanstack.com/query/latest)

- [Framer Motion - Animation library](https://www.framer.com/motion)

<br/>

### How to run locally

1. Clone the repo

    ```bash
    git clone https://github.com/yusrmuttaqien/dotkurir-site.git
    ```

2. Open terminal and navigate to the project directory

    ```bash
    cd dotkurir-site
    ```

3. Install all dependencies

    ```bash
    npm install

    # or

    bun install
    ```

4. Initialize required environment variables `.env` in root directory (one level with `/src` folder)

    ```env
    RAJA_ONGKIR_API_KEY=...
    RAJA_ONGKIR_BASE_URL=...
    ```

    Note:
    - `RAJA_ONGKIR_API_KEY` is your Raja Ongkir API key, retrive it from [your account panel](https://rajaongkir.com/akun/panel)
    - `NEXT_PUBLIC_BASE_URL` is the base URL of [Raja Ongkir's API](https://arc.net/l/quote/mcayiszy). The base URL should matches your account type (starter or pro). [If link before doesn't work](https://rajaongkir.com/dokumentasi)

5. Run the development server

    ```bash
    npm run dev

    # or

    bun run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the local website.

## Credits

### <a href="https://github.com/yusrmuttaqien">Yusril Muttaqien</a> - 2024
