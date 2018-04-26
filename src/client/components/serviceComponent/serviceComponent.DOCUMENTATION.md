### Synopsis

**serviceComponent** is a function which allow to load **specified component** from **specified service** and render it.

`serviceComponent(options) => LoadedComponent`

Where `options` as props

| Name                           | Type                    | Description                                                       |
| ------------------------------ | :---------------------- | -----------------------------------------------------------       |
| serviceRegistry                | func                    | *serviceRegistry* function. Should be resolve URL by service name |
| inProgressComponent            | node                    | Spinner element. Will be shown while component not loaded yet.    |
| moduleName                     | string                  | Export module name to window scope                                |
| serviceName                    | string                  | Service name (for service registry)                               |
| jsFileName                     | string                  | Path to file loaded script name (by default used moduleName)      |
| componentPath                  | string                  | Component path on module                                          |
| jsFilePathPrefix               | string                  | Path between `serviceRegistry(service).url` and filename. Default is `/static/components/`. |

#### URL compilation for example

`{serviceURL}/static/components/{jsFileName || moduleName}.js`


### Code Example

```jsx harmony
<div>
{(() => {
// Example start

  let serviceRegistry = (service) => ({ url: `${location.protocol}//${location.host}` });
  //load from default export
  let TextInput = serviceComponent({ serviceRegistry, serviceName: 'demo', moduleName: 'TextInput' });
  //load from export
  let DateInput = serviceComponent({ serviceRegistry, serviceName: 'demo', moduleName: 'Dates', componentPath: 'DateInput' });

  return (
    <div>
      <div className="form-group">
        <TextInput/>
      </div>

      <div className="form-group">
        <DateInput/>
      </div>
    </div>
  );
// Example end
})()}
</div>
```

### Component Name

serviceComponent

### License

Licensed by © 2017 OpusCapita
