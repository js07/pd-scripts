# pd-scripts

Scripts for developing Pipedream components

## Dependencies

- [Google Chrome](https://www.google.com/chrome/)

## Usage

### Creating workflows

#### With npx

```
npx github:js07/pd-scripts create <action_files...> -u <pdusername> -p <pdpassword> --app <App Name>
```

**Example**

```
npx github:js07/pd-scripts create components/google_sheets/actions/**/*.js -u <pdusername> -p "<pdpassword>" --app "Google Sheets"
```
