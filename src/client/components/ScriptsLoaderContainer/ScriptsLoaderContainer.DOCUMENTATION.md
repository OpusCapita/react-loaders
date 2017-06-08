### Synopsis

ScriptsLoaderContainer is a component which allow to specify list of scpits URLs and load them dynamically.

* If scripts are in loading process, it renders **spinner**.
* If one of script loading has been failed, it renders **error**
* Else (when all scripts loaded and no errors) it renders component **children**

Script DOM nodes will be added to **head** of document.
On componentWillUnmount script DOM nodes will be deleted.

### Props Reference

| Name                           | Type                    | Description                                                                                                                      |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                      |
| children                       | object or function      | When passed **object** - default React behavior. <br/>If passed **function** - result of **function** execution will be rendered |
| scripts                        | array                   | List of script URLs                                                                                                              |
| renderSpinner                  | func                    | You can specify custom spinner component `(scripts) => YourSpinnerComponent`                                                     |
| renderError                    | func                    | You can specify custom error component `(scripts) => YourErrorComponent`                                                         |

### Code Example

```jsx harmony
<ScriptsLoaderContainer
  scripts={[
    `${location.protocol}//${location.host}${location.pathname}static/components/SupplierInput.js`
  ]}
>
{() => (
  <div>
    <SupplierInput.default serviceRegistry={() => ({url: `${location.protocol}//${location.host}${location.pathname.slice(0, -1)}`})} />
  </div>
)}
</ScriptsLoaderContainer>
```

### Component Name

ScriptsLoaderContainer

### License

Licensed by © 2017 OpusCapita

