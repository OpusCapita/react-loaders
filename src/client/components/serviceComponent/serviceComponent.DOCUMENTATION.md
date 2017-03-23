### Synopsis

**serviceComponent** is a function which allow to load **specified component** from **specified service** and render it.

`serviceComponent(service, componentName) => LoadedComponent`

### LoadedComponent props

You can pass any **specified component** properties

LoadedComponent require several additional props

| Name                           | Type                    | Description                                                                                                                      |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                                                                      |
| loadWith                       | func                    | *serviceRegistry* function. Components will be loaded by convention address  `service.url/static/components/${componentName}.js` |
| inProgress                     | node                    | Spinner element. Will be shown while component not loaded yet.                                                                   |
  
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
