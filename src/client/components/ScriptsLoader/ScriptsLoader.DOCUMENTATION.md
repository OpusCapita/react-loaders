### Synopsis

ScriptsLoader is a component which allow to specify list of scpits URLs and load them dynamically.
Script DOM nodes will be added to **head** of document.
On componentWillUnmount script DOM nodes will be deleted.

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| scripts | array | List of script URLs |
| onChange | func | Callback fired on every state change e.g. on script load started, script loaded succesfully, script load failed.<br> Returns object `{ failure: [...urls], loading: [...urls], success: [...urls] }` |

### Code Example

```
<ScriptsLoader
  scripts={[
    'https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.0.1/Rx.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.js',
    'https://code.jquery.com/jquery-3.1.1.js'
  ]}
  onChange={_scope.handleChange.bind(_scope)}
/>
```

### Component Name

ScriptsLoader

### License

Licensed by © 2017 OpusCapita

