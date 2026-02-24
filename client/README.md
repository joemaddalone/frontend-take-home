### How to run your project.

> Note: While it is not absolutely **required** to run the client application you should have the backend api running according to the instructions [here](https://github.com/joemaddalone/frontend-take-home/blob/main/README.md).

**Start the Client App**:
- Ensure you have the latest version of Node.js.
- Run the following commands to install dependencies and start the API:
  ```bash
  cd client
  npm install
  npm run dev
  ```

**Other scripts available**:
- `npm run build` - build a production bundled version
- `npm run fix` - run biome formatting with auto-fix
- `npm run format` - run biome formatting
- `npm run lint` - run biome linting
- `npm run preview` - serve a production build
- `npm run vitest run` - run unit tests
- `npm run test:watch` - un unit tests in "watch" mode

###  What you would improve or do differently if you had more time.

1. **Add more tests**
   - I added some an initial testing structure and two unit tests, I would aim for much higher coverage in production.  The general patterns are in place to follow.
2. **I18n**
   - I just didn't get to it, but I would prioritize this.
3. **Responsive design**
   - I did not spend a ton of time on responsive design, the app works at various sizes, but there is room for a more a deliberate "small screen" implementation.
4. **Add more features**
     - The overall foundation is already in place to interact with the API more fully.  Given time I'd flesh out the remaining, implied functionality like fully edit Roles, create Users, etc.
5. **Add more documentation**
   - document patterns to follow for
     - testing
     - component development
     - client api usage
6. **Dig more into these libraries**
   - I used this test as an opportunity to learn about some new-to-me tools, namely radix-themes and swr.  There is a ton more potential to continue learning here.
     - radix-themes: awesome, still more to learn.
     - swr: there are some interesting ideas here, but I'll need to explore further to more deeply evaluate.

