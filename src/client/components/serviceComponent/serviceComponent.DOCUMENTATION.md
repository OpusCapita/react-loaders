### Synopsis

**serviceComponent** is a function which allow to load **specified component** from **specified service** and render it.

`serviceComponent(options) => LoadedComponent`

Where `options` as props

| Name                           | Type                    | Description                                                                  |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                  |
| serviceRegistry                | func                    | *serviceRegistry* function. Should be resolve URL by service name            |
| inProgressComponent            | node                    | Spinner element. Will be shown while component not loaded yet.
| moduleName                     | string                  | Export module name to window scope
| serviceName                    | string                  | Service name (for service registry)
| jsFileName                     | string                  | Path to file loaded script name (by default used moduleName) 
| componentPath                  | string                  | Component path on module   

#### URL compilation for example
`{serviceURL}/static/components/{jsFileName || moduleName}.js`


### Code Example

```jsx harmony
<div>
{(() => {
// Example start

  // 'localhost:3000' specified, but in fact it's a proxy to demo-installation =)
  let serviceRegistry = (service) => ({ url: 'http://localhost:3000' });  
  let SupplierInput = serviceComponent({serviceRegistry, serviceName: 'supplier', moduleName: 'SupplierInput'});
  
  return (
    <SupplierInput
      serviceRegistry={serviceRegistry}
      value={{}}
      onChange={() => console.log('onChange!')}
      disabled={false}
    />
  );
// Example end
})()}
</div>
```

### Component Name

serviceComponent

### License

Licensed by © 2017 OpusCapita
