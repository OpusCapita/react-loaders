### Synopsis

ScriptsLoaderContainer is a component which allow to specify list of scpits URLs and load them dynamically.

* If scripts are in loading process, it renders **spinner**.
* If one of script loading has been failed, it renders **error**
* Else (when all scripts loaded and no errors) it renders component **children**

Script DOM nodes will be added to **head** of document.
On componentWillUnmount script DOM nodes will be deleted.

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| scripts | array | List of script URLs |
| renderSpinner | func | You can specify custom spinner component `(scripts) => YourSpinnerComponent` |
| renderError | func | You can specify custom error component `(scripts) => YourErrorComponent` |

### Code Example

```
<ScriptsLoaderContainer
  scripts={[
    'https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.0.1/Rx.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.js',
    'https://code.jquery.com/jquery-3.1.1.js'
  ]}
>
  <h3>Content</h3>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Nulla hendrerit nec massa et venenatis. Cras tempus varius ligula vitae vulputate.
    In sodales aliquam diam. Praesent tempor scelerisque orci in tristique.
    Vivamus id efficitur sem, dictum pharetra tellus.
    Vivamus sit amet accumsan felis.
    Quisque vestibulum felis id dapibus vestibulum. Pellentesque condimentum tincidunt sapien.
  </p>
</ScriptsLoaderContainer>
```

### Component Name

ScriptsLoaderContainer

### License

Licensed by © 2017 OpusCapita

